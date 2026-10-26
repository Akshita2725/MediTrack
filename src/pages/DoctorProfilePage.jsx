import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getDoctorCredentials } from '../data/doctorCredentials.js';

export function DoctorProfilePage() {
  const { id } = useParams();
  const { doctors } = useApp();

  const doctor = doctors.find((d) => d.id === id) || doctors[0];

  if (!doctor) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Doctor Not Found</h2>
        <Link to="/doctors" className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block text-sm">
          Back to Doctors
        </Link>
      </div>
    );
  }

  const credentials = getDoctorCredentials(doctor.id, doctor);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link to="/doctors" className="text-sm text-blue-600 hover:underline">
          &larr; Back to all doctors
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start">
        <img
          src={doctor.avatar || 'https://images.unsplash.com/photo-1594824813589-4081c7e997a6?w=300&auto=format&fit=crop&q=80'}
          alt={doctor.name}
          className="w-28 h-28 rounded-xl object-cover border border-gray-200"
        />

        <div className="flex-1 space-y-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
            <p className="text-blue-600 font-medium text-base">{doctor.specialty}</p>
            <p className="text-sm text-gray-500">{doctor.qualification || 'MBBS, MD'}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <div>
              <span className="text-gray-400">Experience: </span>
              <span className="font-semibold">{doctor.experience || `${credentials.experienceYears || 10}+ Years`}</span>
            </div>
            <div>
              <span className="text-gray-400">Consultation: </span>
              <span className="font-semibold text-green-700">${doctor.consultationFee || 50}</span>
            </div>
            <div>
              <span className="text-gray-400">License: </span>
              <span className="font-semibold">{credentials.licenseNumber || 'LIC-1092-MD'}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              to={`/book?doctor=${doctor.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Book Appointment
            </Link>
            <Link
              to={`/portfolio/${doctor.id}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Credentials & Portfolio &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Bio / Philosophy */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
        <h2 className="text-lg font-bold text-gray-800">Doctor's Bio & Philosophy</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {credentials.philosophy || doctor.bio || 'Dedicated to delivering empathetic and evidence-based patient healthcare.'}
        </p>
      </div>

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="text-base font-bold text-gray-800">Education & Training</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {credentials.education?.map((item, idx) => (
              <li key={idx} className="border-l-2 border-blue-500 pl-3">
                <div className="font-semibold text-gray-800">{item.degree}</div>
                <div className="text-xs text-gray-500">{item.institution} ({item.year})</div>
              </li>
            )) || <li>MBBS, MD from Medical University</li>}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="text-base font-bold text-gray-800">Clinic & Contact</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <p className="text-xs text-gray-400">Clinic Address</p>
              <p className="font-medium">{credentials.clinicAddress || 'MediTrack Central Medical Center, Suite 400'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Languages Spoken</p>
              <p className="font-medium">{credentials.languages?.join(', ') || 'English'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Working Hours</p>
              <p className="font-medium">{doctor.availability || 'Monday - Friday (9:00 AM - 5:00 PM)'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
