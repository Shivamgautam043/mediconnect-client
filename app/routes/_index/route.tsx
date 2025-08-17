import { MetaFunction } from "react-router";
import { DefaultHeader } from "~/components/header";
import { VerticalSpacer } from "~/utilities/components";
export { loader } from "./loader.server";

export const meta: MetaFunction = () => {
    return [
        { title: "MediConnect" },
        { name: "description", content: "Simply connect. Seamlessly care." },
    ];
};

export default function Index() {
    return (
        <div>
            <DefaultHeader />
            <VerticalSpacer className="h-16 md:h-[72px]" />
            <img
                src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747324599/desktop-banner-1_dibxkn.webp"
                alt=""
                className="w-full"
            />
        </div>
    );
}
