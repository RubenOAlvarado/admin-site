import { BaseQuestion } from "../../types/BaseQuestion";
import BaseQuestionCard from "./BaseQuestionCard";

export default function BaseQuestionsGridView({
  baseQuestions,
  onEdit
}: {
  baseQuestions: BaseQuestion[];
  onEdit: (client: BaseQuestion) => void;
}) {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {baseQuestions.map((baseQuestion) => (
              <BaseQuestionCard key={baseQuestion.id} question={baseQuestion} onEdit={onEdit} />
            ))}
        </div>
    );
}