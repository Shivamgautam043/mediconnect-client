import { PassThrough } from "node:stream";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { routes } from "@react-router/dev/routes";
import { getSession } from "./backend/session.server";

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers
) {
  if (request.url.includes(".well-known/appspecific/com.chrome.devtools.json")) {
    return new Response(null, { status: 204 });
  }

  // React Router static handler
  const handler = createStaticHandler(routes);
  const context = await handler.query(request);

  const router = createStaticRouter(handler.dataRoutes, context);

  const isBot = isbot(request.headers.get("user-agent") || "");
  return isBot
    ? handleBotRequest(router, request, responseStatusCode, responseHeaders)
    : handleBrowserRequest(router, request, responseStatusCode, responseHeaders);
}

function handleBotRequest(
  router: ReturnType<typeof createStaticRouter>,
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouterProvider
        router={router}
        context={(router as any).state}
        nonce="the-nonce"
      />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body as any, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(err) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(err);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  router: ReturnType<typeof createStaticRouter>,
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouterProvider
        router={router}
        context={(router as any).state}
        nonce="the-nonce"
      />,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body as any, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(err) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(err);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

// Session context (React Router equivalent of Remix's getLoadContext)
export async function getLoadContext({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  return {
    user: {
      id: session.get("userId") ?? null,
      email: session.get("email") ?? null,
      type: session.get("userType") ?? null,
      isLoggedIn: !!session.get("userId"),
    },
  };
}
