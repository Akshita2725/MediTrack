import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Stethoscope,
  Building,
  Video,
  CheckCircle,
  AlertCircle,
  FileText,
  DollarSign,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { getTodayISODate } from '../utils/dateUtils.js';

export const BookingPage = () => {
  const { doctors, patients, addAppointment, currentPatient, role } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pre-selected parameters from URL if any
  const preselectedDocId = searchParams.get('doctor') || doctors[0]?.id || '';
  const preselectedPatId = searchParams.get('patient') || currentPatient?.id || patients[0]?.id || '';

  // Form State
  const [doctorId, setDoctorId] = useState(preselectedDocId);
  const [patientId, setPatientId] = useState(preselectedPatId);
  const [customPatientName, setCustomPatientName] = useState('');
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [date, setDate] = useState(() => getTodayISODate());
  const [time, setTime] = useState('');
  const [consultationType, setConsultationType] = useState('In-Clinic');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const selectedDoctor = doctors.find(d => d.id === doctorId) || doctors[0];

  // Available slots for selected doctor
  const availableSlots = selectedDoctor?.availability.slots || [
    '09:00 AM',
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM'
  ];

  useEffect(() => {
    setTime(availableSlots[0] || '09:00 AM');
  }, [doctorId]);

  const validate = () => {
    const err = {};
    if (!doctorId) err.doctor = 'Please select a doctor.';
    if (!date) err.date = 'Please pick an appointment date.';
    if (!time) err.time = 'Please pick an available time slot.';
    if (isNewPatient && !customPatientName.trim()) err.patient = 'Please enter the patient name.';
    if (!isNewPatient && !patientId) err.patient = 'Please select a patient.';
    if (!symptoms.trim()) err.symptoms = 'Please describe the symptoms or reason for visit.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let targetPatientName = '';
    let targetPatientId = patientId;

    if (isNewPatient) {
      targetPatientName = customPatientName.trim();
      targetPatientId = `guest-${Date.now()}`;
    } else {
      const p = patients.find(pat => pat.id === patientId);
      targetPatientName = p ? p.name : 'Registered Patient';
    }

    const newApt = addAppointment({
      doctorId,
      patientId: targetPatientId,
      patientName: targetPatientName,
      date,
      time,
      consultationType,
      symptoms: symptoms.trim(),
      notes: notes.trim()
    });

    navigate(`/book/success?id=${newApt.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <PageHeader
        title="Schedule Clinical Encounter"
        subtitle="Select medical department, choose attending specialist physician, and confirm consultation mode."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Doctor & Specialty Selection */}
        <Card className="p-6 border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-extrabold shadow-2xs">
                1
              </div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Select Physician &amp; Department</h2>
            </div>
            <span className="text-xs text-slate-400 font-bold">Step 1 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {doctors.map(doc => {
              const isSelected = doc.id === doctorId;
              return (
                <div
                  key={doc.id}
                  onClick={() => setDoctorId(doc.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-2 ring-blue-500/20'
                      : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0 shadow-2xs"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h4>
                      <Badge variant="primary" size="sm" className="mt-0.5">
                        {doc.specialty}
                      </Badge>
                      <p className="text-[11px] text-slate-500 mt-1 font-mono font-bold">${doc.fee} / visit</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.doctor && <p className="text-xs text-rose-600 font-bold mt-2">{errors.doctor}</p>}
        </Card>

        {/* Step 2: Date, Time & Consultation Type */}
        <Card className="p-6 border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-extrabold shadow-2xs">
                2
              </div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Date, Time &amp; Mode</h2>
            </div>
            <span className="text-xs text-slate-400 font-bold">Step 2 of 3</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Consultation Mode */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Consultation Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType('In-Clinic')}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    consultationType === 'In-Clinic'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-700 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-bold">In-Clinic Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType('Tele-Consultation')}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    consultationType === 'Tele-Consultation'
                      ? 'border-purple-600 bg-purple-50/60 text-purple-700 font-bold shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-5 h-5 text-purple-600" />
                  <span className="text-xs font-bold">Tele-Consult (Video)</span>
                </button>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                min={getTodayISODate()}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer"
              />
              {errors.date && <p className="text-xs text-rose-600 font-bold mt-1">{errors.date}</p>}
            </div>
          </div>

          {/* Time Slots Grid */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Available Time Slots for Dr. {selectedDoctor?.name.replace('Dr. ', '')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {availableSlots.map(slot => {
                const isSelected = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono">{slot}</span>
                  </button>
                );
              })}
            </div>
            {errors.time && <p className="text-xs text-rose-600 font-bold mt-2">{errors.time}</p>}
          </div>
        </Card>

        {/* Step 3: Patient Information & Symptoms */}
        <Card className="p-6 border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-extrabold shadow-2xs">
                3
              </div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Patient &amp; Clinical Reason</h2>
            </div>
            <span className="text-xs text-slate-400 font-bold">Step 3 of 3</span>
          </div>

          <div className="space-y-4">
            {/* Registered or New Patient selector */}
            <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!isNewPatient}
                  onChange={() => setIsNewPatient(false)}
                  name="patientType"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Existing Registered Patient</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={isNewPatient}
                  onChange={() => setIsNewPatient(true)}
                  name="patientType"
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>New / Walk-in Patient</span>
              </label>
            </div>

            {!isNewPatient ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Select Patient Record
                </label>
                <select
                  value={patientId}
                  onChange={e => setPatientId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none cursor-pointer"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.gender}, {p.age} yrs) - ID: {p.id}
                    </option>
                  ))}
                </select>
                {errors.patient && <p className="text-xs text-rose-600 font-bold mt-1">{errors.patient}</p>}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Full Patient Name *
                </label>
                <input
                  type="text"
                  value={customPatientName}
                  onChange={e => setCustomPatientName(e.target.value)}
                  placeholder="e.g. Samuel Green"
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none"
                />
                {errors.patient && <p className="text-xs text-rose-600 font-bold mt-1">{errors.patient}</p>}
              </div>
            )}

            {/* Symptoms Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Primary Symptoms / Reason for Consultation *
              </label>
              <textarea
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                placeholder="Describe current medical complaint, onset of symptoms, or clinical review goals..."
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none"
              />
              {errors.symptoms && <p className="text-xs text-rose-600 font-bold mt-1">{errors.symptoms}</p>}
            </div>

            {/* Additional notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Additional Clinical Notes / Instructions (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Fasting required for laboratory panel, bring previous imaging disk"
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </Card>

        {/* Submit Bar */}
        <div className="flex items-center justify-between p-4.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Consultation Fee:</span>
            <strong className="text-lg font-black text-blue-700 font-mono">${selectedDoctor?.fee || 70}</strong>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<CheckCircle className="w-4 h-4" />}
              className="shadow-md shadow-blue-500/25"
            >
              Confirm &amp; Generate Ticket
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
