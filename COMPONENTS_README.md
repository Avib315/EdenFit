# Elements Components Library

A comprehensive, generic, and reusable component library built with React, TypeScript, and SCSS. Designed to be a template for all future projects.

## 📦 Components Included

### 1. **Button**
Generic button component with multiple variants and sizes.

**Props:**
- `label`: Button text (required)
- `variant`: "primary" | "secondary" | "tertiary" | "danger" | "success"
- `size`: "small" | "medium" | "large"
- `disabled`: boolean
- `loading`: boolean
- `icon`: React.ReactNode
- `onClick`: () => void
- `type`: "button" | "submit" | "reset"
- `fullWidth`: boolean

**Usage:**
```tsx
import { Button } from './elements-components';

<Button 
  label="Click Me" 
  variant="primary" 
  size="medium"
  onClick={() => console.log('clicked')}
/>
```

---

### 2. **Input**
Flexible input component supporting various input types with validation.

**Props:**
- `type`: "text" | "email" | "password" | "number" | "tel" | "url"
- `placeholder`: string
- `value`: string | number
- `onChange`: (value: string | number) => void
- `label`: string
- `error`: boolean
- `errorMessage`: string
- `disabled`: boolean
- `required`: boolean
- `icon`: React.ReactNode
- `iconPosition`: "left" | "right"
- `size`: "small" | "medium" | "large"
- `variant`: "outlined" | "filled"
- `maxLength`: number
- `minLength`: number

**Usage:**
```tsx
import { Input } from './elements-components';

<Input
  type="email"
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  error={hasError}
  errorMessage="Invalid email"
/>
```

---

### 3. **Form**
Complete form component with field validation and form state management.

**Props:**
- `fields`: IFormField[] (array of form fields)
- `onSubmit`: (formData: Record<string, any>) => void
- `onCancel`: () => void (optional)
- `submitLabel`: string
- `cancelLabel`: string
- `loading`: boolean

**Field Types:**
- "text"
- "email"
- "password"
- "number"
- "textarea"
- "select"
- "checkbox"
- "radio"

**Usage:**
```tsx
import { Form } from './elements-components';

const fields = [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    validation: (value) => value.length < 2 ? 'Name too short' : null
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    required: true
  }
];

<Form
  fields={fields}
  onSubmit={(data) => console.log(data)}
  submitLabel="Submit"
/>
```

---

### 4. **List**
Selectable list component with optional multi-selection.

**Props:**
- `items`: IListItem[]
- `onSelect`: (item: IListItem) => void
- `selectable`: boolean
- `multiSelect`: boolean

**Usage:**
```tsx
import { List } from './elements-components';

const items = [
  { id: 1, label: 'Item 1', description: 'Description 1' },
  { id: 2, label: 'Item 2', description: 'Description 2' }
];

<List
  items={items}
  selectable
  onSelect={(item) => console.log(item)}
/>
```

---

### 5. **Table**
Advanced table component with sorting, pagination, and selection.

**Props:**
- `columns`: ITableColumn[]
- `data`: any[]
- `onRowClick`: (row: any) => void
- `selectable`: boolean
- `striped`: boolean
- `hover`: boolean
- `loading`: boolean
- `paginated`: boolean
- `pageSize`: number

**Usage:**
```tsx
import { Table } from './elements-components';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' }
];

const data = [
  { name: 'John', email: 'john@example.com', status: 'Active' }
];

<Table
  columns={columns}
  data={data}
  selectable
  striped
  hover
  paginated
  pageSize={10}
/>
```

---

### 6. **Popup (Modal)**
Flexible modal/popup component with different sizes and types.

**Props:**
- `isOpen`: boolean
- `title`: string
- `children`: React.ReactNode
- `onClose`: () => void
- `onConfirm`: () => void
- `confirmLabel`: string
- `cancelLabel`: string
- `size`: "small" | "medium" | "large"
- `type`: "alert" | "confirm" | "custom"

**Usage:**
```tsx
import { Popup } from './elements-components';

<Popup
  isOpen={isOpen}
  title="Confirmation"
  onClose={handleClose}
  onConfirm={handleConfirm}
  size="medium"
>
  Are you sure?
</Popup>
```

---

### 7. **ToggleButton (Switch)**
Toggle switch/checkbox component with different sizes.

**Props:**
- `label`: string
- `checked`: boolean
- `onChange`: (checked: boolean) => void
- `disabled`: boolean
- `size`: "small" | "medium" | "large"

**Usage:**
```tsx
import { ToggleButton } from './elements-components';

<ToggleButton
  label="Dark Mode"
  checked={isDarkMode}
  onChange={setIsDarkMode}
  size="medium"
/>
```

---

## 🎨 Styling

All components are styled using SCSS. The main stylesheet is located at:
```
src/elements-components/style/style.scss
```

### Key Features:
- **Variables**: Color palette, sizes, font sizes, shadows, transitions
- **Mixins**: Utility mixins for common patterns (flex-center, transitions, etc.)
- **Responsive**: Mobile-first responsive design
- **Customizable**: All colors, sizes, and spacing can be configured

### Color Palette:
- `$colors-primary`: #2563eb (Blue)
- `$colors-secondary`: #64748b (Gray)
- `$colors-danger`: #dc2626 (Red)
- `$colors-success`: #16a34a (Green)
- `$colors-warning`: #ea580c (Orange)
- `$colors-info`: #0891b2 (Cyan)

---

## 📂 Project Structure

```
src/
├── elements-components/          # Reusable component library
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Form.tsx
│   ├── List.tsx
│   ├── Table.tsx
│   ├── Popup.tsx
│   ├── ToggleButton.tsx
│   ├── index.ts                 # Barrel export
│   └── style/
│       └── style.scss           # Global component styles
├── interfaces/
│   └── IModels.ts              # All component interfaces
├── pages/                       # Page components
├── component/                   # Specific feature components
├── stores/                      # Zustand stores
├── styles/                      # Global styles
└── utils/                       # Utility functions
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Import components
```tsx
import { Button, Input, Form, List, Table, Popup, ToggleButton } from './elements-components';

// Use in your component
<Button label="Submit" onClick={handleSubmit} />
```

---

## 📝 Development Guidelines

### Creating New Components
1. Follow the existing component structure
2. Add interface to `IModels.ts`
3. Create component file with TypeScript
4. Add styles to `style/style.scss`
5. Export from `index.ts`

### Coding Standards
- Use TypeScript for type safety
- Use functional components with hooks
- Follow the naming conventions (camelCase for props)
- Add JSDoc comments for complex logic
- Make components generic and reusable

---

## 🎯 Use as Template

This project is designed to be used as a template for future projects. To use it:

1. Copy this project to a new location
2. Update `package.json` with your project name and details
3. Modify the components as needed for your specific requirements
4. Add your custom pages and features
5. Keep the elements-components library generic for reusability

---

## 📦 Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` folder.

---

## 🔧 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

---

## 🤝 Contributing

When adding new components or features:
1. Maintain backward compatibility
2. Keep components generic
3. Update documentation
4. Test on different screen sizes
5. Follow existing code patterns

---

## 📄 License

This project is open source and available for personal and commercial use.
