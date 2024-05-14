"use server";

import { FraudCheckSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";

export const fraudDetection = async (values: z.infer<typeof FraudCheckSchema>) => {
    const validatedFields = FraudCheckSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!"
        }
    }

    return {success: "Fraud checking successfuly done"}
}