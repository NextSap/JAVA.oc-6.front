import {z} from "zod";

export type TransactionRequest = {
    sender: string;
    receiver: string;
    description: string;
    amount: number;
}

export const TransactionRequestSchema = z.object({
    sender: z.string(),
    receiver: z.string(),
    description: z.string(),
    amount: z.number(),
});