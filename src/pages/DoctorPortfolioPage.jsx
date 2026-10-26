import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getDoctorCredentials } from '../data/doctorCredentials.js';

export function DoctorPortfolioPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors, currentDoctor } = useApp();

  // Selected doctor: from URL param, currentDoctor, or first doctor
  const doctor = (id ? doctors.find((d) => d.id === id) : null) || currentDoctor || doctors[0];

  const [activeTab, setActiveTab] = useState('credentials'); // 'credentials', 'bio', 'publications'

  if (!doctor) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">No Doctor Selected</h2>
        <Link to="/doctors" className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block text-sm">
          Browse Doctors
        </Link>
      </div>
    );
  }

  const creds = getDoctorCredentials(doctor.id, doctor);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Navigation & Doctor Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctor Credentials & Bio</h1>
          <p className="text-gray-500 text-sm">Official medical certifications, qualifications, and biography</p>
        </div>

        {/* Quick Doctor Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">Doctor:</label>
          <select
            value={doctor.id}
            onChange={(e) => navigate(`/portfolio/${e.target.value}`)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white font-medium"
          >
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.specialty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor Hero Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <img
          src={doctor.avatar || 'https://images.unsplash.com/photo-1594824813589-4081c7e997a6?w=300&auto=format&fit=crop&q=80'}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
              <p className="text-blue-600 font-semibold">{doctor.specialty} Specialist</p>
            </div>
            <Link
              to={`/book?doctor=${doctor.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition"
            >
              Book Appointment
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-600 pt-1">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">License: {creds.licenseNumber || 'MD-88412'}</span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Experience: {creds.experienceYears || 10}+ Years</span>
            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">Fee: ${doctor.consultationFee || 50}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('credentials')}
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition ${
            activeTab === 'credentials'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Credentials & Degrees
        </button>
        <button
          onClick={() => setActiveTab('bio')}
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition ${
            activeTab === 'bio'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Clinical Bio & Philosophy
        </button>
        <button
          onClick={() => setActiveTab('publications')}
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition ${
            activeTab === 'publications'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Research & Publications
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === 'credentials' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 text-base mb-3">Academic Qualifications & Degrees</h3>
              <div className="space-y-3">
                {creds.education?.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <div className="font-bold text-gray-800 text-sm">{item.degree}</div>
                    <div className="text-xs text-gray-500">{item.institution} — Year: {item.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-base mb-3">Board Certifications & Memberships</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {creds.affiliations?.map((affil, idx) => (
                  <li key={idx}>{affil}</li>
                )) || <li>Certified Medical Practitioner</li>}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'bio' && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-base">Doctor Biography & Clinical Focus</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {creds.philosophy || doctor.bio || 'Dedicated to providing top-quality clinical care, transparent medical advice, and compassionate care to patients.'}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 space-y-1">
              <p className="font-semibold">Clinic Location:</p>
              <p>{creds.clinicAddress || 'MediTrack Central Medical Center, 5th Floor'}</p>
              <p className="text-xs text-blue-600 mt-1">Languages: {creds.languages?.join(', ') || 'English'}</p>
            </div>
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-base">Published Research Papers</h3>
            <div className="space-y-3">
              {creds.publications?.map((pub, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm">{pub.title}</h4>
                  <p className="text-xs text-blue-600 mt-0.5">{pub.journal} ({pub.year})</p>
                  <p className="text-xs text-gray-400 mt-1">Citations: {pub.citations || 12} • DOI: {pub.doi || '10.1016/j.med.2024.01'}</p>
                </div>
              )) || <p className="text-sm text-gray-500">No publications listed.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
