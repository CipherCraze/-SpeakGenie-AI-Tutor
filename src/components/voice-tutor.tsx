import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Users, Home, Store, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { speechService, SpeechService } from '../lib/speech';
import { aiService, ROLEPLAY_SCENARIOS, ChatMessage } from '../lib/ai';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
        <Alert>
          <AlertDescription>
            Voice features are not supported in your browser. Please use a modern browser like Chrome, Firefox, or Safari.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">🎤 Voice English Tutor</h2>
        <p className="text-muted-foreground">Practice speaking English with AI-powered conversations</p>
      </div>

      {/* Error Display */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Mode Selection */}
      {!currentMode && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free-Flow Chat */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={startFreeFlow}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-blue-500" />
                Free-Flow AI Chatbot
              </CardTitle>
              <CardDescription>
                Have natural conversations about any topic. Perfect for building confidence in English.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled={isProcessing}>
                {isProcessing ? 'Starting...' : 'Start Conversation'}
              </Button>
            </CardContent>
          </Card>

          {/* Roleplay Mode */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-green-500" />
                Roleplay Mode
              </CardTitle>
              <CardDescription>
                Practice specific scenarios like school, shopping, or home conversations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ROLEPLAY_SCENARIOS.map((scenario) => {
                const Icon = scenario.id === 'school' ? School : 
                           scenario.id === 'store' ? Store : Home;
                
                return (
                  <Button
                    key={scenario.id}
                    className="w-full justify-start border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                    onClick={() => startRoleplay(scenario.id)}
                    disabled={isProcessing}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {scenario.title}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Conversation */}
      {currentMode && (
        <div className="space-y-6">
          {/* Current Mode Display */}
          <Card>
            <CardHeader className="pb-3">
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
                <Button className="h-8 px-3 text-sm" onClick={endConversation}>
                  End Conversation
                </Button>
              </div>
              {currentScenario && (
                <p className="text-sm text-muted-foreground mt-2">
                  {currentScenario.description}
                </p>
              )}
            </CardHeader>
          </Card>

          {/* Voice Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                {/* Status */}
                <div className="text-center">
                  {isListening && (
                    <Badge className="bg-red-500 text-white">
                      🎤 Listening...
                    </Badge>
                  )}
                  {isSpeaking && (
                    <Badge className="bg-blue-500 text-white">
                      🔊 Speaking...
                    </Badge>
                  )}
                  {isProcessing && !isListening && !isSpeaking && (
                    <Badge className="bg-yellow-500 text-white">
                      🤔 Thinking...
                    </Badge>
                  )}
                  {!isListening && !isSpeaking && !isProcessing && (
                    <Badge className="border border-gray-300 bg-white text-gray-800">
                      Ready to listen
                    </Badge>
                  )}
                </div>

                {/* Voice Button */}
                <Button
                  className={`h-20 w-20 rounded-full ${
                    isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  onClick={isListening || isSpeaking ? stopSpeech : handleVoiceInput}
                  disabled={isProcessing && !isListening && !isSpeaking}
                >
                  {isListening ? (
                    <MicOff className="h-8 w-8 text-white" />
                  ) : isSpeaking ? (
                    <VolumeX className="h-8 w-8 text-white" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  {isListening ? 'Click to stop listening' :
                   isSpeaking ? 'Click to stop speaking' :
                   'Click to start speaking'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Chat History */}
          {chatHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conversation</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
