import type { MetaFunction } from "@remix-run/node";
import { HomeSection1 } from "./routeComponent";
export { loader } from "./loader.server";


export const meta: MetaFunction = () => {
    return [
        { title: "MediConnect" },
        { name: "description", content: "Simply connect. Seamlessly care." },
    ];
};

export default function Index() {
    return (
        <>
            <HomeSection1 />
        </>
    )
}
