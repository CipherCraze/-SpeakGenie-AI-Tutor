import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Bot, BrainCircuit, Volume2, User, X, Sparkles, Languages, Wand2, Star, Castle, ShoppingCart, Home, School, Zap, Heart } from 'lucide-react';
import { speechService, SpeechService } from '../lib/speech';
import { aiService, ROLEPLAY_SCENARIOS, ChatMessage } from '../lib/ai';
import { translationService } from '../lib/translation';
import LanguageSelector from './language-selector';
import { Button } from './ui/button';

type TutorStatus = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

// Enhanced CSS animations - cleaner and more professional
const enhancedStyles = `
  @keyframes breathe {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.03); opacity: 1; }
  }
  @keyframes gentle-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes smooth-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes ripple-out {
    0% { transform: scale(0.9); opacity: 0.8; }
    100% { transform: scale(2); opacity: 0; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.3); }
    50% { box-shadow: 0 0 50px rgba(139, 92, 246, 0.6); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-breathe { animation: breathe 3s ease-in-out infinite; }
  .animate-gentle-float { animation: gentle-float 3s ease-in-out infinite; }
  .animate-smooth-spin { animation: smooth-spin 2s linear infinite; }
  .animate-ripple-out { animation: ripple-out 2s ease-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 2.5s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
  
  .clean-glass {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  
  .orb-shadow {
    filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.3));
  }
`;

// Inject enhanced styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = enhancedStyles;
  document.head.appendChild(styleElement);
}

// Clean and elegant Genie Orb - completely redesigned
const GenieOrb = ({ status, onClick, disabled }: { status: TutorStatus, onClick: () => void, disabled: boolean }) => {
    let icon, orbGradient, statusText, animation, glowColor;

    switch (status) {
        case 'listening':
            icon = <Mic className="h-16 w-16 text-white" />;
            orbGradient = 'from-red-400 to-red-600';
            statusText = '🎤 Listening...';
            animation = 'animate-pulse';
            glowColor = 'shadow-red-500/40';
            break;
        case 'processing':
            icon = <BrainCircuit className="h-16 w-16 text-white animate-smooth-spin" />;
            orbGradient = 'from-amber-400 to-orange-500';
            statusText = '🧠 Thinking...';
            animation = 'animate-breathe';
            glowColor = 'shadow-amber-500/40';
            break;
        case 'speaking':
            icon = <Volume2 className="h-16 w-16 text-white animate-bounce" />;
            orbGradient = 'from-blue-400 to-blue-600';
            statusText = '🎵 Speaking...';
            animation = 'animate-pulse-glow';
            glowColor = 'shadow-blue-500/40';
            break;
        case 'error':
            icon = <Zap className="h-16 w-16 text-white" />;
            orbGradient = 'from-gray-400 to-gray-600';
            statusText = '😅 Try again';
            animation = '';
            glowColor = 'shadow-gray-500/20';
            break;
        default: // idle
            icon = <Sparkles className="h-16 w-16 text-white animate-gentle-float" />;
            orbGradient = 'from-violet-500 to-purple-600';
            statusText = '✨ Tap to speak';
            animation = 'animate-breathe';
            glowColor = 'shadow-violet-500/40';
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 text-center">
            {/* Clean, modern orb design */}
            <div className="relative">
                {/* Subtle background glow */}
                <div className={`absolute inset-0 w-44 h-44 rounded-full bg-gradient-to-br ${orbGradient} opacity-20 blur-xl animate-gentle-float`}></div>
                
                {/* Ripple effect for listening */}
                {status === 'listening' && (
                    <div className="absolute inset-0 w-44 h-44 rounded-full border border-red-300/40 animate-ripple-out"></div>
                )}
                
                {/* Main orb button */}
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${orbGradient} text-white
                        transition-all duration-300 ease-out transform hover:scale-105 active:scale-95
                        ${glowColor} shadow-2xl orb-shadow ${animation}
                        ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:shadow-3xl'}
                        border-2 border-white/20`}
                >
                    {/* Subtle inner highlight */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-t from-transparent to-white/20"></div>
                    
                    {/* Icon container */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        {icon}
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>
            
            {/* Clean status text */}
            <div className="clean-glass rounded-2xl px-6 py-4 max-w-sm animate-slide-up">
                <p className="text-white font-semibold text-lg leading-relaxed">
                    {statusText}
                </p>
                
                {/* Simple status indicators */}
                <div className="flex justify-center mt-3 gap-2">
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        status === 'idle' ? 'bg-green-400' : 'bg-white/30'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        status === 'listening' ? 'bg-red-400' : 'bg-white/30'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        status === 'processing' ? 'bg-amber-400' : 'bg-white/30'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        status === 'speaking' ? 'bg-blue-400' : 'bg-white/30'
                    }`}></div>
                </div>
            </div>
        </div>
    );
};

