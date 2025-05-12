import { EhrProvider } from "../../types/EhrProviders";

interface EhrProviderGridViewProps {
  providers: EhrProvider[];
  onEdit: (provider: EhrProvider) => void;
}

export const EhrProviderGridView = ({ providers, onEdit }: EhrProviderGridViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <div
          key={provider.code}
          className="group relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-100">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{provider.name}</h3>
              <p className="text-sm text-gray-500 truncate max-w-xs">{provider.baseUrl}</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => onEdit(provider)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};