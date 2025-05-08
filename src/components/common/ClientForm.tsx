import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClients } from '../../services/api/api';
import LanguageSelector from '../ui/LanguageSelector';

interface ClientFormProps {
  onSuccess?: () => void;
}

export default function ClientForm({ onSuccess }: ClientFormProps) {
  const [name, setName] = useState('');
  const [externalId, setExternalId] = useState('');
  const [defaultLanguage, setDefaultLanguage] = useState('en');
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await createClients({ name, externalId, defaultLanguage });
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/clients');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || 'An unknown error occurred');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Register Client</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
            placeholder="Client name"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">External ID</label>
          <input
            type="text"
            value={externalId}
            onChange={e => setExternalId(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="External system ID (optional)"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Default Language</label>
          <LanguageSelector 
            value={defaultLanguage}
            onChange={setDefaultLanguage}
            className="w-full"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-2">
          {onSuccess && (
            <button
              type="button"
              onClick={() => onSuccess()}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2.5 font-semibold text-white rounded-lg transition-colors ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Saving...' : 'Save Client'}
          </button>
        </div>
      </form>
    </div>
  );
}