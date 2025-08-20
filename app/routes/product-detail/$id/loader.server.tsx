import {LoaderFunction} from "react-router";

export type LoaderData = {
    date: string;
    canonicalUrl: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url);
    const cleanUrl = "hello" + url.pathname;
    return {
        date: new Date().toISOString(),
        canonicalUrl: cleanUrl,
    };
};
