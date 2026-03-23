import React from "react";
import type { IInputProps } from "@/interfaces/IModels";
import "./style/style.scss";

const Input: React.FC<IInputProps> = ({
  id,
  type = "text",
  placeholder,
  value = "",
  onChange,
  onBlur,
  onFocus,
  label,
  error = false,
  errorMessage,
  disabled = false,
  required = false,
  icon,
  iconPosition = "left",
  size = "medium",
  variant = "outlined",
  className = "",
  maxLength,
  minLength,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === "number" ? e.target.valueAsNumber : e.target.value;
    onChange?.(newValue);
  };

  const handleFocus = () => {
    onFocus?.();
  };

  const handleBlur = () => {
    onBlur?.();
  };

  const inputClasses = [
    "input",
    `input-${size}`,
    `input-${variant}`,
    error && "input-error",
    icon && `input-with-${iconPosition}-icon`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = ["input-wrapper", className].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <div className="input-field">
        {icon && iconPosition === "left" && (
          <span className="input-icon input-icon-left">{icon}</span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={String(value || "")}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          required={required}
          className={inputClasses}
        />
        {icon && iconPosition === "right" && (
          <span className="input-icon input-icon-right">{icon}</span>
        )}
      </div>
      {error && errorMessage && (
        <span className="input-error-message">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
