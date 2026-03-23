import React, { useState } from "react";
import type { IFormProps, IFormField } from "@/interfaces/IModels";
import Button from "./Button";
import Input from "./Input";
import "./style/style.scss";

const Form: React.FC<IFormProps> = ({
  fields,
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  loading = false,
  className = "",
}) => {
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>(
    Object.fromEntries(fields.map((field) => [field.id, ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldId: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.id];

      // Check required fields
      if (field.required && !value) {
        newErrors[field.id] = `${field.label} is required`;
      }

      // Run custom validation
      if (field.validation && value) {
        const validationError = field.validation(value);
        if (validationError) {
          newErrors[field.id] = validationError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: IFormField) => {
    const value = formData[field.id];
    const error = !!errors[field.id];
    const errorMessage = errors[field.id];

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.id} className="form-group">
            <label htmlFor={field.id} className="input-label">
              {field.label}
              {field.required && <span style={{ color: "red" }}>*</span>}
            </label>
            <textarea
              id={field.id}
              placeholder={field.placeholder}
              value={String(value)}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              required={field.required}
              className={`input input-outlined ${error ? "input-error" : ""}`}
              style={{ resize: "vertical", minHeight: "100px" }}
            />
            {error && (
              <span className="input-error-message">{errorMessage}</span>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="form-group">
            <label htmlFor={field.id} className="input-label">
              {field.label}
              {field.required && <span style={{ color: "red" }}>*</span>}
            </label>
            <select
              id={field.id}
              value={String(value)}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              required={field.required}
              className={`input input-outlined ${error ? "input-error" : ""}`}
            >
              <option value="">{field.placeholder || "Select an option"}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <span className="input-error-message">{errorMessage}</span>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                id={field.id}
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              />
              {field.label}
              {field.required && <span style={{ color: "red" }}>*</span>}
            </label>
            {error && (
              <span className="input-error-message">{errorMessage}</span>
            )}
          </div>
        );

      case "radio":
        return (
          <div key={field.id} className="form-group">
            <label className="input-label">
              {field.label}
              {field.required && <span style={{ color: "red" }}>*</span>}
            </label>
            {field.options?.map((option) => (
              <label
                key={option.value}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={String(value) === String(option.value)}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
                {option.label}
              </label>
            ))}
            {error && (
              <span className="input-error-message">{errorMessage}</span>
            )}
          </div>
        );

      default:
        return (
          <Input
            key={field.id}
            id={field.id}
            type={field.type as "text" | "email" | "password" | "number" | "tel" | "url"}
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
            errorMessage={errorMessage}
            required={field.required}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${className}`}>
      {fields.map((field) => renderField(field))}

      <div className="form-actions">
        <Button
          label={submitLabel}
          variant="primary"
          type="submit"
          loading={loading}
        />
        {onCancel && (
          <Button
            label={cancelLabel}
            variant="secondary"
            type="button"
            onClick={onCancel}
            disabled={loading}
          />
        )}
      </div>
    </form>
  );
};

export default Form;
