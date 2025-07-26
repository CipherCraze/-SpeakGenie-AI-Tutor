import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles, Wand2, Star, Home, User, LogIn } from "lucide-react";

export function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <nav className="sticky top-0 w-full bg-gradient-to-r from-purple-600/95 via-blue-600/95 to-pink-600/95 backdrop-blur-xl border-b border-white/20 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30">
                <Wand2 className="h-6 w-6 text-yellow-300 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-bold text-white drop-shadow-lg group-hover:text-yellow-200 transition-colors">
                SpeakGenie
              </span>
              <span className="text-xs text-white/70 -mt-1 hidden sm:block">
                ✨ Magic English Learning
              </span>
            </div>

            {/* Floating sparkles */}
            <div className="hidden md:flex space-x-1">
              <Star className="h-3 w-3 text-yellow-300 animate-pulse" />
              <Sparkles className="h-4 w-4 text-pink-300 animate-bounce" />
              <Star className="h-3 w-3 text-blue-300 animate-pulse animation-delay-1000" />
            </div>
          </Link>

          {/* Navigation Items */}
          {isLoaded ? (
            <div className="flex items-center gap-3">
              {isSignedIn ? (
                <>
                  {/* Dashboard Link */}
                  <Link
                    to="/dashboard"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 group"
                  >
                    <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>Dashboard</span>
                  </Link>

                  {/* Welcome Message */}
                  <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white/80">
                      Welcome, {user?.firstName || "Friend"}!
                    </span>
                  </div>

                  {/* Enhanced User Button Container */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur opacity-50"></div>
                    <div className="relative bg-white/20 p-1 rounded-full border border-white/30 backdrop-blur-sm">
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8 rounded-full border-2 border-white/50",
                            userButtonPopoverCard:
                              "bg-white/95 backdrop-blur-xl border border-purple-200 shadow-2xl",
                            userButtonPopoverActionButton:
                              "hover:bg-purple-50 transition-colors",
                          },
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Mobile-friendly navigation */}
                  <Link
                    to="/"
                    className="sm:hidden flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white transition-colors"
                  >
                    <Home className="h-4 w-4" />
                  </Link>

                  {/* Enhanced Sign In Button */}
                  <SignInButton mode="modal" signUpFallbackRedirectUrl="/">
                    <Button className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20 hover:border-white/40">
                      {/* Button glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative flex items-center gap-2">
                        <LogIn className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Sign In</span>
                        <span className="sm:hidden">Join</span>
                      </div>

                      {/* Sparkle animation on hover */}
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Sparkles className="h-3 w-3 text-white animate-pulse" />
                      </div>
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          ) : (
            /* Enhanced Loading State */
            <div className="flex items-center gap-3">
              <div className="hidden sm:block h-8 w-24 bg-white/20 rounded-full animate-pulse backdrop-blur-sm"></div>
              <div className="h-10 w-10 bg-white/20 rounded-full animate-pulse backdrop-blur-sm"></div>
            </div>
          )}
        </div>
      </div>

      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping animation-delay-1000 opacity-60"></div>
        <div className="absolute top-2 right-1/3 w-1 h-1 bg-pink-300 rounded-full animate-ping animation-delay-2000 opacity-40"></div>
        <div className="absolute top-6 left-3/4 w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-3000 opacity-50"></div>
      </div>
    </nav>
  );
}