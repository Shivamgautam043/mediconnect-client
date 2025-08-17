// app/routes/_index.tsx
import { LoaderFunctionArgs, redirect } from "react-router";
import { getSession } from "~/backend/session.server";

export async function loader({ request, context }: LoaderFunctionArgs) {


    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");
    const userType = session.get("userType");
    const email = session.get("email");
    const isLoggedIn = !!userId;

    console.log(isLoggedIn, "islogedin");
    if (isLoggedIn === false) {
        return redirect('/sign-in');
    }

    console.log({ isLoggedIn, userId, userType, email })

     const { user } = context;

    console.log("user from context:", user);

     

    return ({ isLoggedIn, userId, userType, email });

   

    // return { user };
}
