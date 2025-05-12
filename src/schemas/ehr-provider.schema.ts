import { z } from "zod";

export const ehrProviderSchema = z.object({
    code: z.string().min(1, "Code is required").regex(/^[a-zA-Z0-9_-]+$/, {
        message: "Only letters, numbers, underscores and hyphens allowed"
    }),
    name: z.string().min(3, "Name must be at least 3 characters"),
    baseUrl: z.string().url("Must be a valid URL"),
    authConfig: z.record(z.any()).optional()
});

export type EhrProviderFormData = z.infer<typeof ehrProviderSchema>;