import React from "react";
import type { IButtonProps } from "@/interfaces/IModels";
import "./style/style.scss";

const Button: React.FC<IButtonProps> = ({
  id,
  label,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = "",
  type = "button",
  fullWidth = false,
}) => {
  const buttonClasses = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    loading && "btn-loading",
    fullWidth && "btn-fullwidth",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      id={id}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && !loading && icon}
      {label}
    </button>
  );
};

export default Button;
