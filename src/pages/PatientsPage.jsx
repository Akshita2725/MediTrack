import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function PatientsPage() {
  const { patients } = useApp();
  const [search, setSearch] = useState('');

  const filteredPatients = patients.filter((patient) => {
    const q = search.toLowerCase();
    return (
      patient.name.toLowerCase().includes(q) ||
      (patient.contact && patient.contact.toLowerCase().includes(q)) ||
      (patient.medicalHistory && patient.medicalHistory.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patients Directory</h1>
          <p className="text-gray-500 text-sm">View registered patients and their medical records</p>
        </div>
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm text-center transition"
        >
          + Register New Patient
        </Link>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center">
        <input
          type="text"
          placeholder="Search patient by name, phone or medical condition..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredPatients.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No patients found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Age / Gender</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Blood Group</th>
                  <th className="p-3">Medical History</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-semibold text-gray-900">{patient.name}</div>
                      <div className="text-xs text-gray-400">{patient.email || 'No email provided'}</div>
                    </td>
                    <td className="p-3 text-gray-700">
                      {patient.age} yrs / {patient.gender || 'N/A'}
                    </td>
                    <td className="p-3 text-gray-600">{patient.contact || 'N/A'}</td>
                    <td className="p-3">
                      <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-xs font-semibold">
                        {patient.bloodGroup || 'O+'}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600 max-w-xs truncate">
                      {patient.medicalHistory || 'None'}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <Link
                        to={`/patient/${patient.id}`}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded transition inline-block font-medium"
                      >
                        Profile
                      </Link>
                      <Link
                        to={`/book`}
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded transition inline-block font-medium"
                      >
                        Book
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
