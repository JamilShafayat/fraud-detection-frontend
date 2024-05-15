import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({message: "Email is required"}),
    password: z.string().min(3, {
        message: "Password is required"
    })
});


export const RegisterSchema = z.object({
    email: z.string().email({message: "Email is required"}),
    password: z.string().min(6, {
        message: "Minimum six charecters required"
    }),
    name: z.string().min(2, {
        message: "Name is required"
    })
});

export const FraudCheckSchema = z.object({
    cc_num: z.string().min(1, {
        message: "Card number is required"
    }),
    amt: z.string().min(1, {
        message: "Transaaction amount is required"
    }),
    unix_time: z.string().min(1, {
        message: "Transaaction time is required"
    }),
    merch_lat: z.string().min(1, {
        message: "Location latitude is required"
    }),
    merch_long: z.string().min(1, {
        message: "Location longitude is required"
    }),
});