import {z} from "zod";

export type UserRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    contacts: string[];
    balance: number;
}

export const UserRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    contacts: z.array(z.string()),
    balance: z.number().int().positive(),
});

export type UserRequestSchema = z.infer<typeof UserRequestSchema>;
