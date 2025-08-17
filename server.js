// server.js
import express from "express";
import morgan from "morgan";

// build path (after `remix build`)
const BUILD_PATH = "./build/server/index.js";
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = express();

// Logging
app.use(morgan("tiny"));

// Disable X-Powered-By for security
app.disable("x-powered-by");

if (DEVELOPMENT) {
  console.log("🚀 Starting development server...");

  // Vite dev middleware (instead of Remix dev server)
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    }),
  );

  app.use(viteDevServer.middlewares);

  // Load appLoadContext dynamically in dev
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./app/appLoadContext.server.ts");
      return await source.app(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });

} else {
  console.log("🚀 Starting production server...");

  // Serve static assets
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
  );
  app.use(express.static("build/client", { maxAge: "1h" }));

  // Load Remix build
  app.use(await import(BUILD_PATH).then((mod) => mod.app));
}

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
