// hooks/useSimpleForm.ts

import { useState } from "react";

type FormState = Record<string, string>;
type ErrorState = Record<string, string>;

const useForm = (initialFields: string[]) => {
  const initialData = Object.fromEntries(initialFields.map((f) => [f, ""]));
  const [formData, setFormData] = useState<FormState>(initialData);
  const [errors, setErrors] = useState<ErrorState>({});

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = (callback: (data: FormState) => void) => {
    const newErrors: ErrorState = {};
    initialFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "Required field";
      }
    });

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

  return { formData, errors, handleChange, handleSubmit, resetForm };
};

export default useForm;
