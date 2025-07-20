import { ActionFunction } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { getPostgresDatabaseManager } from "~/submodule-database-manager/postgresDatabaseManager.server";
import {
    getStringFromUnknown
} from "~/submodule-database-manager/utilities/typeValidationUtilities";

export type ActionData =
    | { success: false; error: string }
    | { success: true; userId: string; userType: string };

export const action: ActionFunction = async ({ request }) => {
    const body = await request.formData();

    const emailResult = getStringFromUnknown(body.get("email"));
    const passwordResult = getStringFromUnknown(body.get("password"));
    const loginTypeResult = getStringFromUnknown(body.get("loginType"));

    if (!emailResult.success || !passwordResult.success || !loginTypeResult.success) {
        console.log("❌ Field validation failed", { emailResult, passwordResult, loginTypeResult });
        return Response.json({
            success: false,
            error: "All fields are required",
        });
    }

    const email = emailResult.data;
    const password = passwordResult.data;
    const loginType = loginTypeResult.data;

    console.log("📥 Received login attempt", { email, loginType });

    const dbManager = await getPostgresDatabaseManager(null);
    if (!dbManager.success) {
        console.log("❌ DB connection failed", dbManager.err.message);
        return Response.json({
            success: false,
            error: "Database connection failed",
        });
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
            console.log("❌ Invalid loginType provided:", loginType);
            return Response.json({
                success: false,
                error: "Invalid login type",
            });
    }

    console.log(`🔍 Looking for user in table: ${tableName}`);

    const query = `SELECT * FROM public.${tableName} WHERE email = $1 LIMIT 1`;
    const result = await dbManager.data.execute(query, [email]);

    if (!result.success) {
        console.log("❌ DB query failed:", result.err.message);
        return Response.json({
            success: false,
            error: "DB query failed",
        });
    }

    if (result.data.rowCount === 0) {
        console.log("❌ No user found with this email in table:", tableName);
        return Response.json({
            success: false,
            error: "User not found",
        });
    }

    const user = result.data.rows[0];
    console.log("✅ User fetched from DB:", user);

    if (!user.password) {
        console.log("❌ Password field missing in fetched user:", user);
        return Response.json({
            success: false,
            error: "Password not set for this user",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password:", hashedPassword);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        console.log("❌ Invalid password for email:", email);
        return Response.json({
            success: false,
            error: "Invalid password",
        });
    }

    console.log("✅ Login successful");

    return Response.json({
        success: true,
        userId: user.id,
        userType: loginType,
    });
};
