import {z} from "zod";

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

export type LoginRequestSchemaType = z.infer<typeof LoginRequestSchema>;
export type SigninRequestSchemaType = z.infer<typeof SigninRequestSchema>;