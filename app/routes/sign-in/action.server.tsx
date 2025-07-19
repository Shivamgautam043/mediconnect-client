import { ActionFunction } from "@remix-run/node";
import { getRequiredEnvironmentVariable, getStringFromUnknown } from "~/submodule-database-manager/utilities/typeValidationUtilities";

export type ActionData = | {
    success: false;
    error: string;
} | {
    success: true;
};

export const action: ActionFunction = async ({ request }) => {
    const body = await request.formData();
    const emailResult = getStringFromUnknown(body.get("email"));
    const passwordResult = getStringFromUnknown(body.get("password"));
    const websiteBaseUrl = getRequiredEnvironmentVariable("WEBSITE_BASE_URL");

    if (emailResult.success === false || passwordResult.success === false) {
        return Response.json({
            success: false,
            error: "Fields cannot be null! Error code: f754a492-6744-4e0c-b382-2975fae0b04d"
        })
    }
}