/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EhrProvider {
    code: string;
    name: string;
    baseUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}