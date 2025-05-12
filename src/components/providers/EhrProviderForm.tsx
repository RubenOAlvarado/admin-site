import { EhrProviderFormData, ehrProviderSchema } from "../../schemas/ehr-provider.schema";
import { SpinnerIcon } from "../ui/Icons/SpinnerIcon";
import { Controller, useForm } from "react-hook-form";
import { ExclamationIcon } from "../ui/Icons/ExclamationIcon";
import { createEhrProvider, updateEhrProvider } from "../../services/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyValueEditor } from "../common/KeyValueEditor";

interface EhrProviderFormProps {
  existingProvider?: Partial<EhrProviderFormData> | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const EhrProviderForm: React.FC<EhrProviderFormProps> = ({
  existingProvider,
  onSuccess,
  onCancel,
}) => {
  const isEditMode = !!existingProvider;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EhrProviderFormData>({
    resolver: zodResolver(ehrProviderSchema),
    defaultValues: existingProvider || {
      code: "",
      name: "",
      baseUrl: "",
      authConfig: {}
    }
  });

  const onSubmit = async (data: EhrProviderFormData) => {
    try {
      if (isEditMode && existingProvider?.code) {
        await updateEhrProvider(data, existingProvider.code);
      } else {
        await createEhrProvider(data);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

      {Object.keys(errors).length > 0 && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-start">
          <ExclamationIcon className="h-5 w-5 mr-3 mt-0.5 text-red-600" />
          <p>There are some errors in the form</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
          <input
            type="text"
            {...register("code")}
            disabled={isEditMode}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.code
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            {...register("name")}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.name
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Base URL *</label>
          <input
            type="text"
            {...register("baseUrl")}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.baseUrl
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
          />
          {errors.baseUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.baseUrl.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Auth Config (JSON)</label>
          <Controller
            name="authConfig"
            control={control}
            render={({ field }) => (
              <KeyValueEditor
                value={field.value}
                onChange={(v) => field.onChange(v)}
              />
            )}
          />
          {errors.authConfig && (
            <p className="mt-1 text-sm text-red-600">{errors.authConfig?.message?.toString()}</p>
          )}
        </div>

        <div className="flex justify-end pt-4 space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting && <SpinnerIcon className="h-4 w-4 animate-spin mr-2" />}
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Provider"
              : "Create Provider"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EhrProviderForm;