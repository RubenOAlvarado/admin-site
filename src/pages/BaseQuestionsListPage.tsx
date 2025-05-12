import { useEffect, useState } from "react";
import BaseQuestionForm from "../components/base-questions/BaseQuestionForm";
import EmptyState from "../components/common/EmptyState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { fetchBaseQuestions } from "../services/api/api";
import { BaseQuestion } from "../types/BaseQuestion";
import ViewToggle from "../components/common/ViewToggle";
import { PlusIcon } from "../components/ui/Icons/PlusIcon";
import BaseQuestionsGridView from "../components/base-questions/BaseQuestionsGridView";
import BaseQuestionsTableView from "../components/base-questions/BaseQuestionTableView";
import Modal from "../components/ui/Modal";

const BaseQuestionsListPage = () => {
  const [questions, setQuestions] = useState<BaseQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<BaseQuestion | null>(null);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await fetchBaseQuestions();
      setQuestions(data);
    } catch (err) {
      console.error("Error fetching base questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleSuccess = () => {
    setShowForm(false);
    setEditingQuestion(null);
    loadQuestions();
  };

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Base Questions</h1>
                <p className="text-gray-600">Manage reusable questions used in questionnaires.</p>
            </div>

            <div className="flex items-center gap-3">
                <ViewToggle viewMode={viewMode} onChange={setViewMode} />
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New Base Question
                </button>
            </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : questions.length > 0 ? (
          viewMode === "grid" ? (
            <BaseQuestionsGridView baseQuestions={questions} onEdit={setEditingQuestion} />
          ) : (
            <BaseQuestionsTableView questions={questions} onEdit={setEditingQuestion} />
          )
        ) : (
          <EmptyState 
            onAddNew={() => setShowForm(true)}
            buttonLabel="Create your first base question"
            message="No base questions found. Create one now."
          />
        )}

        {showForm || editingQuestion ? (
          <Modal
            isOpen={showForm || !!editingQuestion}
            onClose={() => {
              setShowForm(false);
              setEditingQuestion(null);
            }}
            title={editingQuestion ? "Edit Question" : "New Base Question"}
          >
            <BaseQuestionForm
              existingQuestion={editingQuestion}
              onSuccess={handleSuccess}
              onCancel={() => {
                setShowForm(false);
                setEditingQuestion(null);
              }}
            />
          </Modal>
        ) : null}
    </div>
  );
};

export default BaseQuestionsListPage;