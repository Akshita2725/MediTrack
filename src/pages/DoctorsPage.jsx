import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function DoctorsPage() {
  const { doctors } = useApp();
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  // Collect unique specialties
  const specialties = ['All', ...new Set(doctors.map((d) => d.specialty).filter(Boolean))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = specialtyFilter === 'All' || doc.specialty === specialtyFilter;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Our Doctors</h1>
          <p className="text-gray-500 text-sm">Qualified medical practitioners and specialists</p>
        </div>
        <Link
          to="/book"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition text-center"
        >
          Book Consultation
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search by doctor name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSpecialtyFilter(spec)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
                specialtyFilter === spec
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={doc.avatar || 'https://images.unsplash.com/photo-1594824813589-4081c7e997a6?w=300&auto=format&fit=crop&q=80'}
                  alt={doc.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h2 className="font-bold text-gray-800 text-base">{doc.name}</h2>
                  <p className="text-blue-600 text-sm font-medium">{doc.specialty}</p>
                  <p className="text-xs text-gray-400">{doc.qualification || 'MBBS, MD'}</p>
                </div>
              </div>

              <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience:</span>
                  <span className="font-medium text-gray-700">{doc.experience || '8+ years'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Consultation Fee:</span>
                  <span className="font-semibold text-green-700">${doc.consultationFee || 50}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Availability:</span>
                  <span className="font-medium text-gray-700">{doc.availability || 'Mon - Fri'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <Link
                to={`/doctor/${doc.id}`}
                className="flex-1 text-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium py-2 rounded-lg transition"
              >
                Profile & Bio
              </Link>
              <Link
                to={`/book?doctor=${doc.id}`}
                className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
