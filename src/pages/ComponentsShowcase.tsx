import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  List,
  Table,
  Popup,
  ToggleButton,
  type IListItem,
} from "@/elements-components";

/**
 * COMPONENTS SHOWCASE PAGE
 * This page demonstrates all available elements components in action
 * Use this as a reference for implementing components in your project
 */

const ComponentsShowcase: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  // ========== BUTTON EXAMPLES ==========
  const handleButtonClick = () => {
    alert("Button clicked!");
  };

  // ========== INPUT EXAMPLES ==========

  // ========== FORM EXAMPLES ==========
  const formFields = [
    {
      id: "fullname",
      label: "Full Name",
      type: "text" as const,
      placeholder: "Enter your full name",
      required: true,
      validation: (value: string) =>
        value.length < 2 ? "Name must be at least 2 characters" : null,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email" as const,
      placeholder: "your@email.com",
      required: true,
    },
    {
      id: "password",
      label: "Password",
      type: "password" as const,
      placeholder: "Min 8 characters",
      required: true,
      validation: (value: string) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
    },
    {
      id: "country",
      label: "Country",
      type: "select" as const,
      required: true,
      options: [
        { label: "United States", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "United Kingdom", value: "uk" },
        { label: "Other", value: "other" },
      ],
    },
    {
      id: "newsletter",
      label: "Subscribe to newsletter",
      type: "checkbox" as const,
    },
    {
      id: "role",
      label: "Select Role",
      type: "radio" as const,
      options: [
        { label: "Developer", value: "dev" },
        { label: "Designer", value: "designer" },
        { label: "Manager", value: "manager" },
      ],
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (formData: Record<string, any>) => {
    console.log("Form submitted with data:", formData);
    alert(`Form submitted! Check console for full data.`);
  };

  // ========== LIST EXAMPLES ==========
  const listItems = [
    {
      id: 1,
      label: "React Component",
      description: "Build reusable UI components",
    },
    {
      id: 2,
      label: "TypeScript Types",
      description: "Full type safety with interfaces",
    },
    {
      id: 3,
      label: "SCSS Styling",
      description: "Beautiful and responsive design",
    },
    {
      id: 4,
      label: "State Management",
      description: "Zustand for global state",
    },
  ];

  const handleListSelect = (item: IListItem) => {
    console.log("Selected item:", item);
  };

  // ========== TABLE EXAMPLES ==========
  const tableColumns = [
    { key: "id", label: "ID", sortable: true, width: "50px" },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            background: value === "Active" ? "#16a34a" : "#dc2626",
            color: "white",
            fontSize: "12px",
          }}
        >
          {value}
        </span>
      ),
    },
  ];

  const tableData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Developer",
      status: "Active",
    },
  ];

  const handleTableRowClick = (row: unknown) => {
    console.log("Clicked row:", row);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>🎨 Elements Components Showcase</h1>
      <p>
        This page demonstrates all available generic components. Use these as
        building blocks for your application.
      </p>

      {/* ========== BUTTONS SECTION ========== */}
      <section style={{ marginTop: "40px" }}>
        <h2>📌 Button Component</h2>
        <p>Multiple variants and sizes</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button label="Primary" variant="primary" onClick={handleButtonClick} />
          <Button label="Secondary" variant="secondary" onClick={handleButtonClick} />
          <Button label="Tertiary" variant="tertiary" onClick={handleButtonClick} />
          <Button label="Danger" variant="danger" onClick={handleButtonClick} />
          <Button label="Success" variant="success" onClick={handleButtonClick} />
          <Button
            label="Disabled"
            disabled={true}
            onClick={handleButtonClick}
          />
          <Button label="Small" size="small" onClick={handleButtonClick} />
          <Button label="Large" size="large" onClick={handleButtonClick} />
          <Button
            label="Loading..."
            loading={true}
            onClick={handleButtonClick}
          />
          <Button label="Full Width" fullWidth={true} onClick={handleButtonClick} />
        </div>
      </section>

      {/* ========== INPUT SECTION ========== */}
      <section style={{ marginTop: "40px" }}>
        <h2>📝 Input Component</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <Input
            type="text"
            label="Text Input"
            placeholder="Enter text"
          />
          <Input
            type="email"
            label="Email Input"
            placeholder="Enter email"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
          />
          <Input
            type="number"
            label="Number"
            placeholder="Enter number"
          />
          <Input
            type="text"
            label="Email (with error)"
            placeholder="Invalid email"
            error={email.length > 0 && !email.includes("@")}
            value={email}
            onChange={(val) => setEmail(String(val))}
            errorMessage="Please enter a valid email"
          />
          <Input
            label="Filled Variant"
            placeholder="Filled input"
            variant="filled"
          />
        </div>
      </section>

      {/* ========== FORM SECTION ========== */}
      <section style={{ marginTop: "40px" }}>
        <h2>📋 Form Component</h2>
        <div style={{ maxWidth: "500px" }}>
          <Form
            fields={formFields}
            onSubmit={handleFormSubmit}
            onCancel={() => console.log("Form cancelled")}
            submitLabel="Register"
            cancelLabel="Clear"
          />
        </div>
      </section>

      {/* ========== LIST SECTION ========== */}
      <section style={{ marginTop: "40px" }}>
        <h2>📖 List Component</h2>
        <div style={{ maxWidth: "500px" }}>
          <List
            items={listItems}
            selectable={true}
            onSelect={handleListSelect}
          />
        </div>
      </section>

      {/* ========== TABLE SECTION ========== */}
      <section style={{ marginTop: "40px" }}>
        <h2>📊 Table Component</h2>
        <Table
          columns={tableColumns}
          data={tableData}
          selectable={true}
          striped={true}
          hover={true}
          onRowClick={handleTableRowClick}
          paginated={true}
          pageSize={2}
        />
      </section>

      {/* ========== POPUP SECTION ========== */}
      <section style={{ marginTop: "40px" }}>
        <h2>🪟 Popup Component</h2>
        <Button
          label="Open Modal"
          variant="primary"
          onClick={() => setShowPopup(true)}
        />
        <Popup
          isOpen={showPopup}
          title="Welcome!"
          onClose={() => setShowPopup(false)}
          onConfirm={() => {
            alert("Confirmed!");
            setShowPopup(false);
          }}
          size="medium"
        >
          <p>This is a modal dialog. You can customize the content and actions.</p>
          <p>Click Confirm or Cancel to close this modal.</p>
        </Popup>
      </section>

      {/* ========== TOGGLE SECTION ========== */}
      <section style={{ marginTop: "40px" }}>
        <h2>🔘 Toggle Button Component</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <ToggleButton
            label="Dark Mode"
            checked={darkMode}
            onChange={setDarkMode}
          />
          <ToggleButton label="Small" checked={false} onChange={() => {}} size="small" />
          <ToggleButton label="Large" checked={true} onChange={() => {}} size="large" />
        </div>
      </section>

      {/* ========== NEXT STEPS ========== */}
      <section style={{ marginTop: "40px", padding: "20px", background: "#f1f5f9", borderRadius: "8px" }}>
        <h2>🚀 Next Steps</h2>
        <ul>
          <li>
            <strong>Review Components:</strong> Check{" "}
            <code>src/elements-components/</code> for all component code
          </li>
          <li>
            <strong>Styling:</strong> Customize colors and styles in{" "}
            <code>src/elements-components/style/style.scss</code>
          </li>
          <li>
            <strong>Create Pages:</strong> Add new pages in <code>src/pages/</code>
          </li>
          <li>
            <strong>State Management:</strong> Use Zustand stores in{" "}
            <code>src/stores/</code>
          </li>
          <li>
            <strong>Read Documentation:</strong> Check{" "}
            <code>COMPONENTS_README.md</code> and <code>TEMPLATE_GUIDE.md</code>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ComponentsShowcase;
