import {z} from "zod";

export type LoginResponse = {
    token: string;
}

export const LoginResponseSchema = z.object({
    token: z.string(),
});