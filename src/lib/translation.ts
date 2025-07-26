import { GoogleGenerativeAI } from "@google/generative-ai";

export interface TranslationService {
  translateToLanguage(text: string, targetLanguage: string): Promise<string>;
}

export class GeminiTranslationService implements TranslationService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY is not configured');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async translateToLanguage(text: string, targetLanguage: string): Promise<string> {
    try {
      // Don't translate if target is English
      if (targetLanguage === 'en') {
        return text;
      }

      const languageMap: { [key: string]: string } = {
        'hi': 'Hindi (हिंदी)',
        'mr': 'Marathi (मराठी)', 
        'gu': 'Gujarati (ગુજરાતી)',
        'ta': 'Tamil (தமிழ்)'
      };

      const targetLangName = languageMap[targetLanguage] || targetLanguage;

      const prompt = `Translate the following English text to ${targetLangName}. Keep the translation natural and conversational, suitable for language learning. Maintain the friendly and encouraging tone.

English text: "${text}"

Translated text:`;

      const result = await this.model.generateContent(prompt);
      const translation = result.response.text().trim();
      
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback to original text if translation fails
      return text;
    }
  }
}

export const translationService = new GeminiTranslationService();
