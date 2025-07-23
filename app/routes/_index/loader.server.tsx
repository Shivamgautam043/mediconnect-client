// app/routes/_index.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/backend/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");
    const userType = session.get("userType");
    const email = session.get("email");

    console.log({ isLoggedIn: !!userId, userId, userType, email })

    return ({ isLoggedIn: !!userId, userId, userType, email });
}
