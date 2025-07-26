import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { LoadingSpinner } from "@/components/loading-spinner";
import VoiceTutorEnhanced from "@/components/voice-tutor-enhanced";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, MessageSquare, School, Store, Home, Award, Sparkles, AlertCircle, ChevronLeft, Star, Smile, Gamepad, BookOpen, Gift } from "lucide-react";
import React, { useState } from "react";

// Add custom animations
const customStyles = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(1deg); }
    66% { transform: translateY(5px) rotate(-1deg); }
  }
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(8px) rotate(-1deg); }
    66% { transform: translateY(-5px) rotate(1deg); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(0.5deg); }
  }
  .animate-shimmer {
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
  }
  .animate-float-slow {
    animation: float-slow 10s ease-in-out infinite;
  }
  .animation-delay-500 { animation-delay: 0.5s; }
  .animation-delay-1000 { animation-delay: 1s; }
  .animation-delay-1500 { animation-delay: 1.5s; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-2500 { animation-delay: 2.5s; }
  .animation-delay-3000 { animation-delay: 3s; }
  .animation-delay-4000 { animation-delay: 4s; }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
}

// Main Dashboard Component
export default function Dashboard() {
    const { user, isLoaded: isUserLoaded } = useUser();
    const [showVoiceTutor, setShowVoiceTutor] = useState(false);
    const [selectedMode, setSelectedMode] = useState<'free-flow' | 'wizard-academy' | 'enchanted-marketplace' | 'giants-castle' | 'storybook-kingdom' | 'school' | 'store' | 'home' | null>(null);
    
    const userData = useQuery(api.users.getUserByToken,
        user?.id ? { tokenIdentifier: user.id } : "skip"
    );

    if (!isUserLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-blue-100">
                <div className="flex flex-col items-center">
                    <LoadingSpinner />
                    <p className="mt-4 text-purple-600 font-bold animate-pulse">
                        Loading your magical English adventure...
                    </p>
                </div>
            </div>
        );
    }
    
    if (!user) {
        return <AuthErrorScreen />;
    }

    const startTutor = (mode: 'free-flow' | 'wizard-academy' | 'enchanted-marketplace' | 'giants-castle' | 'storybook-kingdom' | 'school' | 'store' | 'home') => {
        setSelectedMode(mode);
        setShowVoiceTutor(true);
    };

    const backToDashboard = () => {
        setShowVoiceTutor(false);
        setSelectedMode(null);
    };

    if (showVoiceTutor) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-purple-50 font-sans">
                <Navbar />
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8">
                        <Button
                            onClick={backToDashboard}
                            className="text-purple-600 hover:bg-purple-100/50 mb-4 rounded-full px-4 py-2 border border-purple-300"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back to Magic World
                        </Button>
                        <VoiceTutorEnhanced autoStartMode={selectedMode} onEnd={backToDashboard} />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-sans relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
                <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-xl animate-float-slow"></div>
                
                {/* Enhanced floating magical elements with more particles */}
                <div className="absolute top-20 left-20 animate-bounce animation-delay-1000">
                    <Star className="h-8 w-8 text-yellow-300 fill-current" />
                </div>
                <div className="absolute top-40 right-32 animate-bounce animation-delay-2000">
                    <Sparkles className="h-6 w-6 text-pink-300" />
                </div>
                <div className="absolute bottom-40 left-1/3 animate-bounce animation-delay-3000">
                    <Gift className="h-7 w-7 text-blue-300" />
                </div>
                <div className="absolute top-60 right-1/4 animate-bounce animation-delay-4000">
                    <Smile className="h-6 w-6 text-purple-300" />
                </div>
                
                {/* Additional magical particles */}
                <div className="absolute top-32 left-1/2 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-70"></div>
                <div className="absolute top-1/3 right-1/5 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
                <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-2/3 right-2/5 w-1 h-1 bg-pink-300 rounded-full animate-ping opacity-50"></div>
                <div className="absolute bottom-1/4 right-1/6 w-2 h-2 bg-green-300 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-1/6 left-2/5 w-1 h-1 bg-orange-300 rounded-full animate-bounce opacity-60"></div>
            </div>
            
            <Navbar />
            <main className="flex-grow relative z-10">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    
                    {/* Enhanced Welcome Section */}
                    <div className="text-center mb-16 relative">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <Star className="h-8 w-8 text-white fill-current" />
                            </div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 tracking-tight mb-4 animate-shimmer">
                                Welcome Back, {user.firstName || 'Magical Friend'}! ✨
                            </h1>
                            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                                Your English adventure awaits! Choose your magical journey and unlock speaking superpowers! 🌟
                            </p>
                        </div>
                    </div>

                    {/* Enhanced Main Feature Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 max-w-6xl mx-auto">
                        <EnhancedFeatureCard
                            icon={<MessageSquare className="h-12 w-12 text-white" />}
                            bgGradient="from-purple-500 via-violet-500 to-indigo-600"
                            title="Chat with Genie 🧞‍♂️"
                            description="Have magical conversations about anything! Your AI friend is ready to talk about adventures, dreams, and everything in between!"
                            buttonText="Start Magic Chat"
                            glowColor="purple"
                            onClick={() => startTutor('free-flow')}
                        />
                        <EnhancedFeatureCard
                            icon={<Gamepad className="h-12 w-12 text-white" />}
                            bgGradient="from-orange-500 via-red-500 to-pink-600"
                            title="Adventure Worlds 🎮"
                            description="Explore magical realms and practice English in exciting scenarios! Each world brings new vocabulary and fun challenges!"
                            buttonText="Choose Adventure"
                            glowColor="orange"
                            onClick={() => document.getElementById('roleplays')?.scrollIntoView({ behavior: 'smooth' })}
                        />
                    </div>

                    {/* Magical Adventure Worlds Section */}
                    <div id="roleplays" className="max-w-6xl mx-auto mb-20 px-3 sm:px-4 md:px-6">
                        <div className="text-center mb-6 sm:mb-8 md:mb-12">
                            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-lg rounded-full p-2 sm:p-3 md:p-4 border border-white/20 shadow-xl mb-3 sm:mb-4 md:mb-6">
                                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-yellow-300 mr-1 sm:mr-2 md:mr-3" />
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                                    Magical Adventure Worlds
                                </h2>
                                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-pink-300 ml-1 sm:ml-2 md:ml-3" />
                            </div>
                            <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2 sm:px-4">
                                Step into enchanted realms where every conversation is an adventure! 🗺️✨
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 sm:gap-6 sm:px-0 md:gap-8">
                            <MagicalScenarioCard
                                icon={<School className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-emerald-600" />}
                                title="🏰 Wizard Academy"
                                description="Learn spells and make magical friends at the most amazing school ever!"
                                bgGradient="from-emerald-400 to-teal-500"
                                borderGlow="emerald"
                                onClick={() => startTutor('wizard-academy')}
                            />
                            <MagicalScenarioCard
                                icon={<Store className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-purple-600" />}
                                title="🌟 Enchanted Marketplace"
                                description="Trade magical items and discover mystical treasures with friendly merchants!"
                                bgGradient="from-purple-400 to-indigo-500"
                                borderGlow="purple"
                                onClick={() => startTutor('enchanted-marketplace')}
                            />
                            <MagicalScenarioCard
                                icon={<Home className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-rose-600" />}
                                title="🏡 Giant's Cozy Castle"
                                description="Help friendly giants with their daily adventures in a magical castle!"
                                bgGradient="from-rose-400 to-pink-500"
                                borderGlow="rose"
                                onClick={() => startTutor('giants-castle')}
                            />
                            <MagicalScenarioCard
                                icon={<BookOpen className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-cyan-600" />}
                                title="📚 Storybook Kingdom"
                                description="Create your own fairy tales and bring magical stories to life!"
                                bgGradient="from-cyan-400 to-blue-500"
                                borderGlow="cyan"
                                onClick={() => startTutor('storybook-kingdom')}
                            />
                        </div>
                    </div>
                    
                    <div className="max-w-5xl mx-auto mt-20">
                        <div className="flex items-center justify-center mb-8">
                            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
                                <Award className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 ml-3">
                                Your Treasure Chest
                            </h2>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-yellow-300 p-8 shadow-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <ProgressItem 
                                    value="42" 
                                    label="Minutes Practiced" 
                                    icon={<Mic className="h-6 w-6 text-blue-500" />} 
                                    bgColor="bg-blue-100"
                                />
                                <ProgressItem 
                                    value="12" 
                                    label="New Words Learned" 
                                    icon={<BookOpen className="h-6 w-6 text-purple-500" />} 
                                    bgColor="bg-purple-100"
                                />
                                <ProgressItem 
                                    value="5" 
                                    label="Adventures Completed" 
                                    icon={<Gamepad className="h-6 w-6 text-green-500" />} 
                                    bgColor="bg-green-100"
                                />
                                <ProgressItem 
                                    value="3" 
                                    label="Day Streak" 
                                    icon={<Gift className="h-6 w-6 text-red-500" />} 
                                    bgColor="bg-red-100"
                                />
                            </div>
                            <div className="mt-8 text-center">
                                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full px-6 py-3 font-bold text-lg shadow-lg">
                                    <Star className="h-5 w-5 mr-2" />
                                    Unlock New Rewards!
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

// Enhanced Feature Card with gradients and glow effects
const EnhancedFeatureCard = ({ icon, bgGradient, title, description, buttonText, glowColor, onClick }: {
    icon: React.ReactNode; bgGradient: string; title: string; description: string; 
    buttonText: string; glowColor: string; onClick: () => void;
}) => (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-3xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-75 blur-xl scale-110 group-hover:opacity-100 transition-opacity duration-500`}></div>
        <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl w-fit mb-6 border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                {icon}
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
            <p className="text-white/90 mb-8 text-lg leading-relaxed">{description}</p>
            <button 
                onClick={onClick} 
                className="bg-white/20 backdrop-blur-lg border border-white/30 text-white rounded-full px-8 py-4 font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center group/button"
            >
                {buttonText} 
                <ArrowRight className="h-5 w-5 ml-2 group-hover/button:translate-x-1 transition-transform duration-300" />
            </button>
        </div>
    </div>
);

// Magical Action Button for main dashboard actions
const MagicalActionButton = ({ onClick, icon, title, subtitle, gradient, hoverGradient }: {
    onClick: () => void; icon: React.ReactNode; title: string; subtitle: string;
    gradient: string; hoverGradient: string;
}) => (
    <button
        onClick={onClick}
        className={`bg-gradient-to-br ${gradient} hover:bg-gradient-to-br hover:${hoverGradient} text-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl group`}
    >
        <div className="flex items-center justify-center mb-3">
            <div className="bg-white/20 backdrop-blur-lg p-3 rounded-full border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-white/80">{subtitle}</p>
    </button>
);

// Enhanced Magical Scenario Card
const MagicalScenarioCard = ({ icon, title, description, bgGradient, borderGlow, onClick }: {
    icon: React.ReactNode; title: string; description: string; 
    bgGradient: string; borderGlow: string; onClick: () => void;
}) => (
    <button 
        onClick={onClick} 
        className={`bg-white/10 backdrop-blur-lg hover:bg-white/20 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/20 hover:border-${borderGlow}-300/50 p-3 sm:p-4 md:p-6 lg:p-8 text-left hover:shadow-2xl hover:scale-105 transition-all duration-500 group relative overflow-hidden w-full min-h-[200px] sm:min-h-[220px] md:min-h-[240px]`}
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
        <div className="relative z-10 h-full flex flex-col">
            <div className="bg-white/20 backdrop-blur-lg p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl w-fit mb-3 sm:mb-4 lg:mb-6 border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                {icon}
            </div>
            <h4 className="font-bold text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 leading-tight">{title}</h4>
            <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 lg:mb-6 flex-grow overflow-hidden"
               style={{
                 display: '-webkit-box',
                 WebkitLineClamp: 3,
                 WebkitBoxOrient: 'vertical'
               }}
            >{description}</p>
            <div className="flex items-center text-white/70 group-hover:text-white transition-colors duration-300 mt-auto">
                <span className="text-xs sm:text-sm font-semibold">Start Adventure</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
        </div>
    </button>
);

// Enhanced Feature Card with gradients
const FeatureCard = ({ icon, bgColor, title, description, buttonText, buttonColor, onClick }: {
    icon: React.ReactNode; bgColor: string; title: string; description: string; 
    buttonText: string; buttonColor: string; onClick: () => void;
}) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-white p-8 flex flex-col items-start shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className={`p-4 rounded-2xl ${bgColor} mb-5 shadow-lg`}>
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Button 
            onClick={onClick} 
            className={`${buttonColor} text-white rounded-full px-6 py-3 font-bold text-lg w-full sm:w-auto shadow-md hover:shadow-lg transition-all`}
        >
            {buttonText} <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
    </div>
);

// Enhanced Scenario Card with playful styling
const ScenarioCard = ({ icon, title, description, bgColor, borderColor, onClick }: {
    icon: React.ReactNode; title: string; description: string; 
    bgColor: string; borderColor: string; onClick: () => void;
}) => (
    <button 
        onClick={onClick} 
        className={`${bgColor} rounded-2xl border-2 ${borderColor} p-6 text-left hover:shadow-lg hover:scale-[1.03] transition-all duration-300 group relative overflow-hidden`}
    >
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/20"></div>
        <div className="flex items-center relative z-10">
            <div className="bg-white p-3 rounded-xl mr-4 shadow-md">{icon}</div>
            <div>
                <h4 className="font-bold text-gray-800 text-lg">{title}</h4>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-500 ml-auto group-hover:text-purple-600 transition-colors transform group-hover:translate-x-1" />
        </div>
    </button>
);

// Enhanced Progress Item with icons
const ProgressItem = ({ value, label, icon, bgColor }: { 
    value: string, label: string, icon: React.ReactNode, bgColor: string 
}) => (
    <div className={`${bgColor} p-4 rounded-2xl border border-white shadow-sm`}>
        <div className="flex justify-center mb-2">
            <div className="bg-white p-2 rounded-lg">
                {icon}
            </div>
        </div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
);

// Enhanced Auth Error Screen
const AuthErrorScreen = () => (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 to-pink-100">
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-center px-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-md border-2 border-purple-200 shadow-xl">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-3">
                    Whoops!
                </h1>
                <p className="text-lg text-purple-700 mb-6">
                    Please sign in to enter our magical English world!
                </p>
                <Button 
                    onClick={() => window.location.href = "/"} 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6 py-3 font-bold text-lg shadow-md"
                >
                    <Home className="h-5 w-5 mr-2" />
                    Go to Home Page
                </Button>
            </div>
        </main>
        <Footer />
    </div>
);