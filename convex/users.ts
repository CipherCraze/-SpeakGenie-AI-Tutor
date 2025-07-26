import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserByToken = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    // For development - just search by token identifier
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .unique();

    return user;
  },
});

export const createOrUpdateUser = mutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .unique();

    if (existingUser) {
      // Update if needed
      if (existingUser.name !== args.name || existingUser.email !== args.email) {
        await ctx.db.patch(existingUser._id, {
          name: args.name,
          email: args.email,
        });
      }
      return existingUser;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      tokenIdentifier: args.tokenIdentifier,
    });

    return await ctx.db.get(userId);
  },
});