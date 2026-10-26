import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function PrescriptionDetailsPage() {
  const { id } = useParams();
  const { prescriptions } = useApp();

  const rx = prescriptions.find((p) => p.id === id) || prescriptions[0];

  if (!rx) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Prescription Not Found</h2>
        <Link to="/prescriptions" className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block text-sm">
          Back to Prescriptions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar with Print and Back */}
      <div className="flex justify-between items-center print:hidden">
        <Link to="/prescriptions" className="text-sm text-blue-600 hover:underline">
          &larr; Back to all prescriptions
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Print Prescription
        </button>
      </div>

      {/* Prescription Card / Printable Slip */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
        {/* Clinic & Doctor Header */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">MEDITRACK CLINIC</h1>
            <p className="text-xs text-gray-500">Comprehensive Healthcare & Telemedicine Center</p>
            <p className="text-xs text-gray-400">Phone: +1 (555) 019-2834 • Email: care@meditrack.org</p>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-gray-800 text-base">{rx.doctorName}</h2>
            <p className="text-xs text-blue-600 font-medium">{rx.doctorSpecialty || 'Specialist'}</p>
            <p className="text-xs text-gray-500">{rx.doctorQualification || 'MBBS, MD'}</p>
          </div>
        </div>

        {/* Patient Info Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg text-sm border border-gray-100">
          <div>
            <span className="text-xs text-gray-400 block">Patient Name</span>
            <span className="font-semibold text-gray-800">{rx.patientName}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Age / Gender</span>
            <span className="font-medium text-gray-700">{rx.patientAge || '32'} yrs</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Prescription ID</span>
            <span className="font-mono text-xs font-semibold text-blue-600">{rx.id}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Date</span>
            <span className="font-medium text-gray-700">{rx.date}</span>
          </div>
        </div>

        {/* Diagnosis & Symptoms */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-800">
            Diagnosis: <span className="text-blue-700">{rx.diagnosis || 'Clinical Assessment'}</span>
          </p>
          {rx.symptoms && (
            <p className="text-xs text-gray-500">
              Reported Symptoms: {rx.symptoms}
            </p>
          )}
        </div>

        {/* Rx Symbol and Medicines Table */}
        <div className="space-y-3">
          <div className="text-2xl font-serif font-black text-blue-600">℞</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase">
                  <th className="py-2">#</th>
                  <th className="py-2">Medicine Name</th>
                  <th className="py-2">Dosage</th>
                  <th className="py-2">Frequency</th>
                  <th className="py-2">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Array.isArray(rx.medicines) && rx.medicines.length > 0 ? (
                  rx.medicines.map((med, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 text-gray-400 text-xs">{idx + 1}</td>
                      <td className="py-2.5 font-medium text-gray-900">{med.name || med}</td>
                      <td className="py-2.5 text-gray-600 text-xs">{med.dosage || '1 unit'}</td>
                      <td className="py-2.5 text-gray-600 text-xs">{med.frequency || 'Daily'}</td>
                      <td className="py-2.5 text-gray-600 text-xs">{med.duration || '5 days'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-400 text-xs">
                      Standard supportive medications advised.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Advice and Follow up */}
        <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
          {rx.notes && (
            <div>
              <span className="font-semibold text-gray-700">Clinical Advice: </span>
              <span className="text-gray-600">{rx.notes}</span>
            </div>
          )}
          {rx.followUpDate && (
            <div>
              <span className="font-semibold text-gray-700">Recommended Follow-up: </span>
              <span className="text-blue-600 font-medium">{rx.followUpDate}</span>
            </div>
          )}
        </div>

        {/* Doctor Signature Block */}
        <div className="border-t border-gray-200 pt-8 flex justify-between items-end text-xs text-gray-400">
          <div>
            <p>Digitally verified by MediTrack Health System</p>
            <p>Valid without physical signature</p>
          </div>
          <div className="text-right">
            <div className="font-serif italic text-base text-gray-700 font-semibold mb-1">{rx.doctorName}</div>
            <div className="border-t border-gray-300 pt-1">Authorized Physician Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
}
