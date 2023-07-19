import {z} from "zod";

export type TransactionRequest = {
    sender: string;
    receiver: string;
    description: string;
    amount: number;
}

export const TransactionRequestSchema = z.object({
    sender: z.string().email(),
    receiver: z.string().email(),
    description: z.string(),
    amount: z.number().positive(),
});

export type TransactionRequestSchemaType = z.infer<typeof TransactionRequestSchema>;