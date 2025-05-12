import { BaseQuestion } from "./BaseQuestion";

export interface Question {
    id: string;
    baseQuestionId: string;
    questionSetId: string;
    languageCode: string;
    questionText: string;
    createdAt: Date;
    updatedAt: Date;
    baseQuestion?: BaseQuestion;
}