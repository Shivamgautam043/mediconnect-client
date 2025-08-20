// import {LoaderFunction, redirect} from "react-router";

// import {defaultAccessToken} from "~/utilities/fields/fields";
// import {getProductWithJoins} from "~/utilities/helpers/getters/products";
// import {getRequiredEnvironmentVariable} from "~/utilities/utilities";

// export type HeaderSearchProduct = {
//     name: string;
//     slug: string;
//     productSlug: string;
// };
// export type LoaderData = {

//     environment: string;

// };

// export const loader: LoaderFunction = async ({request, context}) => {
//     const pathName = new URL(request.url).pathname;
//     const isAdminRoute = pathName.startsWith("/admin");


//     const environment = (process.env.ENVIRONMENT);

//     if (environment.success === false) {
//         return environment;
//     }
//     const navItems = navItemsResult.data;

//     const customerResult = context.mediConnectContextResult;
//     if (context.success === false) {
//         return customerResult;
//     }

//     const customer = customerResult.data?.customer?.phoneNumber;

//     let customerDetailsResult = null;
//     if (customer) {
//         customerDetailsResult = await getCustomer(
//             ottopilotBaseUrl,
//             defaultAccessToken,
//             projectId as Uuid,
//             customer,
//         );
//         if (customerDetailsResult.success === false) {
//             if (customerDetailsResult.data === undefined) {
//                 customerDetailsResult.data = null;
//             } else {
//                 return customerDetailsResult;
//             }
//         }
//     }

//     const [{products: productWithJoins, variants: variantsAdmin}] =
//         await Promise.all([
//             getProductWithJoins(
//                 accessToken,
//                 ottopilotBaseUrl,
//                 projectId as Uuid,
//                 undefined,
//                 true,
//             ),
//         ]);

//     const finalVariantsAdmin = await Promise.all(
//         variantsAdmin.map(processImages),
//     );

//     const allVariants: Variant[] = [];
//     for (const product of productWithJoins) {
//         const variants = finalVariantsAdmin.filter(
//             (variant) => variant.productId === product.id,
//         );

//         const transformedVariants = transformVariants(variants, product);

//         allVariants.push(...transformedVariants);
//     }

//     const headerSearchProductResults = allVariants.map((variant) => ({
//         name: variant.displayName,
//         slug: variant.slug,
//         productSlug: variant.productSlug,
//     }));

//     if (customerResult.data.customer === null) {
//         return {
//             osirisUser:
//                 context.mediConnectContextResult.data.osiris.osirisUser ?? null,
//             user: null,
//             address: null,
//             orders: null,
//             navItems,
//             aergiaClientConfiguration,
//             environment: environment.data,
//             headerSearchProducts: headerSearchProductResults,
//             variants: allVariants,
//         };
//     }

//     const loaderData: LoaderData = {
//         navItems,
//         aergiaClientConfiguration,
//         environment: environment.data,
//         headerSearchProducts: headerSearchProductResults,
//         user: customerDetailsResult.data,
//         variants: allVariants
//     };

//     if (isAdminRoute === true) {
//         loaderData.osirisUser =
//             context.mediConnectContextResult.data.osiris.osirisUser;
//     }

//     return loaderData;
// };


import { LoaderFunction, redirect } from "react-router";

import { defaultAccessToken } from "~/utilities/fields/fields";
import { getProductWithJoins } from "~/utilities/helpers/getters/products";
import { getRequiredEnvironmentVariable } from "~/utilities/utilities";

export type HeaderSearchProduct = {
    name: string;
    slug: string;
    productSlug: string;
};
export type LoaderData = {

    environment: string;

};

export const loader: LoaderFunction = async ({ request, context }) => {
    const pathName = new URL(request.url).pathname;
    const isAdminRoute = pathName.startsWith("/admin");
    const environment = (process.env.ENVIRONMENT);
    const loaderData: LoaderData = {

        environment: environment ?? "",


    };
    return loaderData;
};
