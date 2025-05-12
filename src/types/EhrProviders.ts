export interface EhrProvider {
    code: string;
    name: string;
    baseUrl: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authConfig?: Record<string, any>;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}