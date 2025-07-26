import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Bot, BrainCircuit, Volume2, User, X, Sparkles, Languages, Wand2, Star, Castle, ShoppingCart, Home, School, Zap, Heart } from 'lucide-react';
import { speechService, SpeechService } from '../lib/speech';
import { aiService, ROLEPLAY_SCENARIOS, ChatMessage } from '../lib/ai';
import { translationService } from '../lib/translation';
import LanguageSelector from './language-selector';
import { Button } from './ui/button';

type TutorStatus = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

// Enhanced CSS animations
const enhancedStyles = `
  @keyframes magical-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-8px) rotate(1deg); }
    66% { transform: translateY(4px) rotate(-1deg); }
  }
  @keyframes sparkle-dance {
    0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.7; }
    25% { transform: rotate(90deg) scale(1.1); opacity: 1; }
    50% { transform: rotate(180deg) scale(0.9); opacity: 0.8; }
    75% { transform: rotate(270deg) scale(1.05); opacity: 0.9; }
  }
  @keyframes wave-ripple {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
    50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(236, 72, 153, 0.6); }
  }
  .animate-magical-pulse { animation: magical-pulse 2s ease-in-out infinite; }
  .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
  .animate-sparkle-dance { animation: sparkle-dance 3s linear infinite; }
  .animate-wave-ripple { animation: wave-ripple 1.5s ease-out infinite; }
  .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
  .glass-morphism {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .message-appear {
    animation: messageAppear 0.5s ease-out forwards;
  }
  @keyframes messageAppear {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

// Inject enhanced styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = enhancedStyles;
  document.head.appendChild(styleElement);
}

// Enhanced Genie Orb with magical effects and improved responsiveness
const GenieOrb = ({ status, onClick, disabled }: { status: TutorStatus, onClick: () => void, disabled: boolean }) => {
    let icon, orbColor, pulseColor, statusText, animationClass, glowEffect;

    switch (status) {
        case 'listening':
            icon = <Mic className="h-1/2 w-1/2 drop-shadow-lg" />;
            orbColor = 'bg-gradient-to-br from-red-400 via-red-500 to-red-600';
            pulseColor = 'ring-red-300';
            statusText = '🎤 Listening to your magic words...';
            animationClass = 'animate-pulse';
            glowEffect = 'shadow-lg shadow-red-500/50';
            break;
        case 'processing':
            icon = <BrainCircuit className="h-1/2 w-1/2 animate-spin drop-shadow-lg" />;
            orbColor = 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500';
            pulseColor = 'ring-yellow-300';
            statusText = '🧠 Genie is thinking of magic...';
            animationClass = 'animate-magical-pulse';
            glowEffect = 'shadow-xl shadow-yellow-500/50';
            break;
        case 'speaking':
            icon = <Volume2 className="h-1/2 w-1/2 animate-bounce drop-shadow-lg" />;
            orbColor = 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
            pulseColor = 'ring-blue-300';
            statusText = '🎵 Your magical friend is speaking!';
            animationClass = 'animate-glow-pulse';
            glowEffect = 'shadow-xl shadow-blue-500/50';
            break;
        case 'error':
            icon = <Bot className="h-1/2 w-1/2 drop-shadow-lg" />;
            orbColor = 'bg-gradient-to-br from-gray-400 to-gray-500';
            pulseColor = '';
            statusText = '😅 Oops! Magic needs a moment...';
            animationClass = '';
            glowEffect = 'shadow-md';
            break;
        default: // idle
            icon = <Sparkles className="h-1/2 w-1/2 animate-sparkle-dance drop-shadow-lg" />;
            orbColor = 'bg-gradient-to-br from-purple-500 via-violet-500 to-pink-500';
            pulseColor = 'ring-purple-400';
            statusText = '✨ Tap the magic orb to speak!';
            animationClass = 'animate-magical-pulse';
            glowEffect = 'shadow-2xl shadow-purple-500/50';
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center px-4">
            {/* Magic orb with enhanced effects */}
            <div className="relative">
                {/* Outer magical glow rings */}
                <div className={`absolute inset-0 rounded-full ${pulseColor} opacity-30 animate-ping`}></div>
                <div className={`absolute inset-0 rounded-full ${pulseColor} opacity-20 animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
                
                {/* Wave ripples for listening state */}
                {status === 'listening' && (
                    <>
                        <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-wave-ripple"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-wave-ripple" style={{ animationDelay: '0.5s' }}></div>
                    </>
                )}
                
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={`relative group w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full text-white transition-all duration-500 ease-out transform hover:scale-110 active:scale-95
                        ${orbColor}
                        ${glowEffect}
                        ${animationClass}
                        ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:shadow-3xl'}
                        overflow-hidden border-4 border-white/30`}
                >
                    {/* Inner glow overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/30"></div>
                    
                    {/* Floating sparkles for idle state */}
                    {status === 'idle' && (
                        <>
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-float-gentle" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-float-gentle" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-300 rounded-full animate-float-gentle" style={{ animationDelay: '1.5s' }}></div>
                            <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-float-gentle" style={{ animationDelay: '2s' }}></div>
                        </>
                    )}
                    
                    {/* Processing sparkles */}
                    {status === 'processing' && (
                        <>
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-ping"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-orange-200 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        </>
                    )}
                    
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        {icon}
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>
            
            {/* Enhanced status text */}
            <div className="glass-morphism rounded-2xl px-4 py-3 sm:px-6 sm:py-4 max-w-xs sm:max-w-sm">
                <p className="text-white font-bold text-sm sm:text-base lg:text-lg drop-shadow-lg text-center leading-relaxed">
                    {statusText}
                </p>
                
                {/* Status indicator dots */}
                <div className="flex justify-center mt-2 gap-1">
                    <div className={`w-2 h-2 rounded-full ${status === 'idle' ? 'bg-green-400 animate-pulse' : 'bg-white/30'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${status === 'listening' ? 'bg-red-400 animate-pulse' : 'bg-white/30'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${status === 'processing' ? 'bg-yellow-400 animate-pulse' : 'bg-white/30'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${status === 'speaking' ? 'bg-blue-400 animate-pulse' : 'bg-white/30'}`}></div>
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
    <div className="relative w-full min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
      {/* Enhanced floating decorations with better responsiveness */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full animate-float-gentle blur-sm"></div>
        <div className="absolute top-20 right-20 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-300/30 to-cyan-300/30 rounded-full animate-float-gentle blur-sm" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full animate-float-gentle blur-sm" style={{ animationDelay: '4s' }}></div>
        
        {/* Small twinkling particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-pink-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-2/5 w-2 h-2 bg-green-300 rounded-full animate-pulse opacity-80" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-orange-300 rounded-full animate-ping opacity-70" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Enhanced header with improved mobile layout */}
      <header className="relative z-20 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {selectedScenario && (
              <div className="glass-morphism p-2 sm:p-3 rounded-full shadow-lg">
                {getScenarioIcon(selectedScenario)}
              </div>
            )}
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                <Wand2 className="text-yellow-300 h-5 w-5 sm:h-6 sm:w-6" />
                {title}
              </h2>
              <p className="text-white/70 text-xs sm:text-sm">Magical English Adventure</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSelector
                  currentLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
              />
              <Button 
                  onClick={onEnd} 
                  className="glass-morphism text-white hover:bg-white/30 backdrop-blur-lg rounded-full p-2 sm:p-3 border border-white/30 hover:border-white/50 transition-all duration-300 group"
              >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="sr-only">End Adventure</span>
              </Button>
          </div>
        </div>
      </header>
      
      {/* Enhanced Chat History with better mobile layout */}
      <div 
        ref={chatContainerRef} 
        className="flex-grow w-full max-w-4xl mx-auto space-y-3 sm:space-y-4 overflow-y-auto p-4 sm:p-6 pb-48 sm:pb-56 lg:pb-64 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent relative z-10"
        style={{ maxHeight: 'calc(100vh - 280px)' }}
      >
          {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 sm:gap-3 w-full transition-all duration-500 message-appear ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 self-start h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center border-2 border-white/50 shadow-lg group hover:scale-110 transition-transform duration-300">
                      <Bot size={20} className="sm:w-6 sm:h-6 group-hover:animate-bounce" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md p-3 sm:p-4 rounded-2xl shadow-lg text-sm sm:text-base transform transition-all duration-300 hover:scale-[1.02]
                    ${ message.role === 'user'
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-br-md shadow-green-500/30'
                        : 'glass-morphism text-white rounded-bl-md shadow-purple-500/30 border border-white/20'
                    }`}
                >
                  <p className="leading-relaxed break-words">{message.content}</p>
                  {message.translatedContent && message.translatedContent !== message.content && (
                    <div className="mt-3 pt-3 border-t border-white/30">
                      <p className="text-xs sm:text-sm text-white/80 flex items-center gap-1.5 mb-2">
                        <Languages size={12} className="sm:w-4 sm:h-4" /> 
                        <span className="font-medium">In your language:</span>
                      </p>
                      <p className="leading-relaxed font-medium text-yellow-200 break-words">{message.translatedContent}</p>
                    </div>
                  )}
                </div>
                 {message.role === 'user' && (
                  <div className="flex-shrink-0 self-start h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-white flex items-center justify-center border-2 border-white/50 shadow-lg group hover:scale-110 transition-transform duration-300">
                      <User size={20} className="sm:w-6 sm:h-6 group-hover:animate-bounce" />
                  </div>
                )}
              </div>
            ))}
            
            {error && (
              <div className="text-center mx-auto max-w-sm">
                <div className="glass-morphism border border-red-300/50 rounded-2xl p-4 animate-pulse bg-gradient-to-r from-red-500/20 to-orange-500/20">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Zap className="h-5 w-5 text-yellow-300" />
                    <span className="text-sm sm:text-base font-medium">{error}</span>
                  </div>
                </div>
              </div>
            )}
      </div>
      
      {/* Enhanced floating action buttons */}
      <div className="absolute bottom-32 sm:bottom-40 lg:bottom-44 right-4 sm:right-6 z-20 flex flex-col gap-2 sm:gap-3">
        <Button 
          onClick={stopAll}
          className="glass-morphism bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl hover:scale-110 transform transition-all duration-300 border border-white/30 group"
        >
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-spin" />
        </Button>
        
        {/* Volume indicator when speaking */}
        {status === 'speaking' && (
          <div className="glass-morphism rounded-full p-2 sm:p-3 animate-pulse">
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced magical interaction area */}
      <footer className="absolute bottom-0 left-0 right-0 z-10">
          <div className="relative">
            {/* Magical glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-xl"></div>
            
            <div className="glass-morphism h-32 sm:h-40 lg:h-44 flex items-center justify-center border-t border-white/20 relative overflow-hidden">
              {/* Decorative magical elements */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  <div className="w-3 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
              
              <GenieOrb
                  status={status}
                  onClick={status === 'listening' ? stopAll : handleVoiceInput}
                  disabled={status === 'processing' || status === 'speaking'}
              />
              
              {/* Magical sparkles around the orb */}
              <div className="absolute top-8 left-8 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-70"></div>
              <div className="absolute top-12 right-12 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-80"></div>
              <div className="absolute bottom-8 left-12 w-3 h-3 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute bottom-12 right-8 w-2 h-2 bg-green-300 rounded-full animate-ping opacity-70"></div>
            </div>
          </div>
      </footer>
    </div>
  );
}