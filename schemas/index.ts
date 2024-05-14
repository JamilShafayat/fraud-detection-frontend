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
    title: z.string().min(1, {
        message: "Title is required"
    }),
    cardNumber: z.string().min(1, {
        message: "Card number is required"
    }),
    destination: z.string().min(1, {
        message: "Location name is required"
    }),
});