import { ClientWithRelations } from "../../types/Clients";
import { StarIcon } from "../ui/Icons/StarIcon";

export default function ClientGridView({
  clients,
  onEdit
}: {
  clients: ClientWithRelations[];
  onEdit: (client: ClientWithRelations) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-medium text-gray-800">
                {client.name}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {client.defaultLanguage.toUpperCase()}
              </span>
            </div>
            
            {client.externalId && (
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium">ID:</span> {client.externalId}
              </p>
            )}
            
            {client.ehrProviders.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">EHR PROVIDERS</p>
                <div className="flex flex-wrap gap-2">
                  {client.ehrProviders.map((provider) => (
                    <span
                      key={provider.ehrProviderCode}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        provider.isDefault
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {provider.ehrProviderCode}
                      {provider.isDefault && (
                        <StarIcon className="h-3 w-3 ml-1 text-blue-500" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <button
                onClick={() => onEdit(client)}
                className="text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}