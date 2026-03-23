import React from "react";
import type { IPopupProps } from "@/interfaces/IModels";
import Button from "./Button";
import "./style/style.scss";

const Popup: React.FC<IPopupProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  size = "medium",
  type = "custom",
  className = "",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const popupClasses = [
    "popup",
    `popup-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className={popupClasses}>
        {title && (
          <div className="popup-header">
            <h2 className="popup-title">{title}</h2>
            <button
              className="popup-close"
              onClick={onClose}
              aria-label="Close popup"
            >
              ✕
            </button>
          </div>
        )}

        {children && <div className="popup-content">{children}</div>}

        {(type !== "custom" || (onConfirm || type !== "custom")) && (
          <div className="popup-footer">
            <Button
              label={cancelLabel}
              variant="secondary"
              onClick={onClose}
            />
            {onConfirm && (
              <Button
                label={confirmLabel}
                variant="primary"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
