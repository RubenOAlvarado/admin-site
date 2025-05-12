import { QuestionSet } from "../../types/QuestionSet";
import { formatDate } from "../../utils/utils";

interface QuestionSetTableViewProps {
  questionSets: QuestionSet[];
  onEdit: (set: QuestionSet) => void;
}
export function QuestionSetGridView({ questionSets, onEdit }: QuestionSetTableViewProps) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {questionSets.map((qs) => (
          <div
            key={qs.id}
            className="border rounded-xl p-4 shadow-sm bg-white flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{qs.name}</h3>
              <p className="text-sm text-gray-500">
                {qs.questions?.length ?? 0} questions
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Created: {formatDate(qs.createdAt)}
              </p>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <button
                  onClick={() => onEdit(qs)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Edit
                </button>
              </div>
          </div>
        ))}
      </div>
    );
}