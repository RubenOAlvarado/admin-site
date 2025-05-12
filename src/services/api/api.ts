import axios from 'axios';
import supabase from '../supabase/supabaseClients';
import { EhrProvider } from '../../types/EhrProviders';
import { BaseQuestionFormData } from '../../schemas/base-question.schema';
import { QuestionSetFormData } from '../../schemas/question-set.schema';
import { ClientFormData } from '../../schemas/client.schema';

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

export const createClients = async (data: ClientFormData) => {
    try {
        const response = await api.post('/clients', data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateClients = async (data: ClientFormData, clientId?: string) => {
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
        return response.data;
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

export const createEhrProvider = async (data: EhrProvider) => {
    try {
        const response = await api.post('/ehr-providers', data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateEhrProvider = async (data: EhrProvider, ehrProviderCode?: string) => {
    try {
        const response = await api.put(`/ehr-providers/${ehrProviderCode}`, data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchBaseQuestions = async () => {
    try {
        const response = await api.get('/base-questions');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createBaseQuestion = async (data: BaseQuestionFormData) => {
    try {
        const response = await api.post('/base-questions', data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateBaseQuestion = async (data: BaseQuestionFormData, baseQuestionCode?: string) => {
    try {
        const response = await api.put(`/base-questions/${baseQuestionCode}`, data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchQuestionSets = async (clientId: string) => {
    try {
        const response = await api.get(`clients/${clientId}/question-sets`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createQuestionSet = async (clientId: string, data: QuestionSetFormData) => {
    try{
        const response = await api.post(`clients/${clientId}/question-sets`, data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateQuestionSet = async (clientId: string, data: QuestionSetFormData, questionSetCode?: string) => {
    try {
        const response = await api.put(`clients/${clientId}/question-sets/${questionSetCode}`, data);
        return response;
    }catch (error) {
        console.error(error);
        throw error;
    }
}