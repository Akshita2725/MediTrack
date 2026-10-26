import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedDoctorId = searchParams.get('doctor');

  const { doctors, patients, addAppointment } = useApp();

  const [doctorId, setDoctorId] = useState(preselectedDoctorId || (doctors[0]?.id || ''));
  const [patientName, setPatientName] = useState(patients[0]?.name || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00 AM');
  const [consultationType, setConsultationType] = useState('In-Person');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert('Please enter a patient name');
      return;
    }

    const selectedPatient = patients.find(
      (p) => p.name.toLowerCase() === patientName.toLowerCase()
    );

    const newAppointment = addAppointment({
      doctorId,
      patientId: selectedPatient ? selectedPatient.id : `pat-${Date.now()}`,
      patientName,
      date,
      time,
      consultationType,
      symptoms: symptoms || 'General Consultation',
      notes
    });

    navigate(`/book/success?id=${newAppointment.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Book an Appointment</h1>
        <p className="text-gray-500 text-sm mt-1">Schedule a doctor consultation quickly and easily</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        {/* Doctor Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500"
            required
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} — {doc.specialty} (${doc.consultationFee || 50})
              </option>
            ))}
          </select>
        </div>

        {/* Patient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter full name"
              required
              className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            />
            {patients.length > 0 && (
              <select
                onChange={(e) => {
                  if (e.target.value) setPatientName(e.target.value);
                }}
                className="border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 text-gray-600"
              >
                <option value="">Quick select...</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="04:30 PM">04:30 PM</option>
            </select>
          </div>
        </div>

        {/* Consultation Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="consultationType"
                value="In-Person"
                checked={consultationType === 'In-Person'}
                onChange={(e) => setConsultationType(e.target.value)}
                className="text-blue-600"
              />
              In-Person (Clinic Visit)
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="consultationType"
                value="Video"
                checked={consultationType === 'Video'}
                onChange={(e) => setConsultationType(e.target.value)}
                className="text-blue-600"
              />
              Video / Online
            </label>
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Symptoms / Reason</label>
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. Mild fever, persistent cough, regular health check"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Any allergies, previous history or special notes..."
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition text-sm"
        >
          Confirm & Book Appointment
        </button>
      </form>
    </div>
  );
}
