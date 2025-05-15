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
            {/* <div className="h-20"></div>
            <div className="font-medium text-[32px]">
                Whereas disregard and contempt for human rights have resulted
            </div> */}
        </div>
    );
}
