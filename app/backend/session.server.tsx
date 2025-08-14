// app/session.server.ts

import { createCookieSessionStorage } from "@remix-run/node";
import { late } from "zod/v3";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session", // Cookie name
    secure: process.env.NODE_ENV === "production", // true on prod (HTTPS)
    secrets: ["super-secret-key"], // Change to env var in prod
    sameSite: "lax", // CSRF protection
    path: "/", // Cookie available to entire app
    httpOnly: true, // Prevent JS access (secure)
    maxAge: 60 * 60 * 24 * 7, // 7 days (can change as needed)
  },
});

// Export helper methods
export const { getSession, commitSession, destroySession } = sessionStorage;
