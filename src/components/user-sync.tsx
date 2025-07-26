import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

export function UserSync() {
  const { user, isLoaded } = useUser();
  const createOrUpdateUser = useMutation(api.users.createOrUpdateUser);
  const [syncAttempted, setSyncAttempted] = useState(false);

  useEffect(() => {
    // Only run when user is loaded and authenticated, and we haven't tried yet
    if (isLoaded && user && !syncAttempted) {
      setSyncAttempted(true);
      // Create or update user in the database
      createOrUpdateUser({
        tokenIdentifier: user.id,
        name: user.fullName || undefined,
        email: user.primaryEmailAddress?.emailAddress || undefined,
      }).catch((error) => {
        console.warn("User sync failed:", error);
        // Reset so we can try again later
        setSyncAttempted(false);
      });
    }
  }, [isLoaded, user, createOrUpdateUser, syncAttempted]);

  return null; // This component doesn't render anything
}
