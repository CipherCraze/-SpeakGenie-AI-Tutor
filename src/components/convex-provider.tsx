import { useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

interface ConvexClientProviderProps {
  children: ReactNode;
  client: ConvexReactClient;
}

export function ConvexClientProvider({ children, client }: ConvexClientProviderProps) {
  return (
    <ConvexProviderWithClerk client={client} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
