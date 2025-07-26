import { ClerkProvider } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { TempoDevtools } from "tempo-devtools"; // Disabled for now
import App from "./App.tsx";
import "./index.css";

// Check if Convex URL is provided
const convexUrl = import.meta.env.VITE_CONVEX_URL as string;
console.log("Convex URL:", convexUrl);

if (!convexUrl) {
  throw new Error(
    "Missing VITE_CONVEX_URL environment variable. " +
    "Please run 'npx convex dev' and add the deployment URL to your .env.local file. " +
    "See https://docs.convex.dev/quickstart for setup instructions."
  );
}

const convex = new ConvexReactClient(convexUrl);

// TempoDevtools.init(); // Disabled for now

const basename = import.meta.env.BASE_URL;

// Import your P Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log("Clerk Key:", PUBLISHABLE_KEY ? "Present" : "Missing");

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
    >
    <ConvexProvider client={convex}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ConvexProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
