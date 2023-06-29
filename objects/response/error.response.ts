import {z} from "zod";

export const ErrorSchema = z.object({
    field: z.string(),
    cause: z.string(),
});

export type ErrorSchemaType = z.infer<typeof ErrorSchema>;