import { redirect } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
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
