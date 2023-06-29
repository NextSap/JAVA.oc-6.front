import {z} from "zod";

export const TransactionResponseSchema = z.object({
    id: z.number(),
    sender: z.string(),
    receiver: z.string(),
    description: z.string(),
    amount: z.number(),
    fees: z.number(),
    timestamp: z.number(),
});

export const PaginationInfoResponseSchema = z.object({
    totalPages: z.number(),
});

export const TransactionArrayResponseSchema = z.array(TransactionResponseSchema);

export type TransactionResponseSchemaType = z.infer<typeof TransactionResponseSchema>;

export type TransactionArrayResponseSchemaType = z.infer<typeof TransactionArrayResponseSchema>;


export type PaginationInfoResponseSchemaType = z.infer<typeof PaginationInfoResponseSchema>;