import {z} from "zod";

export const UserResponseSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    contacts: z.array(z.string()),
    balance: z.number(),
});

export const MinimizedUserResponseSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
});


export type UserResponseSchemaType = z.infer<typeof UserResponseSchema>;
export type MinimizedUserResponseSchemaType = z.infer<typeof MinimizedUserResponseSchema>;