/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionType } from "./enums/QuestionType.enum";
import { ResponseDataType } from "./enums/ResponseDataType";

export interface BaseQuestion {
    id?: string;
    internalCode: string;
    questionType: QuestionType;
    responseDataType: ResponseDataType;
    validationRules ?: Record<string, any>;
    metadata ?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}