import { z } from "zod";

export const questionSetSchema = z.object({
    clientId: z.string().nonempty("Client is required"),
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().optional(),
    questions: z.array(z.string()).optional(),
});

export type QuestionSetFormData = z.infer<typeof questionSetSchema>;