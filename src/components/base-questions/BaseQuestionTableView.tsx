import { BaseQuestion } from "../../types/BaseQuestion";

interface BaseQuestionsTableViewProps {
  questions: BaseQuestion[];
  onEdit: (provider: BaseQuestion) => void;
}

export default function BaseQuestionsTableView ({
  questions,
  onEdit,
}: BaseQuestionsTableViewProps ) {
    return (
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Internal Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Question Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Response Data Type
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {questions.map((question) => (
                    <tr key={question.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{question.internalCode}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {question.questionType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {question.responseDataType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => onEdit(question)}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Edit
                    </button>
                    </div>
                </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}