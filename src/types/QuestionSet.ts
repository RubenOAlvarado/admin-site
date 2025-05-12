import { Client } from "./Clients";
import { Question } from "./Question";

export interface QuestionSet {
    id: string;
    name: string;
    description?: string;
    version: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    clientId: string;
    client?: Client;
    questions?: Question[];
}