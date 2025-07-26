export default {
    providers: [
      {
        domain: process.env.CLERK_ISSUER_URL || "https://awake-terrier-41.clerk.accounts.dev",
        applicationID: "convex",
      },
    ]
  };