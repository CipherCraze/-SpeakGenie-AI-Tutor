import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading while auth state is being determined
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFD]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066CC]"></div>
      </div>
    );
  }

  // Redirect to home if not signed in
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
