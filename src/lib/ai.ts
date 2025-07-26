import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  translatedContent?: string;
  timestamp: Date;
}

export interface RoleplayScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  systemPrompt: string;
}

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'wizard-academy',
    title: '🏰 Wizard Academy',
    description: 'Welcome to the most magical school in the realm! Practice casting spells, talking to magical creatures, and making friends with fellow wizards.',
    context: 'You are a new student at the Wizard Academy, learning magic and making friends',
    systemPrompt: 'You are Professor Sparklebeard, a wise and jolly wizard teacher at the Wizard Academy. Help the young wizard student practice English by talking about: magic spells, magical creatures (dragons, unicorns, phoenixes), potion brewing, flying on broomsticks, magical classes, wizard friends, and academy adventures. Use magical vocabulary, be encouraging, and make learning feel like a magical quest. Keep responses whimsical, age-appropriate, and full of wonder. Occasionally teach them "magic words" (English vocabulary) and celebrate their progress like they just learned a new spell!'
  },
  {
    id: 'enchanted-marketplace',
    title: '🌟 Enchanted Marketplace',
    description: 'Trade magical items and discover mystical treasures! Practice bargaining with friendly merchants and learning about magical artifacts.',
    context: 'You are exploring a bustling magical marketplace filled with wonders',
    systemPrompt: 'You are Merchant Mystique, a friendly magical trader in the Enchanted Marketplace. Help the young adventurer practice English by: selling magical items (healing potions, magic wands, crystal balls, enchanted jewelry), describing magical properties of items, teaching them about magical creatures\' needs, discussing prices with magical currency (gold coins, emeralds, star dust), and sharing stories about where magical items come from. Use descriptive language about colors, textures, and magical effects. Be enthusiastic about your magical wares and patient with the young customer. Make every transaction feel like a magical discovery!'
  },
  {
    id: 'giants-castle',
    title: '🏡 Giant\'s Cozy Castle',
    description: 'Visit the friendly giants who live in a magical castle! Help them with daily activities and learn about their enormous but cozy lifestyle.',
    context: 'You are visiting the home of gentle, friendly giants in their cozy castle',
    systemPrompt: 'You are Gentle Giant Gwendolyn, a kind-hearted giant who lives in a cozy castle. Help the tiny human friend practice English by talking about: giant-sized daily activities (cooking enormous meals, tending giant gardens, reading huge books), caring for magical pets (giant cats, enormous butterflies, massive friendly dogs), castle maintenance (cleaning towering rooms, organizing giant furniture), preparing for giant celebrations, and sharing stories about giant family traditions. Use size-related vocabulary, be warm and motherly, and make the human feel welcome despite the size difference. Describe everything in wonderfully big proportions while keeping it cozy and homey!'
  },
  {
    id: 'storybook-kingdom',
    title: '📚 Storybook Kingdom',
    description: 'Enter a magical land where fairy tales come to life! Meet story characters and create your own magical adventures.',
    context: 'You are in the Storybook Kingdom where all fairy tales and stories come to life',
    systemPrompt: 'You are the Fairy Tale Narrator, a magical storyteller who guides adventures in the Storybook Kingdom. Help the young reader practice English by: meeting fairy tale characters (princesses, knights, talking animals, magical fairies), creating new story adventures together, visiting famous story locations (enchanted forests, magical castles, beautiful kingdoms), solving story problems with wisdom and kindness, and learning about different fairy tale traditions. Use storytelling language, encourage creativity and imagination, and help them become the hero of their own story. Make every conversation feel like they\'re living inside a beautiful, magical book! Encourage them to use "Once upon a time" language and celebrate their creative ideas.'
  },
  // Keep the original ones as backup/alternatives
  {
    id: 'school',
    title: 'School Conversation',
    description: 'Practice talking with teachers and classmates',
    context: 'You are in a school setting',
    systemPrompt: 'You are a friendly English tutor helping a student practice school conversations. Keep responses simple, encouraging, and age-appropriate. Ask questions about classes, homework, friends, and school activities. Correct pronunciation gently when needed.'
  },
  {
    id: 'store',
    title: 'Store Shopping',
    description: 'Learn how to shop and ask for help',
    context: 'You are in a store',
    systemPrompt: 'You are a helpful store clerk teaching a student how to shop in English. Help them practice asking for items, prices, and directions in the store. Use simple vocabulary and be patient with their responses.'
  },
  {
    id: 'home',
    title: 'Home & Family',
    description: 'Talk about daily life and family',
    context: 'You are at home',
    systemPrompt: 'You are a friendly family member helping someone practice English conversations about home life. Discuss daily routines, family activities, chores, and meals. Keep the conversation warm and supportive.'
  }
];

