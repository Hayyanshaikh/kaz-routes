import { useState } from "react";

type FormValue = any;
type FormState = Record<string, FormValue>;
type ErrorState = Record<string, string>;

const useForm = (
  initialFields: string[],
  initialValues: Partial<FormState> = {}
) => {
  const initialData = Object.fromEntries(
    initialFields.map((f) => [f, initialValues[f] ?? ""])
  ) as FormState;

  const [formData, setFormData] = useState<FormState>(initialData);
  const [errors, setErrors] = useState<ErrorState>({});

  const handleChange = (field: string, value: FormValue) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (callback: (data: FormState) => void) => {
    const newErrors: ErrorState = {};

    for (const field of initialFields) {
      const value = formData[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      ) {
        newErrors[field] = "Required field";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    callback(formData);
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
  };
};

export default useForm;
