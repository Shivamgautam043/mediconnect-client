import bcrypt from "bcryptjs";
import { ActionFunction } from "react-router";
import { commitSession, getSession } from "~/backend/session.server";
import { getPostgresDatabaseManager } from "~/submodule-database-manager/postgresDatabaseManager.server";
import { getStringFromUnknown } from "~/submodule-database-manager/utilities/typeValidationUtilities";

export type LoginActionResponse =
    | {
        success: true;
        data: string;
    }
    | {
        success: false;
        error: string;
    };

export const action: ActionFunction = async ({ request }) => {
    console.log("🔐 Login request received");

    const body = await request.formData();

    const emailResult = getStringFromUnknown(body.get("email"));
    const passwordResult = getStringFromUnknown(body.get("password"));
    const loginTypeResult = getStringFromUnknown(body.get("loginType"));

    if (!emailResult.success || !passwordResult.success || !loginTypeResult.success) {
        console.log("⚠️ Missing fields");
        return ({ success: false, error: "All fields are required" }) as LoginActionResponse;
    }

    const email = emailResult.data;
    const password = passwordResult.data;
    const loginType = loginTypeResult.data;

    const dbManager = await getPostgresDatabaseManager(null);
    if (!dbManager.success) {
        console.log("❌ DB connection failed");
        return ({ success: false, error: "Database connection failed" }) as LoginActionResponse;
    }

    let tableName: string;
    switch (loginType) {
        case "doctor":
            tableName = "doctors";
            break;
        case "physician_assistant":
            tableName = "physician_assistants";
            break;
        case "patient":
            tableName = "patients";
            break;
        default:
            console.log("❌ Invalid login type");
            return ({ success: false, error: "Invalid login type" }) as LoginActionResponse;
    }

    const query = `SELECT * FROM public.${tableName} WHERE email = $1 LIMIT 1`;
    const result = await dbManager.data.execute(query, [email]);

    if (!result.success || result.data.rowCount === 0) {
        console.log(`❌ No user found for email: ${email}`);
        return (
            { success: false, error: "User not found" }

        ) as LoginActionResponse;
    }

    const user = result.data.rows[0];

    if (!user.password) {
        console.log("❌ Password not set for this user");
        return ({ success: false, error: "Password not set for this user" }) as LoginActionResponse;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        console.log(`❌ Invalid password for email: ${email}`);
        return ({ success: false, error: "Invalid password" }) as LoginActionResponse;
    }

    const session = await getSession();
    session.set("userId", user.id);
    session.set("userType", loginType);
    session.set("email", email);

    console.log(`✅ Login successful for ${email} (${loginType})`);

    return Response.json(
        { success: true, redirectTo: "/" },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        }
    );
};