export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chatHistory: ChatMessage[] = [];
  private currentScenario: RoleplayScenario | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY is not configured');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Try gemini-1.5-flash first, fallback to gemini-1.5-pro if needed
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  // Start a free-flow conversation
  async startFreeFlowChat(): Promise<string> {
    this.currentScenario = null;
    this.chatHistory = [];
    
    const welcomeMessage = "Hello! I'm your English tutor. You can talk to me about anything you'd like to practice. Just start speaking and I'll help you improve your English! What would you like to talk about today?";
    
    this.addMessage('assistant', welcomeMessage);
    return welcomeMessage;
  }

  // Start a roleplay scenario
  async startRoleplay(scenarioId: string): Promise<string> {
    const scenario = ROLEPLAY_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) {
      throw new Error('Scenario not found');
    }

    this.currentScenario = scenario;
    this.chatHistory = [];

    const welcomeMessage = `Great! Let's practice ${scenario.title.toLowerCase()}. ${scenario.description}. I'll help you practice speaking naturally. Let's begin!`;
    
    this.addMessage('assistant', welcomeMessage);
    return welcomeMessage;
  }

  // Send a message and get AI response
  async sendMessage(userInput: string): Promise<string> {
    this.addMessage('user', userInput);

    try {
      // Build context for the AI
      let prompt = '';
      
      if (this.currentScenario) {
        prompt = `${this.currentScenario.systemPrompt}\n\n`;
        prompt += `Context: ${this.currentScenario.context}\n\n`;
      } else {
        prompt = 'You are a friendly English tutor. Help the student practice English conversation. Keep responses encouraging, simple, and conversational. Gently correct mistakes and ask follow-up questions to keep the conversation flowing.\n\n';
      }

      // Add recent conversation history
      const recentHistory = this.chatHistory.slice(-6); // Last 6 messages for context
      prompt += 'Recent conversation:\n';
      recentHistory.forEach(msg => {
        prompt += `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}\n`;
      });

      prompt += '\nPlease respond as the tutor. Keep your response under 100 words and focus on helping the student practice English naturally.';

      const result = await this.model.generateContent(prompt);
      const response = result.response.text();
      
      this.addMessage('assistant', response);
      return response;
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Provide more specific error messages
      if (error.message?.includes('404')) {
        const errorResponse = "I'm having trouble connecting to my AI brain right now. Let me try a different approach. Could you repeat what you said?";
        this.addMessage('assistant', errorResponse);
        return errorResponse;
      } else if (error.message?.includes('API key')) {
        const errorResponse = "There seems to be an issue with my configuration. Please check that the API key is set up correctly.";
        this.addMessage('assistant', errorResponse);
        return errorResponse;
      } else {
        const errorResponse = "I'm sorry, I'm having trouble understanding right now. Could you try saying that again?";
        this.addMessage('assistant', errorResponse);
        return errorResponse;
      }
    }
  }

  // Add message to chat history
  private addMessage(role: 'user' | 'assistant', content: string): void {
    this.chatHistory.push({
      role,
      content,
      timestamp: new Date()
    });

    // Keep only last 20 messages to manage memory
    if (this.chatHistory.length > 20) {
      this.chatHistory = this.chatHistory.slice(-20);
    }
  }

  // Get current chat history
  getChatHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }

  // Get current scenario
  getCurrentScenario(): RoleplayScenario | null {
    return this.currentScenario;
  }

  // Clear chat history
  clearHistory(): void {
    this.chatHistory = [];
    this.currentScenario = null;
  }
}

// Global AI service instance
export const aiService = new AIService();
