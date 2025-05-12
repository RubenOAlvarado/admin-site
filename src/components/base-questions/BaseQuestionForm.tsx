import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BaseQuestionFormData, baseQuestionSchema } from "../../schemas/base-question.schema";
import { BaseQuestion } from "../../types/BaseQuestion";
import { SpinnerIcon } from "../ui/Icons/SpinnerIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionType } from "../../types/enums/QuestionType.enum";
import { ResponseDataType } from "../../types/enums/ResponseDataType";
import { useState } from "react";
import { createBaseQuestion, updateBaseQuestion } from "../../services/api/api";
import { KeyValueEditor } from "../common/KeyValueEditor";

interface BaseQuestionFormProps {
  existingQuestion?: BaseQuestion | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const BaseQuestionForm: React.FC<BaseQuestionFormProps> = ({ existingQuestion, onSuccess, onCancel }) => {
  const isEditMode = !!existingQuestion;
  const questionTypes = Object.values(QuestionType);
  const responseDataTypes = Object.values(ResponseDataType);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BaseQuestionFormData>({
    resolver: zodResolver(baseQuestionSchema),
    defaultValues: existingQuestion || {
      internalCode: "",
      questionType: undefined,
      responseDataType: undefined,
      validationRules: {},
      metadata: {}
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<BaseQuestionFormData> = async (data) => {
    try {
      setLoading(true);
      setError(null);
      if (isEditMode && existingQuestion?.id) {
        await updateBaseQuestion(data, existingQuestion.id);
      } else {
        await createBaseQuestion(data);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      setError(`Error ${isEditMode ? "updating" : "creating"} base question`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-start">
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internal Code *</label>
            <input
              {...register("internalCode")}
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.internalCode ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.internalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.internalCode.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question Type *</label>
            <select
              {...register("questionType")}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.questionType ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
            >
              <option value="">Select a question type</option>
              {questionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.questionType && (
              <p className="mt-1 text-sm text-red-600">{errors.questionType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Response Data Type *</label>
            <select
              {...register("responseDataType")}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.responseDataType ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
            >
              <option value="">Select a data type</option>
              {responseDataTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.responseDataType && (
              <p className="mt-1 text-sm text-red-600">{errors.responseDataType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Validation Rules</label>
            <Controller
              name="validationRules"
              control={control}
              render={({ field }) => (
                <KeyValueEditor
                  value={field.value}
                  onChange={(v) => field.onChange(v)}
                />
              )}
            />
            {errors.validationRules && (
              <p className="mt-1 text-sm text-red-600">{errors?.validationRules?.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metadata</label>
            <Controller
              name="metadata"
              control={control}
              render={({ field }) => (
                <KeyValueEditor
                  value={field.value}
                  onChange={(v) => field.onChange(v)}
                />
              )}
            />
            {errors.metadata && (
              <p className="mt-1 text-sm text-red-600">{errors?.metadata?.message?.toString()}</p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 mr-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <SpinnerIcon className="h-4 w-4 animate-spin mr-2" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditMode ? "Update Question" : "Create Question"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BaseQuestionForm;