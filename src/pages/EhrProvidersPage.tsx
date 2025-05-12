import { useEffect, useState } from "react";
import EmptyState from "../components/common/EmptyState";
import ViewToggle from "../components/common/ViewToggle";
import { PlusIcon } from "../components/ui/Icons/PlusIcon";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { EhrProvider } from "../types/EhrProviders";
import { fetchEhrProviders } from "../services/api/api";
import { EhrProviderGridView } from "../components/providers/EhrProviderGridView";
import { EhrProviderTableView } from "../components/providers/EhrProviderTableView";
import EhrProviderForm from "../components/providers/EhrProviderForm";
import Modal from "../components/ui/Modal";

const EhrProviderListPage = () => {
  const [providers, setProviders] = useState<EhrProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showForm, setShowForm] = useState(false);
  const [editingProvider, setEditingProvider] = useState<EhrProvider | null>(null);

  const loadProviders = async () => {
    try {
      setLoading(true);
      const data = await fetchEhrProviders();
      setProviders(data);
    } catch (error) {
      console.error("Error fetching providers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProviders();
  }, []);

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProvider(null);
    loadProviders();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-light text-gray-800">EHR Providers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all integrated Electronic Health Record providers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Provider
          </button>
        </div>
      </div>

      {showForm || editingProvider ? (
        <Modal
          isOpen={showForm || !!editingProvider}
          title={editingProvider ? "Edit Provider" : "New Provider"}
          onClose={() => {
            setShowForm(false);
            setEditingProvider(null);
          }}
        >
          <EhrProviderForm
            existingProvider={editingProvider}
            onSuccess={handleSuccess}
            onCancel={() => {
                setShowForm(false);
                setEditingProvider(null);
            }}
          />
        </Modal>
      ) : null}

      {loading ? (
        <LoadingSpinner />
      ) : providers.length > 0 ? (
        viewMode === "grid" ? (
          <EhrProviderGridView providers={providers} onEdit={setEditingProvider} />
        ) : (
          <EhrProviderTableView providers={providers} onEdit={setEditingProvider} />
        )
      ) : (
        <EmptyState 
            onAddNew={() => setShowForm(true)} 
            buttonLabel="Create your first EHR provider"
            message="No EHR providers found. Create one now."
        />
      )}
    </div>
  );
};

export default EhrProviderListPage;