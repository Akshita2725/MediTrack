import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Pill,
  Calendar,
  User,
  Stethoscope,
  ArrowLeft,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { getTodayISODate } from '../utils/dateUtils.js';

export const PrescriptionFormPage = () => {
  const {
    patients,
    doctors,
    currentDoctor,
    addPrescription,
    repeatPrescriptionData,
    setRepeatPrescriptionData
  } = useApp();

  const navigate = useNavigate();

  // Form State
  const [patientId, setPatientId] = useState(
    repeatPrescriptionData?.patientId || patients[0]?.id || ''
  );
  const [doctorId, setDoctorId] = useState(
    currentDoctor?.id || repeatPrescriptionData?.doctorId || doctors[0]?.id || ''
  );
  const [diagnosis, setDiagnosis] = useState(repeatPrescriptionData?.diagnosis || '');
  const [symptoms, setSymptoms] = useState(repeatPrescriptionData?.symptoms || '');
  const [notes, setNotes] = useState(repeatPrescriptionData?.notes || '');
  const [followUpDate, setFollowUpDate] = useState(repeatPrescriptionData?.followUpDate || '');

  // Medicine list state
  const [medicines, setMedicines] = useState(
    repeatPrescriptionData?.medicines || [
      {
        id: 'med-1',
        name: '',
        dosage: '',
        frequency: 'Twice daily (after meals)',
        duration: '7 Days',
        instructions: 'Take with full glass of water.'
      }
    ]
  );

  const [errors, setErrors] = useState({});

  // Active Patient info
  const selectedPatient = patients.find(p => p.id === patientId) || patients[0];
  const selectedDoctor = doctors.find(d => d.id === doctorId) || doctors[0];

  // Cleanup repeat prescription data on unmount
  useEffect(() => {
    return () => {
      if (repeatPrescriptionData) {
        setRepeatPrescriptionData(null);
      }
    };
  }, [repeatPrescriptionData, setRepeatPrescriptionData]);

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      {
        id: `med-${Date.now()}`,
        name: '',
        dosage: '',
        frequency: 'Twice daily (after meals)',
        duration: '7 Days',
        instructions: ''
      }
    ]);
  };

  const handleRemoveMedicine = (index) => {
    if (medicines.length === 1) return;
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: value };
    setMedicines(updated);
  };

  const validate = () => {
    const err = {};
    if (!patientId) err.patient = 'Please select a patient.';
    if (!diagnosis.trim()) err.diagnosis = 'Clinical diagnosis is required.';
    if (medicines.some(m => !m.name.trim())) {
      err.medicines = 'All medicine entries must have a name.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newRx = addPrescription({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientAge: selectedPatient.age,
      patientAllergies: selectedPatient.allergies,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      doctorQualification: selectedDoctor.qualification,
      symptoms: symptoms.trim(),
      diagnosis: diagnosis.trim(),
      notes: notes.trim(),
      medicines: medicines.filter(m => m.name.trim() !== ''),
      followUpDate: followUpDate || undefined
    });

    navigate(`/prescriptions/${newRx.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
      <button
        onClick={() => navigate('/prescriptions')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Prescriptions
      </button>

      <PageHeader
        title={repeatPrescriptionData ? 'Repeat / Refill Prescription Form' : 'Write Clinical Prescription (Rx)'}
        subtitle="Issue standard electronic prescription, cross-check drug allergies, and set follow-up schedule."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Patient & Doctor Context */}
        <Card className="p-6 border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              1. Patient &amp; Prescriber Information
            </h2>
            {selectedPatient?.allergies && selectedPatient.allergies[0] !== 'None known' && (
              <div className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 px-2.5 py-1 rounded-xl font-bold border border-rose-200/80">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Allergies: {selectedPatient.allergies.join(', ')}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Select Patient Record *
              </label>
              <select
                value={patientId}
                onChange={e => setPatientId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none cursor-pointer"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.gender}, {p.age} yrs) - Blood: {p.bloodGroup}
                  </option>
                ))}
              </select>
              {errors.patient && <p className="text-xs text-rose-600 font-bold mt-1">{errors.patient}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Prescribing Doctor *
              </label>
              <select
                value={doctorId}
                onChange={e => setDoctorId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none cursor-pointer"
              >
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.specialty})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Section 2: Diagnosis & Clinical Reason */}
        <Card className="p-6 border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              2. Clinical Diagnosis &amp; Symptoms
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Primary Diagnosis *
              </label>
              <input
                type="text"
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
                placeholder="e.g. Essential Hypertension (Stage 1), Acute Bronchitis"
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none"
              />
              {errors.diagnosis && <p className="text-xs text-rose-600 font-bold mt-1">{errors.diagnosis}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Presented Symptoms
              </label>
              <input
                type="text"
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                placeholder="e.g. Systolic blood pressure elevation, morning dizziness"
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </Card>

        {/* Section 3: Medication Items */}
        <Card className="p-6 border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                3. Medication Items &amp; Dosages
              </h2>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddMedicine}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Medicine
            </Button>
          </div>

          {errors.medicines && <p className="text-xs text-rose-600 font-bold mb-3">{errors.medicines}</p>}

          <div className="space-y-4">
            {medicines.map((med, index) => (
              <div
                key={med.id || index}
                className="p-4.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 relative group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 font-mono">Pharmaceutical #{index + 1}</span>
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(index)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Medicine Name *
                    </label>
                    <input
                      type="text"
                      value={med.name}
                      onChange={e => handleMedicineChange(index, 'name', e.target.value)}
                      placeholder="e.g. Amlodipine"
                      className="w-full px-3 py-2 bg-white text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Dosage (mg/ml)
                    </label>
                    <input
                      type="text"
                      value={med.dosage}
                      onChange={e => handleMedicineChange(index, 'dosage', e.target.value)}
                      placeholder="e.g. 5 mg"
                      className="w-full px-3 py-2 bg-white text-slate-800 text-xs font-mono rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Frequency
                    </label>
                    <select
                      value={med.frequency}
                      onChange={e => handleMedicineChange(index, 'frequency', e.target.value)}
                      className="w-full px-2.5 py-2 bg-white text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 outline-none cursor-pointer"
                    >
                      <option value="Once daily (Morning)">Once daily (Morning)</option>
                      <option value="Once daily (Night)">Once daily (Night)</option>
                      <option value="Twice daily (after meals)">Twice daily (after meals)</option>
                      <option value="Thrice daily (after meals)">Thrice daily (after meals)</option>
                      <option value="As needed (SOS)">As needed (SOS)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={med.duration}
                      onChange={e => handleMedicineChange(index, 'duration', e.target.value)}
                      placeholder="e.g. 14 Days, 30 Days"
                      className="w-full px-3 py-2 bg-white text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Special Administration Instructions
                  </label>
                  <input
                    type="text"
                    value={med.instructions}
                    onChange={e => handleMedicineChange(index, 'instructions', e.target.value)}
                    placeholder="e.g. Take 30 minutes before breakfast with water"
                    className="w-full px-3 py-2 bg-white text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Section 4: Physician Advice & Follow-Up Date */}
        <Card className="p-6 border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              4. Instructions &amp; Follow-up Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Lifestyle / Dietary Advice
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Low sodium diet, maintain daily blood pressure log, walk 30 mins daily."
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Recommended Follow-Up Date
              </label>
              <input
                type="date"
                value={followUpDate}
                min={getTodayISODate()}
                onChange={e => setFollowUpDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1 font-medium">
                Setting a follow-up automatically notifies the patient and schedules a review slot.
              </p>
            </div>
          </div>
        </Card>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => navigate('/prescriptions')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={<CheckCircle2 className="w-4 h-4" />}
            className="shadow-md shadow-blue-500/25"
          >
            Issue Prescription &amp; Sign
          </Button>
        </div>
      </form>
    </div>
  );
};
