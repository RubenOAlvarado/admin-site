import { useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ClientWithRelations } from "../types/Clients";
import { fetchClients, fetchQuestionSets } from "../services/api/api";
import { PlusIcon } from "../components/ui/Icons/PlusIcon";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/ui/Modal";
import { QuestionSet } from "../types/QuestionSet";
import { ClientSelector } from "../components/common/ClientSelector";
import ViewToggle from "../components/common/ViewToggle";
import { QuestionSetGridView } from "../components/questions-set/QuestionSetGridView";
import { QuestionSetTableView } from "../components/questions-set/QuestionSetTableView";

export default function QuestionSetPage() {
  const [clients, setClients] = useState<ClientWithRelations[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientWithRelations | null>(null);
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingSet, setEditingSet] = useState<QuestionSet | null>(null);

  useEffect(() => {
    fetchClients().then((data) => setClients(data));
  }, []);

  useEffect(() => {
    if (selectedClient) {
      setLoading(true);
      fetchQuestionSets(selectedClient?.id)
        .then((data) => setQuestionSets(data))
        .finally(() => setLoading(false));
    }
  }, [selectedClient]);

  const handleSuccess = () => {
    setShowForm(false);
    setEditingSet(null);
    if (selectedClient) {
      fetchQuestionSets(selectedClient.id).then(({ data }) => setQuestionSets(data));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-light text-gray-800">Question Sets</h1>
          <p className="text-sm text-gray-500 mt-1">
            Select a client to manage their question sets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          <ClientSelector clients={clients} onSelect={setSelectedClient} selected={selectedClient} />
          {selectedClient && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              New Question Set
            </button>
          )}
        </div>
      </div>

      {showForm || editingSet ? (
        <Modal
          isOpen={showForm || editingSet !== null}
          onClose={() => {
            setShowForm(false);
            setEditingSet(null);
          }}
          title={editingSet ? 'Edit Question Set' : 'New Question Set'}
        >
          {selectedClient && (
            <QuestionSetForm
              existingSet={editingSet}
              clientId={selectedClient.id}
              onSuccess={handleSuccess}
              onCancel={() => {
                setShowForm(false);
                setEditingSet(null);
              }}
            />
          )}
        </Modal>
      ) : null}

      {loading ? (
        <LoadingSpinner />
      ) : questionSets.length > 0 ? (
        viewMode === 'grid' ? (
          <QuestionSetGridView
            questionSets={questionSets}
            onEdit={(set) => {
              setEditingSet(set);
              setShowForm(true);
            }}
          />
        ) : (
          <QuestionSetTableView
            questionSets={questionSets}
            onEdit={(set) => {
              setEditingSet(set);
              setShowForm(true);
            }}
          />
        )
      ) : selectedClient ? (
        <EmptyState
          onAddNew={() => setShowForm(true)}
          buttonLabel="Create your first Question Set"
          message="No Question Sets found for this client."
        />
      ) : (
        <p className="text-gray-500 text-sm">Select a client to begin.</p>
      )}
    </div>
  );
}