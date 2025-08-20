import "react-router";
import {createRequestHandler} from "@react-router/express";
import express from "express";
import {customerCookieHandler} from "~/server/customerCookieHandler";
import {z as zod} from "zod";
// import {getAccessTokenFromCookieHeaderForExpressRequest, getbifrostUserFromAccessToken} from "~/submodules/bifrost--remix-helper/bifrostUser.server";

// import {bifrostUser} from "~/submodules/bifrost--remix-helper/typeDefinitions";

declare module "react-router" {
    interface AppLoadContext {
        mediConnectContextResult: {
            success: boolean;
            data: {
                customer: {
                    phoneNumber: string;
                } | null;
                bifrost: {
                    accessToken: string | null;
                    // bifrostUser: bifrostUser | null;
                    bifrostUser: string | null;
                };
            };
        } | {
            success: false;
            error: string;
        };
    }
}

// TODO: Figure out the typing thingy
export const app = express();

app.use(
    createRequestHandler({
        // @ts-expect-error - virtual module provided by React Router at build time
        build: () => import("virtual:react-router/server-build"),
        getLoadContext: async (request) => {
            let customer: {
                phoneNumber: string;
            } | null = null;
            try {
                const parsedCookie = await customerCookieHandler.parse(
                    request.headers.cookie ?? null,
                );
                const customerValidator = jsonValidator.pipe(
                    zod.object({
                        phoneNumber: zod.string(),
                    }),
                );
                const cookieCustomerResult = customerValidator.safeParse(parsedCookie);
                if (cookieCustomerResult.success === false) {
                    throw new Error(cookieCustomerResult.error.message);
                }
                const cookieCustomer = cookieCustomerResult.data;

                // TODO: fetch customer from DB
                customer = cookieCustomer;
            } catch (exception) {
                // console.log("Exception when parsing customer: ", exception);
            }

            let bifrost: {
                accessToken: string | null;
                bifrostUser: string | null;
            } = {
                accessToken: null,
                bifrostUser: null,
            };
            // try {
            //     // TODO: HORRIBLE CODE AHEAD!
            //     const accessTokenResult = await getAccessTokenFromCookieHeaderForExpressRequest(request);
            //     if (accessTokenResult.success === false) {
            //         throw accessTokenResult.error;
            //     }
            //     const accessToken = accessTokenResult.data;
            //     bifrost.accessToken = accessToken;

            //     if (accessToken !== null) {
            //         const bifrostUserResult = await getbifrostUserFromAccessToken(accessToken);
            //         if (bifrostUserResult.success === false) {
            //             throw bifrostUserResult.error;
            //         }
            //         if (bifrostUserResult.data !== null) {
            //             const {bifrostUser} = bifrostUserResult.data;
            //             bifrost.bifrostUser = bifrostUser;
            //         }
            //     }
            // } catch (exception) {
            //     console.log("Exception when parsing admin user: ", exception);
            // }

            return {
                mediConnectContextResult: {
                    success: true,
                    data: {
                        customer: customer,
                        bifrost: bifrost,
                    },
                }
            };
        },
    }),
);
