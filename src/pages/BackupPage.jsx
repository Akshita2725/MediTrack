import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export function BackupPage() {
  const {
    doctors,
    patients,
    appointments,
    prescriptions,
    exportData,
    importData,
    resetToDemoData
  } = useApp();

  const [message, setMessage] = useState('');

  // Download all current local storage clinic records as JSON file
  const handleExport = () => {
    try {
      const dataStr = exportData ? exportData() : JSON.stringify({ doctors, patients, appointments, prescriptions }, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `meditrack_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setMessage('Backup file downloaded successfully!');
    } catch {
      setMessage('Failed to generate export file.');
    }
  };

  // Restore records from JSON file
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (typeof content === 'string') {
          if (importData) {
            importData(content);
          } else {
            const parsed = JSON.parse(content);
            if (parsed.appointments) localStorage.setItem('meditrack_v2026_appointments', JSON.stringify(parsed.appointments));
            if (parsed.patients) localStorage.setItem('meditrack_v2026_patients', JSON.stringify(parsed.patients));
          }
          setMessage('Data restored successfully from backup!');
        }
      } catch {
        setMessage('Error: Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Reset all clinic data to default initial demonstration records?')) {
      resetToDemoData();
      setMessage('All records have been reset to factory defaults.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Data Backup & Restore</h1>
        <p className="text-gray-500 text-sm">Save your clinic records to disk or restore initial data</p>
      </div>

      {message && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg text-sm font-medium">
          {message}
        </div>
      )}

      {/* Summary of Current Stored Data */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-bold text-gray-800 text-base">Current Database Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-xs text-gray-400 block">Doctors</span>
            <span className="text-xl font-bold text-gray-800">{doctors.length}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-xs text-gray-400 block">Patients</span>
            <span className="text-xl font-bold text-gray-800">{patients.length}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-xs text-gray-400 block">Bookings</span>
            <span className="text-xl font-bold text-gray-800">{appointments.length}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-xs text-gray-400 block">Prescriptions</span>
            <span className="text-xl font-bold text-gray-800">{prescriptions.length}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        {/* Export */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-5 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Download JSON Backup</h3>
            <p className="text-xs text-gray-500">Export all clinic patients, appointments, and prescriptions</p>
          </div>
          <button
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition"
          >
            Export Backup
          </button>
        </div>

        {/* Import */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-5 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Restore from File</h3>
            <p className="text-xs text-gray-500">Upload a previously saved JSON backup file</p>
          </div>
          <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs px-4 py-2.5 rounded-lg transition cursor-pointer text-center">
            Upload JSON
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Reset */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h3 className="font-semibold text-red-600 text-sm">Reset to Demo Data</h3>
            <p className="text-xs text-gray-500">Restore factory sample dataset and reset queues</p>
          </div>
          <button
            onClick={handleReset}
            className="bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs px-4 py-2.5 rounded-lg border border-red-200 transition"
          >
            Reset Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
