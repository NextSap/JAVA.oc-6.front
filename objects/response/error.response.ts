import {z} from "zod";

export type Error = {
    field: string;
    cause: string;
}

export const ErrorSchema = z.object({
    field: z.string(),
    cause: z.string(),
});