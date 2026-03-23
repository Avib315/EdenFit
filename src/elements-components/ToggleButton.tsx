import React from "react";
import type { IToggleButtonProps } from "@/interfaces/IModels";
import "./style/style.scss";

const ToggleButton: React.FC<IToggleButtonProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  size = "medium",
  className = "",
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const toggleClasses = [
    "toggle-button",
    `toggle-${size}`,
    checked && "toggle-on",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`toggle-wrapper ${className}`}>
      {label && <label className="toggle-label">{label}</label>}
      <div className="toggle-switch">
        <input
          id={id}
          type="checkbox"
          className="toggle-input"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <button
          type="button"
          className={toggleClasses}
          onClick={handleChange}
          disabled={disabled}
          aria-label={label || "Toggle"}
        />
      </div>
    </div>
  );
};

export default ToggleButton;
