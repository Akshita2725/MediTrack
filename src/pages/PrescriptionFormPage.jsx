import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function PrescriptionFormPage() {
  const navigate = useNavigate();
  const { patients, doctors, currentDoctor, addPrescription } = useApp();

  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [doctorId, setDoctorId] = useState(currentDoctor?.id || doctors[0]?.id || '');
  const [diagnosis, setDiagnosis] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  // Dynamic list of medicines
  const [medicines, setMedicines] = useState([
    { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days' }
  ]);

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      { name: '', dosage: '1 tablet', frequency: 'Once daily', duration: '3 days' }
    ]);
  };

  const handleRemoveMedicine = (index) => {
    if (medicines.length === 1) return;
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!diagnosis.trim()) {
      alert('Please enter a diagnosis');
      return;
    }

    const selectedPatient = patients.find((p) => p.id === patientId) || patients[0];

    const newPrescription = addPrescription({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      doctorId,
      diagnosis,
      symptoms,
      notes,
      followUpDate: followUpDate || null,
      medicines: medicines.filter((m) => m.name.trim() !== '')
    });

    navigate(`/prescriptions/${newPrescription.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create New Prescription</h1>
          <p className="text-gray-500 text-sm">Issue digital prescription and dosage instructions</p>
        </div>
        <Link to="/prescriptions" className="text-sm text-blue-600 hover:underline">
          Cancel & Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5">
        {/* Patient & Doctor Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient</label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500"
              required
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.age} yrs - {p.gender || 'Patient'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prescribing Doctor</label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500"
              required
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialty})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Symptoms and Diagnosis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observed Symptoms</label>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Mild fever, dry cough, headache"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Diagnosis</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Acute Viral Bronchitis"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Medicines Section */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold text-gray-800">Prescribed Medicines</h2>
            <button
              type="button"
              onClick={handleAddMedicine}
              className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1.5 rounded hover:bg-blue-100 transition"
            >
              + Add Another Medicine
            </button>
          </div>

          <div className="space-y-2">
            {medicines.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200 items-center">
                <div className="col-span-12 sm:col-span-4">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                    placeholder="Medicine Name (e.g. Amoxicillin 500mg)"
                    required
                    className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white"
                  />
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <input
                    type="text"
                    value={item.dosage}
                    onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                    placeholder="Dosage (e.g. 1 tab)"
                    className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white"
                  />
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <input
                    type="text"
                    value={item.frequency}
                    onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                    placeholder="Frequency (e.g. Twice daily)"
                    className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2 flex items-center justify-between gap-1">
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                    placeholder="5 days"
                    className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white"
                  />
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(index)}
                      className="text-red-500 hover:text-red-700 font-bold px-1 text-sm"
                      title="Remove medicine"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor's Advice & Follow-Up Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor's Advice / Diet Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Drink warm fluids, rest for 3 days, avoid cold drinks..."
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Follow-Up Date (Optional)</label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">If selected, an automated follow-up reminder will be created.</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-sm transition"
        >
          Save & Issue Prescription
        </button>
      </form>
    </div>
  );
}
