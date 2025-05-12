import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon } from "../ui/Icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../ui/Icons/ArrowRightIcon";
import { ExclamationIcon } from "../ui/Icons/ExclamationIcon";
import { SpinnerIcon } from "../ui/Icons/SpinnerIcon";
import { createClients, fetchEhrProviders, fetchLanguages, updateClients } from "../../services/api/api";
import type { ClientWithRelations } from "../../types/Clients";
import type { EhrProvider } from "../../types/EhrProviders";
import type { Language } from "../../types/Languages";
import React from "react";
import { motion } from 'framer-motion';
import { ClientFormData, clientSchema } from "../../schemas/client.schema";

export default function ClientFormWizard({
  existingClient,
  onSuccess,
  onCancel
}: {
  existingClient?: ClientWithRelations;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(1);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [providers, setProviders] = useState<EhrProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: existingClient ? {
      name: existingClient.name,
      externalId: existingClient.externalId || '',
      defaultLanguage: existingClient.defaultLanguage,
      ehrProviders: existingClient.ehrProviders?.map(p => ({
        ehrProviderCode: p.ehrProviderCode,
        isDefault: p.isDefault
      })) || []
    } : undefined
  });

  const selectedProviders = watch('ehrProviders') || [];
  const loadData = async () => {
    try {
      setLoading(true);
      const [langs, provs] = await Promise.all([
        fetchLanguages(),
        fetchEhrProviders()
      ]);
      setLanguages(langs);
      setProviders(provs);
      
      if (!existingClient && langs.length > 0) {
        setValue('defaultLanguage', langs[0].code);
      }
    } catch (err) {
      setError('Failed to load required data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data: ClientFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (existingClient) {
       await updateClients(data, existingClient?.id);
      } else {
        await createClients(data);
      }
      
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleProvider = (code: string) => {
    const current = selectedProviders;
    const exists = current.some(p => p.ehrProviderCode === code);
    
    if (exists) {
      setValue('ehrProviders', current.filter(p => p.ehrProviderCode !== code));
    } else {
      setValue('ehrProviders', [...current, { ehrProviderCode: code, isDefault: current.length === 0 }]);
    }
  };

  const setDefaultProvider = (code: string) => {
    setValue('ehrProviders', 
      selectedProviders.map(p => ({
        ...p,
        isDefault: p.ehrProviderCode === code
      }))
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start">
            <ExclamationIcon className="h-5 w-5 mr-3 mt-0.5" />
            <div>{error}</div>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex items-center">
            {[1, 2].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <button
                  type="button"
                  onClick={() => setStep(stepNumber)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step === stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {stepNumber}
                </button>
                {stepNumber < 2 && (
                  <div className={`w-12 h-0.5 mx-1 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span className={step >= 1 ? 'text-blue-600' : ''}>Basic Information</span>
            <span className={step >= 2 ? 'text-blue-600' : ''}>EHR Providers</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                  disabled={!!existingClient?.name}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  External ID
                </label>
                <input
                  {...register('externalId')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Language *
                </label>
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="animate-pulse h-10 bg-gray-200 rounded"
                  ></motion.div>
                ): error ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                ): (
                  <motion.select
                    id="language-select"
                    value={existingClient?.defaultLanguage || ''}
                    {...register('defaultLanguage')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select language</option>
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </motion.select>
                )}
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  disabled={loading}
                >
                  Next
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Select EHR Providers for this client *
                </h3>
                
                {providers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No active EHR providers available
                  </div>
                ) : (
                  <div className="space-y-3">
                    {providers.map((provider) => {
                      const isSelected = selectedProviders.some(p => p.ehrProviderCode === provider.code);
                      const isDefault = selectedProviders.some(p => p.ehrProviderCode === provider.code && p.isDefault);
                      
                      return (
                        <div
                          key={provider.code}
                          className={`p-4 border rounded-md ${isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleProvider(provider.code)}
                              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            
                            <label className="ml-3 flex-1">
                              <span className="block text-sm font-medium text-gray-700">
                                {provider.name}
                              </span>
                              <span className="block text-xs text-gray-500 mt-1">
                                {provider.baseUrl}
                              </span>
                            </label>
                            
                            {isSelected && (
                              <div className="flex items-center ml-4">
                                <input
                                  type="radio"
                                  name="defaultProvider"
                                  checked={isDefault}
                                  onChange={() => setDefaultProvider(provider.code)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Default</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {errors.ehrProviders && (
                  <p className="mt-2 text-sm text-red-600">{errors.ehrProviders.message}</p>
                )}
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back
                </button>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <SpinnerIcon className="h-4 w-4 mr-2 animate-spin" />
                        {existingClient ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        {existingClient ? 'Update Client' : 'Create Client'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}