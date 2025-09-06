import { getPostgresDatabaseManager } from "~/submodule-database-manager/postgresDatabaseManager.server";
import { errResult, okResult, Result } from "~/submodule-database-manager/utilities/errorHandling";
import { Doctor } from "~/utilities/types";
import { z } from "zod";

export async function getAllDoctors(): Promise<Result<Doctor[]>> {
    const postgresManagerResult = await getPostgresDatabaseManager(null);
    if (postgresManagerResult.success === false) {
        return postgresManagerResult
    }

    const query = `SELECT * from public.doctors`;

    const queryResult = await postgresManagerResult.data.execute(query);

    if (queryResult.success === false) {
        return queryResult;
    }

    const parsed = DoctorsSchema.safeParse(queryResult.data.rows);

    if (!parsed.success) {
        console.error("Doctor data validation failed:", parsed.error.format());
        return errResult(new Error("Invalid doctor data from database"));
    }

    return okResult(parsed.data);

}


export const DoctorSchema = z.object({
    id: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    full_name: z.string(),
    phone: z.string(),
    email: z.string(),
    dob: z.date(),
    gender: z.enum(["male", "female", "other"]),
    specialization: z.string(),
    qualification: z.string(),
    experience_years: z.number(),
    license_number: z.string(),
    clinic_name: z.string(),
    address: z.string(),
    availability: z.string(),
    bio: z.string(),
    photo_url: z.string().url(),
    password: z.string(),
});

export const DoctorsSchema = z.array(DoctorSchema);