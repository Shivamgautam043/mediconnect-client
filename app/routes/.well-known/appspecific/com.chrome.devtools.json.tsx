import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return new Response("{}", {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};