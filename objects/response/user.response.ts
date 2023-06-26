import {z} from "zod";

export type UserResponse = {
    email: string;
    firstName: string;
    lastName: string;
    contacts: string[];
    balance: number;
}

export const UserResponseSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    contacts: z.array(z.string()),
    balance: z.number(),
});