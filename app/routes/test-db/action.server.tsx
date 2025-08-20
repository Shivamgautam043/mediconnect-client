
import { ActionFunction } from "react-router";
import { getPostgresDatabaseManager } from "~/submodule-database-manager/postgresDatabaseManager.server";

type ActionData =
    | { success: true; data: any }
    | { success: false; error: string };

export const action: ActionFunction = async ({ request }) => {
    console.log("🔐 SQL request received");

    const formData = await request.formData(); // ✅ Fix here
    const query = formData.get("query");

    if (!query || typeof query !== "string") {
        console.log("❌ Missing or invalid query");
        return ({ success: false, error: "Missing or invalid query" } as ActionData);
    }

    const dbManager = await getPostgresDatabaseManager(null);
    if (!dbManager.success) {
        console.log("❌ DB connection failed");
        return ({ success: false, error: dbManager.err.message } as ActionData);
    }

    const result = await dbManager.data.execute(query);

    if (!result.success) {
        console.log("❌ Query execution failed");
        return ({ success: false, error: result.err.message } as ActionData);
    }

    console.log("✅ Query successful");
    return ({ success: true, data: { result: result.data } } as ActionData);
};
