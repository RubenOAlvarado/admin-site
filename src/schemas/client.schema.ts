import { z } from "zod";

export const clientSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    externalId: z.string().optional(),
    defaultLanguage: z.string().min(1, 'Language is required'),
    ehrProviders: z.array(
        z.object({
            ehrProviderCode: z.string(),
            isDefault: z.boolean()
        })
    ).min(1, 'At least one provider is required')
});

export type ClientFormData = z.infer<typeof clientSchema>;