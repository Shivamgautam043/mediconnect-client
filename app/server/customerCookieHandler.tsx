import {createCookie} from "react-router";

export const customerCookieHandler = createCookie("customer", {
    // domain: process.env.WEBSITE_BASE_URL,
    httpOnly: true,
    maxAge: 2592000, // One month
    // path: "/",
    // TODO: Change to strict
    sameSite: "lax",
    // TODO: Use unwrap
    secrets: [process.env.SESSION_SECRET!],
    secure: true,
});
