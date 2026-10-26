import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function PatientProfilePage() {
  const { id } = useParams();
  const { patients, appointments, prescriptions } = useApp();

  const patient = patients.find((p) => p.id === id) || patients[0];

  if (!patient) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Patient Not Found</h2>
        <Link to="/patients" className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block text-sm">
          Back to Patients
        </Link>
      </div>
    );
  }

  // Patient's history
  const patientAppointments = appointments.filter((a) => a.patientId === patient.id || a.patientName === patient.name);
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === patient.id || p.patientName === patient.name);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link to="/patients" className="text-sm text-blue-600 hover:underline">
          &larr; Back to all patients
        </Link>
      </div>

      {/* Patient Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {patient.age} Years Old • {patient.gender || 'Not specified'} • Blood Group: <span className="text-red-600 font-semibold">{patient.bloodGroup || 'O+'}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/book"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            + Book Visit
          </Link>
          <Link
            to="/prescriptions/new"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            + Write Rx
          </Link>
        </div>
      </div>

      {/* Basic Info & Medical History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
          <h2 className="font-bold text-gray-800 text-base">Contact Information</h2>
          <div className="text-sm space-y-2 text-gray-600">
            <div><span className="text-gray-400">Phone:</span> {patient.contact || 'N/A'}</div>
            <div><span className="text-gray-400">Email:</span> {patient.email || 'N/A'}</div>
            <div><span className="text-gray-400">Emergency Contact:</span> {patient.emergencyContact || 'Family member'}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
          <h2 className="font-bold text-gray-800 text-base">Medical History & Allergies</h2>
          <div className="text-sm space-y-2 text-gray-600">
            <div>
              <span className="text-gray-400">Known Allergies: </span>
              <span className="text-red-600 font-medium">
                {Array.isArray(patient.allergies) ? patient.allergies.join(', ') : (patient.allergies || 'None known')}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Medical Notes: </span>
              {patient.medicalHistory || 'No prior chronic conditions recorded'}
            </div>
          </div>
        </div>
      </div>

      {/* Appointments History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
        <h2 className="font-bold text-gray-800 text-base">Past & Upcoming Appointments ({patientAppointments.length})</h2>
        {patientAppointments.length === 0 ? (
          <p className="text-sm text-gray-500">No appointments recorded for this patient.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-2">Date & Time</th>
                  <th className="p-2">Doctor</th>
                  <th className="p-2">Symptoms</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {patientAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td className="p-2 font-medium text-gray-800">{apt.date} at {apt.time}</td>
                    <td className="p-2 text-gray-700">{apt.doctorName}</td>
                    <td className="p-2 text-gray-600">{apt.symptoms || 'General'}</td>
                    <td className="p-2">
                      <span className="text-xs px-2 py-0.5 rounded font-medium bg-blue-50 text-blue-700">
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Prescriptions History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
        <h2 className="font-bold text-gray-800 text-base">Prescriptions ({patientPrescriptions.length})</h2>
        {patientPrescriptions.length === 0 ? (
          <p className="text-sm text-gray-500">No prescriptions issued yet.</p>
        ) : (
          <div className="space-y-3">
            {patientPrescriptions.map((rx) => (
              <div key={rx.id} className="p-3 border border-gray-100 rounded-lg bg-gray-50 flex justify-between items-center text-sm">
                <div>
                  <div className="font-semibold text-gray-800">{rx.diagnosis || 'Diagnosis recorded'}</div>
                  <div className="text-xs text-gray-500">By {rx.doctorName} on {rx.date}</div>
                </div>
                <Link
                  to={`/prescriptions/${rx.id}`}
                  className="text-xs bg-white border border-gray-300 hover:bg-gray-100 text-blue-600 font-medium px-3 py-1.5 rounded transition"
                >
                  View Prescription &rarr;
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
