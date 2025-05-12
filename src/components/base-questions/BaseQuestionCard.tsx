import { BaseQuestion } from "../../types/BaseQuestion";

interface BaseQuestionCardProps {
  question: BaseQuestion;
  onEdit: (question: BaseQuestion) => void;
}

const BaseQuestionCard: React.FC<BaseQuestionCardProps> = ({ question, onEdit }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-6">
        <h3 className="text-lg font-semibold text-gray-800">{question.internalCode}</h3>
        <p className="text-sm text-gray-500">
          Type: {question.questionType}, Data: {question.responseDataType}
        </p>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => onEdit(question)}
            className="text-sm text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseQuestionCard;