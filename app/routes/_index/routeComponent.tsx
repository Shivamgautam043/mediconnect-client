import { useLoaderData } from "@remix-run/react";
import { LoaderData } from "./loader.server";
import { DoctorCard1 } from "~/components/DoctorCard";

export function HomeSection1() {
    const { doctors } = useLoaderData<LoaderData>();
    return (
        <div className="w-full px-screen-edge">

            {/* <img
                src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747324599/desktop-banner-1_dibxkn.webp"
                alt=""
                className="w-full"
            /> */}
            <div className="w-full grid gird-cols-1 sm:grid-cols-3 gap-6">
                {doctors.map((doctor, i) => (
                    <DoctorCard1 doctor={doctor} key={i} />
                ))}
            </div>
        </div>
    );
}