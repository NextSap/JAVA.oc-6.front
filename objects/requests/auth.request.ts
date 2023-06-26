import {z} from "zod";

export type LoginRequest = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export type SigninRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const LoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    rememberMe: z.boolean()
});

export const SigninRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
});