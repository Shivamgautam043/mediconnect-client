import { Link } from "@remix-run/react";
import { SystemMonitorIcon } from "~/utilities/svgs";
import { HeaderServerMonitor } from "./serverMonitor";

export function DefaultHeader() {
    return (
        <div className="h-16 md:h-[72px] bg-naturalwhite px-screen-edge grid grid-cols-1 w-full place-content-center place-items-center">
            <div className="w-full grid grid-flow-col place-content-between place-items-center ">
                <Link to={"/"}>
                    <img
                        className="h-10  md:h-[60px]"
                        src="/public/medi-logo-1.webp"
                        alt="Logo"
                        // style={{ height: 60 }}
                    />
                </Link>
                <div className="grid grid-flow-col gap-4 place-content-center place-items-center w-full">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div>
                        <HeaderServerMonitor />
                    </div>
                </div>
            </div>
        </div>
    );
}
