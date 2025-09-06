import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getAllDoctors } from "~/backend/doctor.server";
import { getSession } from "~/backend/session.server";
import { Doctor } from "~/utilities/types";

export type LoaderData = {
    doctors: Doctor[];
}

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");
    const userType = session.get("userType");
    const email = session.get("email");
    const isLoggedIn = !!userId;

    if (isLoggedIn === false) {
        return redirect('/sign-in');
    }

    const getAllDoctorsResult = await getAllDoctors();
    if (getAllDoctorsResult.success === false) {
        console.log(getAllDoctorsResult.err);

    } else {
        console.log(getAllDoctorsResult.data);
    }

    const loaderData = {
        doctors: getAllDoctorsResult.success ? getAllDoctorsResult.data : [],
    } as LoaderData;

    return loaderData;
}
