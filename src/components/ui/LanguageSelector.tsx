import { useState, useEffect } from 'react';
import { fetchLanguages } from '../../services/api/api';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

interface Language {
  code: string;
  name: string;
}

export default function LanguageSelector({ value, onChange, className = '' }: LanguageSelectorProps) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        setLoading(true);
        const data = await fetchLanguages();
        setLanguages(data);
        if (!value && data.length > 0) {
          onChange(data[0].code);
        }
      } catch (err) {
        console.error('Error loading languages:', err);
        setError('Failed to load languages');
        setLanguages([
          { code: 'en', name: 'English' },
          { code: 'es', name: 'Spanish' }
        ]);
        if (!value) {
          onChange('en');
        }
      } finally {
        setLoading(false);
      }
    };

    loadLanguages();
  }, [onChange, value]);

  if (error) {
    return (
      <div className="flex flex-col">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${className}`}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-red-500 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      className={`px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${className}`}
    >
      {loading ? (
        <option value="">Loading languages...</option>
      ) : (
        languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))
      )}
    </select>
  );
}