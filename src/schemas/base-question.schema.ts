import { z } from "zod";
import { QuestionType } from "../types/enums/QuestionType.enum";
import { ResponseDataType } from "../types/enums/ResponseDataType";

export const baseQuestionSchema = z.object({
    internalCode: z.string().nonempty("Internal code is required"),
    questionType: z.nativeEnum(QuestionType, {
        required_error: "Question type is required",
    }),
    responseDataType: z.nativeEnum(ResponseDataType, {
        required_error: "Response data type is required",
    }),
    validationRules: z.record(z.any()).optional(),
    metadata: z.record(z.any()).optional(),
});

export type BaseQuestionFormData = z.infer<typeof baseQuestionSchema>;