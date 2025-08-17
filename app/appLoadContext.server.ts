// app/appLoadContext.server.ts
import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import { getSession } from "~/backend/session.server";

// Extend AppLoadContext
declare module "react-router" {
  interface AppLoadContext {
    user: {
      id: string | null;
      email: string | null;
      type: string | null;
      isLoggedIn: boolean;
    };
  }
}

export const app = express();

app.use(
  createRequestHandler({
    // Remix build
    //@ts-expect-error - virtual module provided by React Router at build time
    build: () => import("virtual:react-router/server-build"),
    // Custom context
    getLoadContext: async (request) => {
      const session = await getSession(request.headers.cookie);

      return {
        user: {
          id: session.get("userId") ?? null,
          email: session.get("email") ?? null,
          type: session.get("userType") ?? null,
          isLoggedIn: !!session.get("userId"),
        },
      };
    },
  }),
);
