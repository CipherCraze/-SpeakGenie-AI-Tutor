import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { ReactNode } from "react";
import { Navigate } from "react-router";
import { api } from "../../../convex/_generated/api";

interface ProtectedRouteProps {
  children: ReactNode;
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoaded: isUserLoaded } = useUser();
  
  // Only query if user is loaded and exists
  const userData = useQuery(
    api.users.getUserByToken,
    isUserLoaded && user?.id ? { tokenIdentifier: user.id } : "skip"
  );
  
  // Only query subscription if we have user data
  // Step 1: Wait for Clerk to initialize
  if (!isUserLoaded) {
    return <LoadingSpinner />;
  }

  // Step 2: Check if user is authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Step 3: Wait for user data to load
  if (userData === undefined) {
    return <LoadingSpinner />;
  }

  // Step 4: Check if user exists in database
  if (userData === null) {
    return <Navigate to="/" replace />;
  }

  // All checks passed, render protected content
  return <>{children}</>;
}
