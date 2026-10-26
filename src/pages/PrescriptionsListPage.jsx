import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function PrescriptionsListPage() {
  const { prescriptions } = useApp();
  const [search, setSearch] = useState('');

  const filtered = prescriptions.filter((rx) => {
    const q = search.toLowerCase();
    return (
      rx.patientName.toLowerCase().includes(q) ||
      (rx.doctorName && rx.doctorName.toLowerCase().includes(q)) ||
      (rx.diagnosis && rx.diagnosis.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Prescriptions</h1>
          <p className="text-gray-500 text-sm">Review, issue, and print patient medication records</p>
        </div>
        <Link
          to="/prescriptions/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm text-center transition"
        >
          + Create New Prescription
        </Link>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
        <input
          type="text"
          placeholder="Search by patient name, doctor, or diagnosis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Prescriptions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No prescriptions found.</p>
            <Link to="/prescriptions/new" className="text-blue-600 text-sm font-medium hover:underline mt-2 inline-block">
              Issue your first prescription
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Rx #</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Diagnosis</th>
                  <th className="p-3">Medicines</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((rx) => (
                  <tr key={rx.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs font-semibold text-blue-600">{rx.id}</td>
                    <td className="p-3 font-medium text-gray-900">{rx.patientName}</td>
                    <td className="p-3 text-gray-700">{rx.doctorName}</td>
                    <td className="p-3 text-gray-600">{rx.date}</td>
                    <td className="p-3 text-gray-800 font-medium">{rx.diagnosis || 'Clinical review'}</td>
                    <td className="p-3 text-gray-600 text-xs">
                      {Array.isArray(rx.medicines)
                        ? rx.medicines.map((m) => m.name || m).join(', ')
                        : 'Medicines prescribed'}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/prescriptions/${rx.id}`}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 py-1.5 rounded transition inline-block"
                      >
                        View & Print
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
