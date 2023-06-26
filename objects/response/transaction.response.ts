import {z} from "zod";

export type TransactionResponse = {
    id: number;
    sender: string;
    receiver: string;
    description: string;
    amount: number;
    fees: number;
    timestamp: number;
    transactionType: TransactionType;
}

export enum TransactionType {
    DEPOSIT = "DEPOSIT",
    WITHDRAWAL = "WITHDRAWAL",
    TRANSFER = "TRANSFER",
}

export const TransactionResponseSchema = z.object({
    id: z.number(),
    sender: z.string(),
    receiver: z.string(),
    description: z.string(),
    amount: z.number(),
    fees: z.number(),
    timestamp: z.number(),
    transactionType: z.nativeEnum(TransactionType),
});

export const TransactionArrayResponseSchema = z.array(TransactionResponseSchema);