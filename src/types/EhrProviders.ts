/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EhrProvider {
    code: string;
    name: string;
    url: string;
    authConfig?: Record<string, any>;
}