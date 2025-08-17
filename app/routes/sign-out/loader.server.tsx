import { ActionFunction, LoaderFunction, redirect } from "react-router";
import { destroySession, getSession } from "~/backend/session.server";


export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/sign-in", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
};

//even if i call a post request same will done
export const action: ActionFunction = loader;
