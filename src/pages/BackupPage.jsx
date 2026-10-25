import React, { useState } from 'react';
import {
  Database,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileJson,
  ShieldCheck,
  HardDrive,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';

export const BackupPage = () => {
  const {
    doctors,
    patients,
    appointments,
    prescriptions,
    followUps,
    messages,
    exportData,
    importData,
    resetToDefault
  } = useApp();

  const [importStatus, setImportStatus] = useState(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleDownloadBackup = () => {
    const jsonString = exportData();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meditrack_clinic_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const success = importData(text);
          if (success) {
            setImportStatus({ type: 'success', message: 'Clinic backup restored successfully!' });
          } else {
            setImportStatus({ type: 'error', message: 'Failed to parse the backup JSON structure.' });
          }
        }
      } catch (err) {
        setImportStatus({ type: 'error', message: 'Invalid JSON file upload.' });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Data Backup, Recovery &amp; Clinic State Management"
        subtitle="Export full database snapshots in JSON format, restore past clinic states, or reset to initial clinical baseline."
      />

      {/* Backup Status Banner */}
      {importStatus && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold ${
            importStatus.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {importStatus.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            )}
            <span>{importStatus.message}</span>
          </div>
          <button onClick={() => setImportStatus(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            &times;
          </button>
        </div>
      )}

      {/* Clinical Database Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        <Card className="p-4 text-center bg-white border-slate-200/90 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Doctors</span>
          <strong className="text-xl font-black text-slate-900 mt-1 block font-mono">{doctors.length}</strong>
        </Card>

        <Card className="p-4 text-center bg-white border-slate-200/90 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Patients</span>
          <strong className="text-xl font-black text-slate-900 mt-1 block font-mono">{patients.length}</strong>
        </Card>

        <Card className="p-4 text-center bg-white border-slate-200/90 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Appointments</span>
          <strong className="text-xl font-black text-blue-600 mt-1 block font-mono">{appointments.length}</strong>
        </Card>

        <Card className="p-4 text-center bg-white border-slate-200/90 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Prescriptions</span>
          <strong className="text-xl font-black text-emerald-600 mt-1 block font-mono">{prescriptions.length}</strong>
        </Card>

        <Card className="p-4 text-center bg-white border-slate-200/90 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Messages</span>
          <strong className="text-xl font-black text-purple-600 mt-1 block font-mono">{messages.length}</strong>
        </Card>
      </div>

      {/* Backup Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <Card className="p-6 flex flex-col justify-between space-y-4 border-slate-200/90 shadow-xs">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Export Clinical Archive (JSON)</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Download a complete snapshot of doctors, patient charts, queued appointments, electronic prescriptions, and messages.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleDownloadBackup}
            icon={<Download className="w-4 h-4" />}
            className="w-full font-bold shadow-md shadow-blue-500/25"
          >
            Download Database Backup (.json)
          </Button>
        </Card>

        {/* Import Card */}
        <Card className="p-6 flex flex-col justify-between space-y-4 border-slate-200/90 shadow-xs">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Restore from JSON Backup</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Upload a previously exported MediTrack JSON snapshot to restore appointments, doctor rosters, and patient records.
            </p>
          </div>
          <label className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-xs">
            <Upload className="w-4 h-4" /> Select Backup File
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </Card>
      </div>

      {/* Reset State Action */}
      <Card className="p-6 border-rose-200 bg-rose-50/40 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-rose-900 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-600" /> Reset to Initial Demonstration Data
            </h4>
            <p className="text-xs text-rose-700/80 font-medium">
              Restore default roster of 6 physicians, 8 patient charts, sample queues, and active electronic prescriptions.
            </p>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all records to default demo data?')) {
                resetToDefault();
                setImportStatus({ type: 'success', message: 'Demo data reset successfully.' });
              }
            }}
            className="font-bold text-xs shadow-xs"
          >
            Reset Database
          </Button>
        </div>
      </Card>
    </div>
  );
};
