import { useState } from "react";

type FormValue = any;
type FormState = Record<string, FormValue>;
type ErrorState = Record<string, string>;

interface FieldConfig {
  name: string;
  required?: boolean; // optional flag
  value?: FormValue; // ✅ default value
}

const useForm = (fields: FieldConfig[]) => {
  const initialData = Object.fromEntries(
    fields.map((f) => [f.name, f.value ?? ""])
  ) as FormState;

  const [formData, setFormData] = useState<FormState>(initialData);
  const [errors, setErrors] = useState<ErrorState>({});

  const handleChange = (field: string, value: FormValue) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (callback: (data: FormState) => void) => {
    const newErrors: ErrorState = {};

    for (const field of fields) {
      const value = formData[field.name];

      if (field.required ?? true) {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0)
        ) {
          newErrors[field.name] = "Required field";
        }
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
