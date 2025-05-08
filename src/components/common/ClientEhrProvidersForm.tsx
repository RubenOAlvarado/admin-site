/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EhrProvider } from '../../types/EhrProviders';
import { assingEhrProviderToClient, fetchClientEhrAssignedProviders, fetchEhrProviders } from '../../services/api/api';
import { EhrClientProvider } from '../../types/ClientEhrProvider';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ClientEhrProvidersForm() {
  const { id: clientId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [providers, setProviders] = useState<EhrProvider[]>([]);
  const [selected, setSelected] = useState<EhrClientProvider[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const [{ data: all }, { data: assigned }] = await Promise.all([
          fetchEhrProviders(),
          fetchClientEhrAssignedProviders(clientId!),
        ]);
        setProviders(all);
        setSelected(assigned);
      } catch (err) {
        console.error(err);
        setError('Failed to load providers');
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [clientId]);

  const handleToggle = (providerCode: string) => {
    setSelected((prev) =>
      prev.some((s) => s.ehrProviderCode === providerCode)
        ? prev.filter((s) => s.ehrProviderCode !== providerCode)
        : [...prev, { ehrProviderCode: providerCode, isDefault: false }]
    );
  };

  // Marcar como predeterminado
  const handleSetDefault = (providerCode: string) => {
    setSelected((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.ehrProviderCode === providerCode,
      }))
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      setError('At least one provider must be selected.');
      return;
    }

    try {
      await assingEhrProviderToClient(clientId!, selected);
      navigate('/clients');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Assign EHR Providers</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {providers.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No providers found.</p>
          ) : (
            providers.map((provider) => {
              const isSelected = selected.some((s) => s.ehrProviderCode === provider.code);
              const isDefault = selected.some((s) => s.ehrProviderCode === provider.code && s.isDefault);

              return (
                <div
                  key={provider.code}
                  className={`p-4 rounded-lg border transition-all ${
                    isSelected ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <label className="inline-flex items-center mt-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggle(provider.code)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </label>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800">{provider.name}</p>
                    </div>

                    <label className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Default</span>
                      <input
                        type="radio"
                        name="defaultProvider"
                        checked={isDefault}
                        onChange={() => handleSetDefault(provider.code)}
                        disabled={!isSelected}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <div className="mt-8 flex justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Saving...' : 'Save Assignments'}
        </button>
      </div>
    </div>
  );
}