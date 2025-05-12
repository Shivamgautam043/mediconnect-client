import type { MetaFunction } from "@remix-run/node";
import { DefaultHeader } from "~/components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  return (
    <div>
      <DefaultHeader />

    </div>
  );
}

