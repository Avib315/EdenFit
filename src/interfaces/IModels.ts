// ==========================================
// Generic Component Interfaces
// ==========================================

// Button Component Interfaces
export interface IButtonProps {
  id?: string;
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

// Input Component Interfaces
export interface IInputProps {
  id?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string | number | boolean;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "small" | "medium" | "large";
  variant?: "outlined" | "filled";
  className?: string;
  maxLength?: number;
  minLength?: number;
}

// Form Component Interfaces
export interface IFormField {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea" | "select" | "checkbox" | "radio";
  placeholder?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation?: (value: any) => string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: { label: string; value: any }[];
}

export interface IFormProps {
  fields: IFormField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (formData: Record<string, any>) => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  className?: string;
}

// List Component Interfaces
export interface IListItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

export interface IListProps {
  items: IListItem[];
  onSelect?: (item: IListItem) => void;
  selectable?: boolean;
  multiSelect?: boolean;
  className?: string;
}

// Table Component Interfaces
export interface ITableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: any) => React.ReactNode;
}

export interface ITableProps {
  columns: ITableColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: (row: any) => void;
  selectable?: boolean;
  striped?: boolean;
  hover?: boolean;
  className?: string;
  loading?: boolean;
  paginated?: boolean;
  pageSize?: number;
}

// Popup/Modal Component Interfaces
export interface IPopupProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  size?: "small" | "medium" | "large";
  type?: "alert" | "confirm" | "custom";
  className?: string;
}

// Toggle Button Component Interfaces
export interface IToggleButtonProps {
  id?: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}

// Generic Select/Dropdown Interface
export interface ISelectOption {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ISelectProps {
  id?: string;
  options: ISelectOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  multiSelect?: boolean;
  searchable?: boolean;
  className?: string;
}
