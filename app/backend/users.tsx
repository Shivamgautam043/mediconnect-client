import { getPostgresDatabaseManager } from "~/submodule-database-manager/postgresDatabaseManager.server";
import { okResult, Result } from "~/submodule-database-manager/utilities/errorHandling";
import bcrypt from "bcryptjs";


export async function getAllDoctors(): Promise<Result<any>> {
    const postgresManager = await getPostgresDatabaseManager(null);
    if (postgresManager.success === false) {
        return postgresManager;
    }

    const query = 'Select * from public.doctors;'

    const result = await postgresManager.data.execute(query);
    if (result.success === false) {
        return result;
    }

    return okResult(result.data);

}



export async function checkUserByEmailAndPassword(
    email: string,
    password: string
): Promise<Result<{ id: string; email: string }>> {
    const dbManager = await getPostgresDatabaseManager(null);
    if (dbManager.success === false) return dbManager;

    const query = `SELECT id, email, password FROM public.users WHERE email = $1 LIMIT 1;`;
    const result = await dbManager.data.execute(query, [email]);

    if (result.success === false) return result;


    if (result.data) {
        return errorResult("User not found");
    }

    const user = result.data.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return errorResult("Invalid password");
    }

    return okResult({ id: user.id, email: user.email });
}
