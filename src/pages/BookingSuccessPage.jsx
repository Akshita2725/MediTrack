import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { appointments } = useApp();

  const appointmentId = searchParams.get('id');
  const appointment = appointments.find((a) => a.id === appointmentId) || appointments[appointments.length - 1];

  if (!appointment) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">No Booking Found</h2>
        <Link to="/appointments" className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block text-sm">
          Go to Appointments
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Success Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Appointment Confirmed!</h1>
        <p className="text-gray-500 text-sm">Your consultation has been successfully booked and added to the queue.</p>

        {/* Token Badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs uppercase text-blue-700 font-semibold tracking-wide">Queue Token Number</p>
          <p className="text-4xl font-extrabold text-blue-600 mt-1">#{appointment.queueNumber || 1}</p>
        </div>

        {/* Details list */}
        <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 text-sm border border-gray-100">
          <div className="flex justify-between">
            <span className="text-gray-500">Patient:</span>
            <span className="font-semibold text-gray-800">{appointment.patientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Doctor:</span>
            <span className="font-semibold text-gray-800">{appointment.doctorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date & Time:</span>
            <span className="font-semibold text-gray-800">{appointment.date} at {appointment.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Consultation Type:</span>
            <span className="font-semibold text-blue-600">{appointment.consultationType || 'In-Person'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Reason / Symptoms:</span>
            <span className="font-semibold text-gray-800">{appointment.symptoms || 'General Checkup'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium transition"
          >
            Print Slip
          </button>
          <button
            onClick={() => navigate('/appointments')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
          >
            View Appointments
          </button>
        </div>
      </div>
    </div>
  );
}
