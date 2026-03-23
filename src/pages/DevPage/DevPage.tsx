import React, { useState } from "react";
import { Button, Form, ToggleButton, Table, Popup } from "@/elements-components";
import type { IFormField } from "@/elements-components";
import "./stylee.scss";

/**
 * DEVELOPER SETTINGS PAGE
 * Manage application settings, configuration, and development tools
 */

interface AppSettings {
  appName: string;
  version: string;
  apiUrl: string;
  darkMode: boolean;
  language: string;
  debug: boolean;
  analyticsEnabled: boolean;
  maxRetries: number;
  logLevel: "debug" | "info" | "warn" | "error";
  cacheEnabled: boolean;
}

const DevPage: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem("appSettings");
    return saved
      ? JSON.parse(saved)
      : {
          appName: "Clean Template",
          version: "0.0.1",
          apiUrl: "https://api.example.com",
          darkMode: false,
          language: "en",
          debug: true,
          analyticsEnabled: true,
          maxRetries: 3,
          logLevel: "info",
          cacheEnabled: true,
        };
  });

  const [showPopup, setShowPopup] = useState(false);
  const [originalSettings, setOriginalSettings] = useState<AppSettings>(settings);

  // Save settings to localStorage
  const handleSaveSettings = (formData: Record<string, unknown>) => {
    const updatedSettings: AppSettings = {
      appName: String(formData.appName || settings.appName),
      version: String(formData.version || settings.version),
      apiUrl: String(formData.apiUrl || settings.apiUrl),
      darkMode: Boolean(formData.darkMode) || settings.darkMode,
      language: String(formData.language || settings.language),
      debug: Boolean(formData.debug) || settings.debug,
      analyticsEnabled: Boolean(formData.analyticsEnabled) || settings.analyticsEnabled,
      maxRetries: Number(formData.maxRetries) || settings.maxRetries,
      logLevel: (String(formData.logLevel) || settings.logLevel) as "debug" | "info" | "warn" | "error",
      cacheEnabled: Boolean(formData.cacheEnabled) || settings.cacheEnabled,
    };

    setSettings(updatedSettings);
    localStorage.setItem("appSettings", JSON.stringify(updatedSettings));
    setOriginalSettings(updatedSettings);
    alert("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    setSettings(originalSettings);
  };

  const handleClearStorage = () => {
    localStorage.removeItem("appSettings");
    setSettings({
      appName: "Clean Template",
      version: "0.0.1",
      apiUrl: "https://api.example.com",
      darkMode: false,
      language: "en",
      debug: true,
      analyticsEnabled: true,
      maxRetries: 3,
      logLevel: "info",
      cacheEnabled: true,
    });
    alert("Storage cleared and settings reset!");
  };

  // Form fields for settings
  const settingsFields: IFormField[] = [
    {
      id: "appName",
      label: "Application Name",
      type: "text",
      placeholder: "Enter app name",
      required: true,
    },
    {
      id: "version",
      label: "Version",
      type: "text",
      placeholder: "e.g., 0.0.1",
      required: true,
    },
    {
      id: "apiUrl",
      label: "API URL",
      type: "text",
      placeholder: "https://api.example.com",
      required: true,
    },
    {
      id: "language",
      label: "Language",
      type: "select",
      options: [
        { label: "English", value: "en" },
        { label: "Hebrew", value: "he" },
        { label: "Spanish", value: "es" },
        { label: "French", value: "fr" },
      ],
    },
    {
      id: "logLevel",
      label: "Log Level",
      type: "select",
      options: [
        { label: "Debug", value: "debug" },
        { label: "Info", value: "info" },
        { label: "Warning", value: "warn" },
        { label: "Error", value: "error" },
      ],
    },
    {
      id: "maxRetries",
      label: "Max Retries",
      type: "number",
      placeholder: "3",
    },
  ];

  // Debug log table columns
  const logColumns = [
    { key: "setting", label: "Setting Name", sortable: true },
    { key: "value", label: "Current Value" },
    { key: "type", label: "Type" },
  ];

  // Current settings as table data
  const logData = Object.entries(settings).map(([key, value]) => ({
    setting: key,
    value: String(value),
    type: typeof value,
  }));

  return (
    <div className="dev-page">
      <div className="dev-container">
        <header className="dev-header">
          <h1>⚙️ Developer Settings</h1>
          <p>Manage application configuration and settings</p>
        </header>

        {/* Navigation Tabs */}
        <div className="dev-tabs">
          <button className="dev-tab active">Settings</button>
          <button className="dev-tab">Debug Info</button>
          <button className="dev-tab">Tools</button>
        </div>

        {/* Settings Section */}
        <section className="dev-section">
          <h2>Application Settings</h2>
          <div className="settings-grid">
            {/* Settings Form */}
            <div className="settings-form">
              <Form
                fields={settingsFields}
                onSubmit={handleSaveSettings}
                submitLabel="Save Settings"
                cancelLabel="Reset"
                onCancel={handleResetSettings}
              />
            </div>

            {/* Toggle Settings */}
            <div className="toggle-settings">
              <h3>Feature Toggles</h3>
              <div className="toggle-group">
                <ToggleButton
                  label="Dark Mode"
                  checked={settings.darkMode}
                  onChange={(checked) =>
                    setSettings({ ...settings, darkMode: checked })
                  }
                />
                <ToggleButton
                  label="Debug Mode"
                  checked={settings.debug}
                  onChange={(checked) =>
                    setSettings({ ...settings, debug: checked })
                  }
                />
                <ToggleButton
                  label="Analytics"
                  checked={settings.analyticsEnabled}
                  onChange={(checked) =>
                    setSettings({ ...settings, analyticsEnabled: checked })
                  }
                />
                <ToggleButton
                  label="Cache"
                  checked={settings.cacheEnabled}
                  onChange={(checked) =>
                    setSettings({ ...settings, cacheEnabled: checked })
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Debug Info Section */}
        <section className="dev-section">
          <h2>Current Settings</h2>
          <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "16px" }}>
            All active settings in JSON format and table view
          </p>
          
          <div className="debug-info">
            <div className="json-display">
              <h3>JSON Format</h3>
              <pre>{JSON.stringify(settings, null, 2)}</pre>
            </div>

            <div className="table-display">
              <h3>Table View</h3>
              <Table
                columns={logColumns}
                data={logData}
                striped
                hover
                paginated
                pageSize={5}
              />
            </div>
          </div>
        </section>

        {/* Storage Management */}
        <section className="dev-section dev-danger-zone">
          <h2>Danger Zone</h2>
          <p>These actions cannot be undone</p>
          
          <div className="action-buttons">
            <Button
              label="Export Settings"
              variant="secondary"
              onClick={() => {
                const json = JSON.stringify(settings, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `app-settings-${new Date().toISOString()}.json`;
                a.click();
              }}
            />
            <Button
              label="Clear Storage"
              variant="danger"
              onClick={() => setShowPopup(true)}
            />
          </div>
        </section>

        {/* Confirmation Popup */}
        <Popup
          isOpen={showPopup}
          title="Clear Storage?"
          onClose={() => setShowPopup(false)}
          onConfirm={handleClearStorage}
          confirmLabel="Yes, Clear"
          cancelLabel="Cancel"
          size="small"
        >
          <p>This will delete all saved settings and reset to defaults.</p>
          <p style={{ marginTop: "12px", fontWeight: 600 }}>This action cannot be undone.</p>
        </Popup>
      </div>
    </div>
  );
};

export default DevPage;
