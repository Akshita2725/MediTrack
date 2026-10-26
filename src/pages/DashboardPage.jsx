import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function DashboardPage() {
  const { appointments, doctors, patients, activeQueue, updateAppointmentStatus } = useApp();

  // Simple statistics
  const totalAppointments = appointments.length;
  const totalDoctors = doctors.length;
  const totalPatients = patients.length;
  const inQueue = activeQueue.length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-blue-600 text-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">MediTrack Clinic Dashboard</h1>
          <p className="text-blue-100 text-sm mt-1">Simple healthcare and appointment management system</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/book"
            className="bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            + Book Appointment
          </Link>
          <Link
            to="/register"
            className="bg-blue-700 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            + New Patient
          </Link>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Doctors</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{totalDoctors}</p>
          <Link to="/doctors" className="text-xs text-blue-600 hover:underline mt-2 inline-block">View all &rarr;</Link>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Patients</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{totalPatients}</p>
          <Link to="/patients" className="text-xs text-blue-600 hover:underline mt-2 inline-block">View all &rarr;</Link>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{totalAppointments}</p>
          <Link to="/appointments" className="text-xs text-blue-600 hover:underline mt-2 inline-block">View all &rarr;</Link>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Waiting in Queue</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{inQueue}</p>
          <span className="text-xs text-gray-400 mt-2 inline-block">Active today</span>
        </div>
      </div>

      {/* Active Patient Queue Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-800 text-lg">Today's Patient Queue ({activeQueue.length})</h2>
          <Link to="/appointments" className="text-sm text-blue-600 hover:underline font-medium">
            Manage All Appointments
          </Link>
        </div>

        {activeQueue.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No patients currently waiting in queue.</p>
            <Link to="/book" className="text-blue-600 font-medium hover:underline text-sm mt-2 inline-block">
              Book a new consultation
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-3">Token #</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeQueue.slice(0, 6).map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold text-blue-600">#{apt.queueNumber}</td>
                    <td className="p-3 font-medium text-gray-900">{apt.patientName}</td>
                    <td className="p-3 text-gray-700">{apt.doctorName}</td>
                    <td className="p-3 text-gray-600">{apt.time}</td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                        {apt.consultationType || 'In-Person'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        apt.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-2.5 py-1.5 rounded transition"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-2.5 py-1.5 rounded transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/prescriptions/new" className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow transition block">
          <h3 className="font-semibold text-gray-800">Write Prescription</h3>
          <p className="text-xs text-gray-500 mt-1">Generate and print patient prescriptions easily</p>
        </Link>
        <Link to="/teleconsult" className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow transition block">
          <h3 className="font-semibold text-gray-800">Teleconsultation</h3>
          <p className="text-xs text-gray-500 mt-1">Start video or audio consultation with a patient</p>
        </Link>
        <Link to="/pharmacy" className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow transition block">
          <h3 className="font-semibold text-gray-800">Pharmacy Store</h3>
          <p className="text-xs text-gray-500 mt-1">Browse clinic medicines and order products</p>
        </Link>
      </div>
    </div>
  );
}
