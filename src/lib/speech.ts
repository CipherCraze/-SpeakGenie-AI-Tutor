// Speech-to-Text and Text-to-Speech utilities using Web APIs
export interface SupportedLanguage {
  code: string;
  name: string;
  flag: string;
  speechLang: string;
  voiceNames: string[];
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    speechLang: 'en-US',
    voiceNames: ['Microsoft Zira - English (United States)', 'Microsoft David - English (United States)', 'Google US English']
  },
  {
    code: 'hi',
    name: 'हिंदी (Hindi)',
    flag: '🇮🇳',
    speechLang: 'hi-IN',
    voiceNames: ['Microsoft Hemant - Hindi (India)', 'Google हिन्दी', 'Microsoft Kalpana - Hindi (India)']
  },
  {
    code: 'mr',
    name: 'मराठी (Marathi)',
    flag: '🇮🇳',
    speechLang: 'mr-IN',
    voiceNames: ['Microsoft Manohar - Marathi (India)', 'Google मराठी']
  },
  {
    code: 'gu',
    name: 'ગુજરાતી (Gujarati)', 
    flag: '🇮🇳',
    speechLang: 'gu-IN',
    voiceNames: ['Microsoft Kalika - Gujarati (India)', 'Google ગુજરાતી']
  },
  {
    code: 'ta',
    name: 'தமிழ் (Tamil)',
    flag: '🇮🇳',
    speechLang: 'ta-IN',
    voiceNames: ['Microsoft Valluvar - Tamil (India)', 'Google தமிழ்']
  }
];

export class SpeechService {
  private synthesis: SpeechSynthesis;
  private recognition: any = null;
  private isListening: boolean = false;
  private currentLanguage: string = 'en';
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }

    // Wait for voices to load and set default voice
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = () => this.selectBestVoice();
    }
    // Fallback for immediate voice loading
    setTimeout(() => this.selectBestVoice(), 100);
  }

  // Set the language for speech recognition and synthesis
  setLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode);
    
    if (language && this.recognition) {
      this.recognition.lang = language.speechLang;
    }
    
    this.selectBestVoice();
  }

  // Select the best available voice for the current language
  private selectBestVoice(): void {
    const voices = this.synthesis.getVoices();
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === this.currentLanguage);
    
    if (!language || voices.length === 0) {
      this.selectedVoice = null;
      return;
    }

    // Try to find a voice by exact name match
    for (const voiceName of language.voiceNames) {
      const voice = voices.find(v => v.name.includes(voiceName.split(' - ')[0]));
      if (voice) {
        this.selectedVoice = voice;
        console.log(`Selected voice: ${voice.name} for language: ${language.name}`);
        return;
      }
    }

    // Fallback: find any voice with the correct language code
    const fallbackVoice = voices.find(v => v.lang.startsWith(language.speechLang.split('-')[0]));
    if (fallbackVoice) {
      this.selectedVoice = fallbackVoice;
      console.log(`Fallback voice: ${fallbackVoice.name} for language: ${language.name}`);
    } else {
      console.warn(`No voice found for language: ${language.name}`);
      this.selectedVoice = null;
    }
  }

  // Text-to-Speech with language support
  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1;

      // Use selected voice if available
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
        utterance.lang = this.selectedVoice.lang;
      } else {
        // Fallback to language code
        const language = SUPPORTED_LANGUAGES.find(lang => lang.code === this.currentLanguage);
        if (language) {
          utterance.lang = language.speechLang;
        }
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      this.synthesis.speak(utterance);
    });
  }

  // Speech-to-Text
  listen(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      if (this.isListening) {
        reject(new Error('Already listening'));
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        this.isListening = false;
        resolve(result);
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    });
  }

  // Stop listening
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Stop speaking
  stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  // Check if currently listening
  get listening(): boolean {
    return this.isListening;
  }

  // Get current language
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  // Get available languages
  static getSupportedLanguages(): SupportedLanguage[] {
    return SUPPORTED_LANGUAGES;
  }

  // Get available voices for current language
  getAvailableVoices(): SpeechSynthesisVoice[] {
    const voices = this.synthesis.getVoices();
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === this.currentLanguage);
    
    if (!language) return [];
    
    return voices.filter(voice => 
      voice.lang.startsWith(language.speechLang.split('-')[0]) ||
      language.voiceNames.some(name => voice.name.includes(name.split(' - ')[0]))
    );
  }

  // Check if browser supports speech features
  static isSupported(): boolean {
    return !!(
      window.speechSynthesis &&
      (window.SpeechRecognition || window.webkitSpeechRecognition)
    );
  }
}

// Global speech service instance
export const speechService = new SpeechService();

// Type declarations for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
