import type {MetaFunction} from "react-router";
import type {LoaderData} from "./loader.server";
import {createMetaTags} from "~/utilities/utilities";

export const meta: MetaFunction = ({data}) => {
    const loaderData = data as LoaderData | null | undefined;

    if (loaderData === null || loaderData === undefined) {
        return [];
    }

    return createMetaTags(
        loaderData.canonicalUrl,
        "About Us ",
        "",
        null,
        null,
    );
};
