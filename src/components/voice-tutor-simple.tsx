import React, { useState, useEffect } from 'react';
import { Mic, MicOff, MessageCircle, Users, Home, Store, School } from 'lucide-react';
import { speechService, SpeechService } from '../lib/speech';
import { aiService, ROLEPLAY_SCENARIOS, ChatMessage } from '../lib/ai';

interface VoiceTutorProps {
  className?: string;
}

export default function VoiceTutor({ className }: VoiceTutorProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMode, setCurrentMode] = useState<'free-flow' | 'roleplay' | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  useEffect(() => {
    setIsSpeechSupported(SpeechService.isSupported());
  }, []);

  // Start free-flow conversation
  const startFreeFlow = async () => {
    try {
      setError(null);
      setIsProcessing(true);
      const welcomeMessage = await aiService.startFreeFlowChat();
      setCurrentMode('free-flow');
      setChatHistory(aiService.getChatHistory());
      
      // Speak the welcome message
      setIsSpeaking(true);
      await speechService.speak(welcomeMessage);
      setIsSpeaking(false);
    } catch (err) {
      setError('Failed to start conversation. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Start roleplay scenario
  const startRoleplay = async (scenarioId: string) => {
    try {
      setError(null);
      setIsProcessing(true);
      const welcomeMessage = await aiService.startRoleplay(scenarioId);
      setCurrentMode('roleplay');
      setSelectedScenario(scenarioId);
      setChatHistory(aiService.getChatHistory());
      
      // Speak the welcome message
      setIsSpeaking(true);
      await speechService.speak(welcomeMessage);
      setIsSpeaking(false);
    } catch (err) {
      setError('Failed to start roleplay. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle voice input
  const handleVoiceInput = async () => {
    if (!isSpeechSupported) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }

    try {
      setError(null);
      setIsListening(true);
      
      // Listen for user input
      const userInput = await speechService.listen();
      setIsListening(false);
      
      if (userInput.trim()) {
        setIsProcessing(true);
        
        // Get AI response
        const response = await aiService.sendMessage(userInput);
        setChatHistory(aiService.getChatHistory());
        
        // Speak the response
        setIsSpeaking(true);
        await speechService.speak(response);
        setIsSpeaking(false);
      }
    } catch (err) {
      setError('Sorry, I didn\'t catch that. Please try speaking again.');
      console.error(err);
    } finally {
      setIsListening(false);
      setIsProcessing(false);
      setIsSpeaking(false);
    }
  };

  // Stop all speech activities
  const stopSpeech = () => {
    speechService.stopListening();
    speechService.stopSpeaking();
    setIsListening(false);
    setIsSpeaking(false);
  };

  // End conversation
  const endConversation = () => {
    stopSpeech();
    setCurrentMode(null);
    setSelectedScenario(null);
    setChatHistory([]);
    aiService.clearHistory();
  };

  const currentScenario = selectedScenario ? 
    ROLEPLAY_SCENARIOS.find(s => s.id === selectedScenario) : null;

  if (!isSpeechSupported) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            Voice features are not supported in your browser. Please use a modern browser like Chrome, Firefox, or Safari.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">🎤 Voice English Tutor</h2>
        <p className="text-gray-600">Practice speaking English with AI-powered conversations</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Mode Selection */}
      {!currentMode && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free-Flow Chat */}
          <div 
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border"
            onClick={startFreeFlow}
          >
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-semibold">Free-Flow AI Chatbot</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Have natural conversations about any topic. Perfect for building confidence in English.
            </p>
            <button 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={isProcessing}
            >
              {isProcessing ? 'Starting...' : 'Start Conversation'}
            </button>
          </div>

          {/* Roleplay Mode */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold">Roleplay Mode</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Practice specific scenarios like school, shopping, or home conversations.
            </p>
            <div className="space-y-2">
              {ROLEPLAY_SCENARIOS.map((scenario) => {
                const Icon = scenario.id === 'school' ? School : 
                           scenario.id === 'store' ? Store : Home;
                
                return (
                  <button
                    key={scenario.id}
                    className="w-full flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    onClick={() => startRoleplay(scenario.id)}
                    disabled={isProcessing}
                  >
                    <Icon className="h-4 w-4" />
                    {scenario.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Active Conversation */}
      {currentMode && (
        <div className="space-y-6">
          {/* Current Mode Display */}
          <div className="bg-white rounded-lg shadow-md p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentMode === 'free-flow' ? (
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                ) : (
                  <Users className="h-5 w-5 text-green-500" />
                )}
                <span className="font-semibold">
                  {currentMode === 'free-flow' ? 'Free Conversation' : currentScenario?.title}
                </span>
              </div>
              <button 
                className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={endConversation}
              >
                End Conversation
              </button>
            </div>
            {currentScenario && (
              <p className="text-sm text-gray-600 mt-2">
                {currentScenario.description}
              </p>
            )}
          </div>

          {/* Voice Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <div className="flex flex-col items-center space-y-4">
              {/* Status */}
              <div className="text-center">
                {isListening && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    🎤 Listening...
                  </span>
                )}
                {isSpeaking && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    🔊 Speaking...
                  </span>
                )}
                {isProcessing && !isListening && !isSpeaking && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    🤔 Thinking...
                  </span>
                )}
                {!isListening && !isSpeaking && !isProcessing && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Ready to listen
                  </span>
                )}
              </div>

              {/* Voice Button */}
              <button
                className={`h-20 w-20 rounded-full flex items-center justify-center ${
                  isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                } disabled:opacity-50 transition-colors`}
                onClick={isListening || isSpeaking ? stopSpeech : handleVoiceInput}
                disabled={isProcessing && !isListening && !isSpeaking}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8 text-white" />
                ) : (
                  <Mic className="h-8 w-8 text-white" />
                )}
              </button>

              <p className="text-sm text-gray-600 text-center">
                {isListening ? 'Click to stop listening' :
                 isSpeaking ? 'Click to stop speaking' :
                 'Click to start speaking'}
              </p>
            </div>
          </div>

          {/* Chat History */}
          {chatHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <h3 className="text-lg font-semibold mb-4">Conversation</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
