import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function Navbar() {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-12 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-base font-medium text-[#1D1D1F]">Tempo</span>
          </Link>

          <div className="flex-1"></div>

          {isLoaded ? (
            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-3.5 py-1.5 text-sm font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5E5] rounded-full transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <SignInButton mode="modal" signUpFallbackRedirectUrl="/">
                  <Button
                    className="h-8 px-4 text-sm rounded-[14px] bg-[#0066CC] hover:bg-[#0077ED] text-white shadow-sm transition-all"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="h-4 w-16 bg-[#F5F5F7] rounded-full animate-pulse"></div>
                <div className="h-8 w-8 rounded-full bg-[#F5F5F7] animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
