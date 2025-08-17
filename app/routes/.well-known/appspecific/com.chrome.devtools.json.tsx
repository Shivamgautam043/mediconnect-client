import { LoaderFunction } from "react-router";
export const loader: LoaderFunction = () => {
  return new Response("{}", {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};