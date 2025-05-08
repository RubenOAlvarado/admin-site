export interface Client {
    id?: string;
    name: string;
    externalId?: string;
    defaultLanguage?: string;
    metadata?: Record<string, unknown>;
}