import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function AppointmentsPage() {
  const { appointments, updateAppointmentStatus } = useApp();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Filter appointments by status and search text
  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = filter === 'All' || apt.status === filter;
    const matchesSearch =
      apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      (apt.symptoms && apt.symptoms.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-500 text-sm">View, track, and update patient appointments</p>
        </div>
        <Link
          to="/book"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm text-center transition"
        >
          + Book New Appointment
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
        <input
          type="text"
          placeholder="Search by patient or doctor name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Status filter buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['All', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List / Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No appointments found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Queue</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Symptoms</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-blue-600">#{apt.queueNumber}</td>
                    <td className="p-3 font-medium text-gray-900">{apt.patientName}</td>
                    <td className="p-3 text-gray-700">{apt.doctorName}</td>
                    <td className="p-3 text-gray-600">
                      <div>{apt.date}</div>
                      <div className="text-xs text-gray-400">{apt.time}</div>
                    </td>
                    <td className="p-3 text-gray-600 max-w-xs truncate">{apt.symptoms || 'General Checkup'}</td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          apt.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : apt.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : apt.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        value={apt.status}
                        onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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
