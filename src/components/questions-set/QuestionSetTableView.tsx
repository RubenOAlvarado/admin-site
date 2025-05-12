import { QuestionSet } from "../../types/QuestionSet";
import { formatDate } from "../../utils/utils";

interface QuestionSetTableViewProps {
  questionSets: QuestionSet[];
  onEdit: (set: QuestionSet) => void;
}

export function QuestionSetTableView({ questionSets, onEdit }: QuestionSetTableViewProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-600 border-b">
                    <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Questions</th>
                        <th className="px-4 py-3">Created At</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {questionSets.map((qs) => (
                        <tr key={qs.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800">{qs.name}</td>
                        <td className="px-4 py-3 text-gray-600">
                            {qs.questions?.length ?? 0}
                        </td>
                        <td className="px-4 py-3 text-gray-500">{formatDate(qs.createdAt)}</td>
                        <td className="px-4 py-3">
                            <button
                            onClick={() => onEdit(qs)}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 hover:underline"
                            >
                            Edit
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        </div>
    );
}