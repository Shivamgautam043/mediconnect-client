import { LoaderFunction } from "@remix-run/node";
import { getPostgresDatabaseManager } from "~/submodule-database-manager/postgresDatabaseManager.server";

export const loader: LoaderFunction = async ({ }) => {

    const dbManager = await getPostgresDatabaseManager(null);
    if (!dbManager.success) {
        console.log("❌ DB connection failed");
        return Response.json({ success: false, error: "Database connection failed" });
    }

    const query = `SELECT * FROM public.doctors LIMIT 4`;
    const result = await dbManager.data.execute(query);
    if (result.success === false) {
        return result.err;
    }

    return result.data.rows;
};
