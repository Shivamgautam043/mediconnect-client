import { LoaderFunction } from "@remix-run/node";
import { getPostgresDatabaseManager } from "~/submodule-database-manager/postgresDatabaseManager.server";

export const loader: LoaderFunction = async () => {

    const postgresManager = await getPostgresDatabaseManager(null);
    if (postgresManager.success === false) {
        return postgresManager.err.message;
    }

    const query = 'Select * from public.doctors;'

    const result = await postgresManager.data.execute(query);

    console.log(result.success);
    if (result.success === false) {
        console.log(result.err);
        console.log(result.err.message);
        return result.err;
    } else {
        console.log(result.data);
    }
    return result.data;
}