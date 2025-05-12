import { useEffect, useState } from 'react';
import { fetchClients } from '../services/api/api';
import { PlusIcon } from '../components/ui/Icons/PlusIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ClientWithRelations } from '../types/Clients';
import ViewToggle from '../components/common/ViewToggle';
import ClientFormWizard from '../components/clients/ClientFormWizard';
import EmptyState from '../components/common/EmptyState';
import ClientGridView from '../components/clients/ClientGridView';
import ClientTableView from '../components/clients/ClientTableView';
import Modal from '../components/ui/Modal';

export default function ClientListPage() {
  const [clients, setClients] = useState<ClientWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientWithRelations | undefined>(undefined);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await fetchClients();
      setClients(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSuccess = () => {
    setShowForm(false);
    setEditingClient(undefined);
    loadClients();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-light text-gray-800">Client Organizations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all registered client organizations
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Client
          </button>
        </div>
      </div>

      {showForm || editingClient ? (
        <Modal
          isOpen={showForm || editingClient !== undefined}
          onClose={() => {
            setShowForm(false);
            setEditingClient(undefined);
          }}
          title={editingClient? "Edit Client" : "New Client"}
        >
          <ClientFormWizard
            existingClient={editingClient}
            onSuccess={handleSuccess}
            onCancel={() => {
              setShowForm(false);
              setEditingClient(undefined);
            }}
          />
        </Modal>
      ) : null}

      {loading ? (
        <LoadingSpinner />
      ) : clients.length > 0 ? (
        viewMode === 'grid' ? (
          <ClientGridView 
            clients={clients} 
            onEdit={setEditingClient}
          />
        ) : (
          <ClientTableView 
            clients={clients}
            onEdit={setEditingClient}
          />
        )
      ) : (
        <EmptyState 
          onAddNew={() => setShowForm(true)} 
          buttonLabel="Create your first client"
          message="No Clents found. Create one now."
        />
      )}
    </div>
  );
}