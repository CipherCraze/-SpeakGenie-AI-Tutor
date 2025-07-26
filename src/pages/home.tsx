import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { ArrowRight, Bot, Drama, Mic, Quote, Smile, Star } from "lucide-react";
import { useNavigate } from "react-router";

const FEATURES = [
  {
    icon: Mic,
    title: "Voice Interaction",
    description: "Natural conversation with an AI tutor that listens and responds aloud.",
  },
  {
    icon: Drama,
    title: "Roleplay Scenarios",
    description: "Practice real-world situations like ordering at a store or making friends at school.",
  },
  {
    icon: Bot,
    title: "AI-Powered Learning",
    description: "Intelligent, age-appropriate responses powered by cutting-edge AI models.",
  },
  {
    icon: Smile,
    title: "Child-Friendly Design",
    description: "An encouraging and patient tutor, perfect for building confidence in young learners.",
  },
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-600 px-4 py-2 mb-4">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">
                    Trusted by 5,000+ Families
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
                  Unlock Your Child's Voice with an AI Tutor
                </h1>
                <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  SpeakGenie makes learning English fun and natural through interactive voice conversations and real-world roleplay scenarios.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  {!isUserLoaded ? (
                    <div className="h-12 w-40 rounded-lg bg-slate-200 animate-pulse"></div>
                  ) : !user ? (
                    <SignInButton mode="modal">
                      <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                        Start Learning Free
                      </Button>
                    </SignInButton>
                  ) : (
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      Go to Dashboard
                    </Button>
                  )}
                </div>
              </div>
              <div className="hidden lg:block">
                {/* Product Mockup */}
                <div className="relative bg-white p-6 rounded-2xl shadow-2xl border border-slate-200/80">
                  <div className="aspect-video bg-blue-50 rounded-lg flex flex-col items-center justify-center p-8">
                    <div className="h-28 w-28 rounded-full bg-purple-500 text-white flex items-center justify-center mb-4 ring-4 ring-white shadow-lg">
                      <Bot size={64} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">Hello! What would you like to learn today?</h3>
                    <div className="mt-4 h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md animate-pulse">
                      <Mic size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold tracking-tight">A Smarter Way to Learn English</h2>
              <p className="mt-4 text-lg text-slate-600">
                Our features are designed to build confidence and make practicing a joy, not a chore.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-xl bg-slate-50/70 p-6 border border-slate-200/80 transition-all hover:bg-white hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 mb-5 transition-all group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold tracking-tight">Loved by Parents and Educators</h2>
              <p className="mt-4 text-lg text-slate-600">
                Don't just take our word for it. Here's what they're saying.
              </p>
            </div>
            <div className="space-y-20">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex-shrink-0">
                    <div className="relative p-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg">
                        <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-48 h-48 object-cover rounded-xl"
                        />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Quote className="h-12 w-12 text-blue-200 mb-4" fill="currentColor" />
                    <p className="text-2xl font-medium text-slate-700 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="text-lg">
                      <div className="font-semibold text-slate-800">
                        {testimonial.author}
                      </div>
                      <div className="text-slate-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="relative rounded-2xl bg-slate-900 p-16 text-center text-white overflow-hidden">
                {/* Abstract background blobs */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/40 rounded-full filter blur-3xl opacity-70"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/40 rounded-full filter blur-3xl opacity-70"></div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">
                  Ready to Start the Adventure?
                </h2>
                <p className="text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
                  Give your child the confidence to speak English fluently. Join thousands of happy learners today.
                </p>
                <div className="flex items-center justify-center">
                  {!user ? (
                    <SignInButton mode="modal">
                      <Button className="bg-white text-blue-600 hover:bg-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                        Get Started for Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </SignInButton>
                  ) : (
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="bg-white text-blue-600 hover:bg-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                      Open My Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
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