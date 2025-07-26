import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { ArrowRight, Bot, Drama, Mic, Quote, Smile, Star, Sparkles, Zap, Globe, Users } from "lucide-react";
import { useNavigate } from "react-router";

const FEATURES = [
  {
    icon: Mic,
    title: "Voice Interaction",
    description: "Natural conversation with an AI tutor that listens and responds aloud.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Drama,
    title: "Roleplay Scenarios",
    description: "Practice real-world situations like ordering at a store or making friends at school.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Bot,
    title: "AI-Powered Learning",
    description: "Intelligent, age-appropriate responses powered by cutting-edge AI models.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Smile,
    title: "Child-Friendly Design",
    description: "An encouraging and patient tutor, perfect for building confidence in young learners.",
    gradient: "from-orange-500 to-red-500",
  },
] as const;

const STATS = [
  { number: "5,000+", label: "Happy Families", icon: Users },
  { number: "50,000+", label: "Conversations", icon: Mic },
  { number: "25+", label: "Languages", icon: Globe },
  { number: "98%", label: "Success Rate", icon: Star },
] as const;

const TESTIMONIALS = [
  {
    content:
      "My 7-year-old daughter loves practicing with Genie. It's helped her become so much more confident speaking, and she actually looks forward to learning time!",
    author: "Jennifer Martinez",
    role: "Parent",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    content:
      "The roleplay scenarios are brilliant. Our students can practice real-world conversations in a safe, judgment-free environment. The voice interaction keeps them engaged like nothing else.",
    author: "David Thompson",
    role: "Elementary Teacher",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
];

function App() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-800 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-32">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-center lg:text-left space-y-6 sm:space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 shadow-lg border border-blue-200/50 backdrop-blur-sm">
                  <Star className="h-4 w-4 fill-current animate-pulse" />
                  <span className="text-sm font-semibold">
                    Trusted by 5,000+ Families
                  </span>
                  <Sparkles className="h-3 w-3 text-blue-500" />
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Unlock Your Child's Voice
                  </span>
                  <br />
                  <span className="text-slate-800">
                    with an AI Tutor
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  SpeakGenie makes learning English fun and natural through 
                  <span className="font-semibold text-blue-600"> interactive voice conversations</span> and 
                  <span className="font-semibold text-purple-600"> real-world roleplay scenarios</span>.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  {!isUserLoaded ? (
                    <div className="h-14 w-48 rounded-xl bg-slate-200 animate-pulse"></div>
                  ) : !user ? (
                    <SignInButton mode="modal">
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Start Learning Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </SignInButton>
                  ) : (
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                  
                  <button className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center gap-2 group">
                    Watch Demo
                    <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-200">
                      <div className="w-0 h-0 border-l-4 border-l-current border-y-2 border-y-transparent ml-1"></div>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="relative mt-8 lg:mt-0">
                {/* Enhanced Product Mockup */}
                <div className="relative">
                  {/* Floating elements around mockup */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg animate-bounce"></div>
                  <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute -bottom-4 -left-2 w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
                  
                  <div className="relative bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/50 transform hover:scale-105 transition-transform duration-500">
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex flex-col items-center justify-center p-6 sm:p-8 relative overflow-hidden">
                      {/* Background pattern */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-2xl"></div>
                      
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center mb-4 shadow-2xl ring-4 ring-white/50 transform hover:rotate-12 transition-transform duration-300">
                          <Bot size={40} className="sm:w-16 sm:h-16" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-700 mb-2 text-center">Hello! What would you like to learn today?</h3>
                        <div className="mt-4 h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white flex items-center justify-center shadow-lg animate-pulse">
                          <Mic size={24} />
                        </div>
                        
                        {/* Floating speech indicators */}
                        <div className="absolute top-4 left-4 flex gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  A Smarter Way to Learn English
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Our features are designed to build confidence and make practicing a joy, not a chore.
              </p>
            </div>
            
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 xl:gap-12">
              {FEATURES.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="group relative bg-gradient-to-br from-white to-slate-50/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 backdrop-blur-sm transform hover:-translate-y-2 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Loved by Parents and Educators
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Don't just take our word for it. Here's what they're saying.
              </p>
            </div>
            
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      {/* Gradient border and glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl p-1">
                        <div className="w-full h-full bg-white rounded-xl sm:rounded-2xl"></div>
                      </div>
                      
                      <div className="relative bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl p-1 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-cover rounded-xl sm:rounded-2xl shadow-lg"
                        />
                      </div>
                      
                      {/* Floating decorative elements */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg animate-pulse"></div>
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-green-400 to-teal-400 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center lg:text-left">
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/50">
                      <Quote className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-300 mb-4 sm:mb-6 mx-auto lg:mx-0" fill="currentColor" />
                      <p className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-700 mb-4 sm:mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="text-base sm:text-lg">
                        <div className="font-bold text-slate-800 text-lg sm:text-xl">
                          {testimonial.author}
                        </div>
                        <div className="text-slate-500 font-medium">
                          {testimonial.role}
                        </div>
                      </div>
                      
                      {/* Decorative quote marks */}
                      <div className="absolute top-4 right-6 text-6xl text-blue-100 font-serif leading-none opacity-50">"</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Statistics Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Join Our Growing Community
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Thousands of families worldwide trust SpeakGenie to help their children excel in English.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {STATS.map((stat, index) => (
                <div 
                  key={index} 
                  className="group text-center transform hover:scale-110 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl group-hover:bg-white/20 transition-colors duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-blue-100 font-medium text-sm sm:text-base">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl sm:rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 sm:p-12 lg:p-16 text-center text-white overflow-hidden shadow-2xl">
              {/* Enhanced background effects */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-500/20 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 text-blue-200 px-4 py-2 mb-6 sm:mb-8 backdrop-blur-sm border border-white/20">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    Ready to Transform Learning?
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                    Start the Adventure
                  </span>
                  <br />
                  <span className="text-white">Today!</span>
                </h2>
                
                <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-10 text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Give your child the confidence to speak English fluently. Join thousands of happy learners today.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  {!user ? (
                    <SignInButton mode="modal">
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-white/20">
                        <Zap className="mr-2 h-5 w-5" />
                        Get Started for Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </SignInButton>
                  ) : (
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-white/20"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Open My Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                  
                  <div className="text-slate-300 text-sm sm:text-base">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Start learning in 30 seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;