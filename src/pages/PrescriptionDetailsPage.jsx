import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Printer,
  Repeat,
  ArrowLeft,
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { formatClinicalDate } from '../utils/dateUtils.js';

export const PrescriptionDetailsPage = () => {
  const { id } = useParams();
  const { prescriptions, setRepeatPrescriptionData, setRole } = useApp();
  const navigate = useNavigate();

  const rx = prescriptions.find(p => p.id === id);

  if (!rx) {
    return (
      <EmptyState
        icon={<FileText className="w-10 h-10 text-slate-400" />}
        title="Prescription Not Found"
        description="The requested prescription record ID does not exist in MediTrack archives."
        actionLabel="Back to Prescriptions"
        onAction={() => navigate('/prescriptions')}
      />
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleRepeat = () => {
    const cloned = {
      patientId: rx.patientId,
      patientName: rx.patientName,
      patientAge: rx.patientAge,
      patientAllergies: [...rx.patientAllergies],
      doctorId: rx.doctorId,
      doctorName: rx.doctorName,
      doctorSpecialty: rx.doctorSpecialty,
      doctorQualification: rx.doctorQualification,
      symptoms: `Refill for ${rx.diagnosis}`,
      diagnosis: rx.diagnosis,
      notes: `Refill prescription issued based on Rx #${rx.id}`,
      medicines: rx.medicines.map(m => ({ ...m, id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 5)}` })),
      followUpDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    };
    setRepeatPrescriptionData(cloned);
    setRole('doctor');
    navigate('/prescriptions/new');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Controls (Hidden during print) */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={() => navigate('/prescriptions')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Prescriptions
        </button>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRepeat}
            icon={<Repeat className="w-3.5 h-3.5 text-blue-600" />}
            className="font-bold text-xs"
          >
            Repeat Prescription
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            icon={<Printer className="w-3.5 h-3.5" />}
            className="shadow-md shadow-blue-500/25 font-bold text-xs"
          >
            Print Prescription
          </Button>
        </div>
      </div>

      {/* Official Medical Prescription Slip */}
      <Card className="p-6 sm:p-10 border-2 border-slate-200/90 bg-white shadow-md print:border-none print:shadow-none print:p-0">
        {/* Clinic & Doctor Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-blue-600 pb-5 mb-6 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">MediTrack Medical Clinic</h1>
              <p className="text-xs text-slate-500 font-medium">Department of {rx.doctorSpecialty} &bull; Clinical Outpatient Hub</p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs">
            <h2 className="text-sm font-extrabold text-slate-900">{rx.doctorName}</h2>
            <p className="text-blue-600 font-bold">{rx.doctorQualification}</p>
            <p className="text-slate-400 text-[11px] font-medium">Consultant in {rx.doctorSpecialty}</p>
          </div>
        </div>

        {/* Patient & Prescription Info Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 mb-6">
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold tracking-wider">Patient Name</span>
            <strong className="text-slate-900 text-sm font-extrabold">{rx.patientName}</strong>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold tracking-wider">Age / Status</span>
            <strong className="text-slate-900 font-bold">{rx.patientAge} Years</strong>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold tracking-wider">Rx Number</span>
            <strong className="font-mono text-blue-700 font-extrabold">{rx.id}</strong>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold tracking-wider">Date Issued</span>
            <strong className="text-slate-900 font-bold">{formatClinicalDate(rx.date)}</strong>
          </div>
        </div>

        {/* Allergy Warning if present */}
        {rx.patientAllergies && rx.patientAllergies.length > 0 && rx.patientAllergies[0] !== 'None known' && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl mb-6 flex items-center gap-2 text-xs text-rose-800 font-bold">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>CRITICAL ALLERGY RECORD: {rx.patientAllergies.join(', ')}</span>
          </div>
        )}

        {/* Diagnosis & Symptoms */}
        <div className="space-y-2.5 mb-8">
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Clinical Diagnosis:</span>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{rx.diagnosis}</h3>
          </div>
          {rx.symptoms && (
            <p className="text-xs text-slate-600 italic font-medium">&ldquo;Presented with: {rx.symptoms}&rdquo;</p>
          )}
        </div>

        {/* Prescription Rx Symbol & Drugs Table */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="text-3xl font-serif font-black text-blue-600 leading-none">℞</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Medication Orders</span>
          </div>

          <div className="space-y-3">
            {rx.medicines.map((med, index) => (
              <div
                key={med.id || index}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400 text-xs">{index + 1}.</span>
                    <strong className="text-slate-900 text-sm font-extrabold">{med.name}</strong>
                    <Badge variant="primary" size="sm">
                      {med.dosage}
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-xs pl-5 font-medium">
                    <strong>Sig:</strong> {med.instructions}
                  </p>
                </div>

                <div className="text-left sm:text-right pl-5 sm:pl-0">
                  <span className="font-bold text-slate-800 block">{med.frequency}</span>
                  <span className="text-slate-500 text-[11px] font-medium block">Duration: {med.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Advice / Notes & Follow-Up */}
        <div className="p-4.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 mb-10">
          <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">
            Physician Instructions &amp; Dietary Guidelines:
          </span>
          <p className="text-slate-700 leading-relaxed font-medium">{rx.notes || 'Take medications as directed.'}</p>
          {rx.followUpDate && (
            <div className="pt-2.5 border-t border-slate-200/70 flex items-center gap-2 text-amber-800 font-bold">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Recommended Follow-up Review: {formatClinicalDate(rx.followUpDate)}</span>
            </div>
          )}
        </div>

        {/* Signature & Stamp Footer */}
        <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="text-[11px] text-slate-400 space-y-0.5 font-medium">
            <p>MediTrack Clinical Electronic Record &bull; QR Verified</p>
            <p>For inquiries, call clinic line: +1 (555) 234-8901</p>
          </div>

          <div className="text-center">
            <div className="font-serif italic text-lg text-blue-900 mb-1 border-b border-slate-300 pb-1 px-8">
              {rx.doctorName}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Authorized Signature &amp; License Seal
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
