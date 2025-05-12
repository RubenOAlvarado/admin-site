export interface Client {
    id: string;
    name: string;
    externalId?: string | null;
    defaultLanguage: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export interface ClientWithRelations extends Client {
    ehrProviders: {
        ehrProviderCode: string;
        isDefault: boolean;
    }[];
    _count?: {
        questionSets: number;
        patients: number;
    };
}