// --- Main Voice Tutor Component ---
interface VoiceTutorEnhancedProps {
  autoStartMode?: 'free-flow' | 'school' | 'store' | 'home' | null;
  onEnd: () => void;
}

export default function VoiceTutorEnhanced({ autoStartMode, onEnd }: VoiceTutorEnhancedProps) {
  const [status, setStatus] = useState<TutorStatus>('idle');
  const [currentMode, setCurrentMode] = useState<'free-flow' | 'roleplay' | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsSpeechSupported(SpeechService.isSupported()); }, []);
  
  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    speechService.setLanguage(languageCode);
  };

  const startConversation = async (mode: typeof autoStartMode) => {
    if (!mode) return;
    try {
      setError(null);
      setStatus('processing');
      const welcomeMessage = mode === 'free-flow'
        ? await aiService.startFreeFlowChat()
        : await aiService.startRoleplay(mode);
      
      setCurrentMode(mode === 'free-flow' ? 'free-flow' : 'roleplay');
      setSelectedScenario(mode === 'free-flow' ? null : mode);
      
      const updatedHistory = aiService.getChatHistory();
      const welcomeMessageObj = updatedHistory[updatedHistory.length - 1];
      
      if (welcomeMessageObj && selectedLanguage !== 'en') {
        const translatedWelcome = await translationService.translateToLanguage(welcomeMessage, selectedLanguage);
        welcomeMessageObj.translatedContent = translatedWelcome;
      }
      
      setChatHistory([...updatedHistory]);
      setStatus('speaking');
      
      const messageToSpeak = welcomeMessageObj?.translatedContent || welcomeMessage;
      await speechService.speak(messageToSpeak);
      setStatus('idle');

    } catch (err) {
      setError('Oops! Magic is taking a break. Try again soon!');
      setStatus('error');
      console.error(err);
    }
  };
  
  useEffect(() => {
    if (autoStartMode && isSpeechSupported) { startConversation(autoStartMode); }
  }, [autoStartMode, isSpeechSupported]);

  const handleVoiceInput = async () => {
    if (!isSpeechSupported) {
      setError('Speech magic doesn\'t work here. Try Chrome or Firefox!');
      setStatus('error');
      return;
    }

    try {
      setError(null);
      setStatus('listening');
      const userInput = await speechService.listen();
      
      if (userInput.trim()) {
        setStatus('processing');
        const response = await aiService.sendMessage(userInput);
        const updatedHistory = aiService.getChatHistory();
        const lastMessage = updatedHistory[updatedHistory.length - 1];
        
        if (lastMessage && lastMessage.role === 'assistant' && selectedLanguage !== 'en') {
          const translatedResponse = await translationService.translateToLanguage(lastMessage.content, selectedLanguage);
          lastMessage.translatedContent = translatedResponse;
        }
        
        setChatHistory([...updatedHistory]);
        setStatus('speaking');
        
        const messageToSpeak = lastMessage?.translatedContent || lastMessage?.content || response;
        await speechService.speak(messageToSpeak);
      }
      setStatus('idle');

    } catch (err) {
      setError('Whoops! I missed that. Try speaking again!');
      console.error(err);
      setStatus('idle');
    }
  };

  const stopAll = () => {
    speechService.stopListening();
    speechService.stopSpeaking();
    setStatus('idle');
  };

  const getScenarioIcon = (scenarioId: string) => {
    switch (scenarioId) {
      case 'school': return <School className="h-5 w-5" />;
      case 'store': return <ShoppingCart className="h-5 w-5" />;
      case 'home': return <Home className="h-5 w-5" />;
      default: return <Wand2 className="h-5 w-5" />;
    }
  };

  const currentScenario = selectedScenario ? ROLEPLAY_SCENARIOS.find(s => s.id === selectedScenario) : null;
  const title = currentMode === 'free-flow' ? 'Magic Chat' : currentScenario?.title || 'Adventure';

  if (!isSpeechSupported) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            <div className="glass-morphism rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-white/30 max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                    <Wand2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 drop-shadow-lg">🎭 Magic Portal Blocked</h3>
                <p className="text-white/90 mb-6 text-sm sm:text-base leading-relaxed">
                    Our voice magic needs a modern browser like Chrome, Firefox, or Safari to work! ✨
                </p>
                <Button 
                    onClick={onEnd}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6 py-3 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                    <Heart className="h-5 w-5 mr-2" />
                    Back to Magic World
                </Button>
            </div>
        </div>
    );
  }
  
  if (autoStartMode && status === 'processing' && chatHistory.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-4 sm:p-8">
              {/* Magical loading animation */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
                  <div className="relative z-10 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl">
                      <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-white animate-sparkle-dance" />
                  </div>
                  
                  {/* Floating magical elements */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 sm:p-8 text-center max-w-md">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg mb-3">🎭 Preparing Your Adventure</h3>
                  <p className="text-white/90 mt-2 text-sm sm:text-base leading-relaxed">Your magical genie is getting ready to meet you!</p>
                  
                  {/* Loading dots */}
                  <div className="flex justify-center mt-6 gap-2">
                      <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Clean header */}
      <header className="relative z-20 p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            {selectedScenario && (
              <div className="clean-glass p-3 rounded-full">
                {getScenarioIcon(selectedScenario)}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Wand2 className="text-violet-400 h-6 w-6" />
                {title}
              </h2>
              <p className="text-white/60 text-sm">AI English Tutor</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
              <LanguageSelector
                  currentLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
              />
              <Button 
                  onClick={onEnd} 
                  className="clean-glass text-white hover:bg-white/20 rounded-full p-3 transition-all duration-300 group"
              >
                  <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              </Button>
          </div>
        </div>
      </header>
      
      {/* Clean chat history */}
      <div 
        ref={chatContainerRef} 
        className="flex-grow w-full max-w-3xl mx-auto space-y-4 overflow-y-auto p-6 pb-80 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent relative z-10"
      >
          {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex items-end gap-3 w-full transition-all duration-300 animate-slide-up ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center shadow-lg">
                      <Bot size={20} />
                  </div>
                )}
                <div
                  className={`max-w-sm p-4 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300
                    ${ message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md'
                        : 'clean-glass text-white rounded-bl-md'
                    }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  {message.translatedContent && message.translatedContent !== message.content && (
                    <div className="mt-3 pt-3 border-t border-white/20">
                      <p className="text-sm text-white/80 flex items-center gap-2 mb-2">
                        <Languages size={14} /> 
                        <span>Translation:</span>
                      </p>
                      <p className="leading-relaxed font-medium text-blue-200">{message.translatedContent}</p>
                    </div>
                  )}
                </div>
                 {message.role === 'user' && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
                      <User size={20} />
                  </div>
                )}
              </div>
            ))}
            
            {error && (
              <div className="text-center mx-auto max-w-sm">
                <div className="clean-glass rounded-2xl p-4 border border-red-400/30">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Zap className="h-5 w-5 text-red-400" />
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              </div>
            )}
      </div>
      
      {/* Clean floating action button */}
      <div className="absolute bottom-72 right-6 z-20">
        <Button 
          onClick={stopAll}
          className="clean-glass bg-violet-500/20 hover:bg-violet-500/30 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transform transition-all duration-300"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Elegant interaction area */}
      <footer className="fixed bottom-0 left-0 right-0 z-30">
          <div className="relative">
            {/* Seamless gradient blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent backdrop-blur-sm"></div>
            
            <div className="clean-glass h-64 flex items-center justify-center relative">
              <GenieOrb
                  status={status}
                  onClick={status === 'listening' ? stopAll : handleVoiceInput}
                  disabled={status === 'processing' || status === 'speaking'}
              />
            </div>
          </div>
      </footer>
    </div>
  );
}