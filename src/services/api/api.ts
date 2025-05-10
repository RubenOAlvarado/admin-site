import axios from 'axios';
import { Client } from '../../types/Clients';
import supabase from '../supabase/supabaseClients';
import { EhrClientProvider } from '../../types/ClientEhrProvider';
import { EhrProvider } from '../../types/EhrProviders';

const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_FOR_DOCKER;
const API_VERSION = import.meta.env.VITE_API_VERSION;

const api = axios.create({
    baseURL: `${BASE_URL}/${API_VERSION}`,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
    async (config) => {
        const session = await supabase.auth.getSession();
        const token = session?.data.session?.access_token;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const createClients = async (data: Client) => {
    try {
        const response = await api.post('/clients', data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateClients = async (data: Client, clientId?: string) => {
    try {
        const response = await api.put(`/clients/${clientId}`, data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchLanguages = async () => {
    try {
        const response = await api.get('/languages');
        return response.data;
    } catch (error) {
        console.error(`Error fetching languages: ${error}`);
        throw error;
    }
}

export const fetchClients = async () => {
    try {
        const response = await api.get('/clients');
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createEhrProviders = async (data: EhrProvider) => {
    try {
        const response = await api.post('/ehr-providers', data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchEhrProviders = async () => {
    try {
        const response = await api.get('/ehr-providers');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchClientEhrAssignedProviders = async (clientId: string) => {
    try {
        const response = await api.get(`/clients/${clientId}/ehr-providers`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const assingEhrProviderToClient = (clientId: string, providersList: EhrClientProvider[]) => {
    try {
        const response = api.post(`/clients/${clientId}/ehr-providers`, providersList);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}