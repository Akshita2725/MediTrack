import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function DoctorsPage() {
  const { doctors, activeQueue, updateDoctorDutyStatus } = useApp();
  const [search, setSearch] = useState('');
  const [dutyFilter, setDutyFilter] = useState('All');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  // Helper to safely format availability object or string without React child crash
  const formatAvailability = (avail) => {
    if (!avail) return '09:00 AM - 04:00 PM (Mon - Fri)';
    if (typeof avail === 'string') return avail;
    const hours = avail.hours || '09:00 AM - 04:00 PM';
    const days = Array.isArray(avail.days) ? avail.days.join(', ') : (avail.days || 'Mon - Fri');
    return `${hours} • ${days}`;
  };

  // Helper to get doctor duty status with sensible initial defaults
  const getDutyStatus = (doc) => {
    if (doc.dutyStatus) return doc.dutyStatus;
    const num = parseInt(doc.id?.replace(/\D/g, '') || '1', 10);
    if (num % 3 === 0) return 'In Consultation';
    if (num % 5 === 0) return 'Off Duty';
    return 'On Duty';
  };

  // Collect unique specialties
  const specialties = ['All', ...new Set(doctors.map((d) => d.specialty).filter(Boolean))];

  // Counts for summary bar
  const onDutyCount = doctors.filter((d) => getDutyStatus(d) === 'On Duty').length;
  const inConsultCount = doctors.filter((d) => getDutyStatus(d) === 'In Consultation').length;
  const offDutyCount = doctors.filter((d) => getDutyStatus(d) === 'Off Duty').length;

  const filteredDoctors = doctors.filter((doc) => {
    const status = getDutyStatus(doc);
    const matchesDuty = dutyFilter === 'All' || status === dutyFilter;
    const matchesSpec = specialtyFilter === 'All' || doc.specialty === specialtyFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      doc.name.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      (doc.clinicAddress && doc.clinicAddress.toLowerCase().includes(q));

    return matchesDuty && matchesSpec && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctors On Duty</h1>
          <p className="text-gray-500 text-sm">Real-time physician duty status, room allocation, and consultation queue</p>
        </div>
        <Link
          to="/book"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition text-center shadow-sm"
        >
          + Book Consultation
        </Link>
      </div>

      {/* Duty Roster Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setDutyFilter('All')}
          className={`p-3 rounded-xl border text-left transition ${
            dutyFilter === 'All' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-100 hover:bg-gray-50'
          }`}
        >
          <span className="text-xs text-gray-500 block">Total Roster</span>
          <span className="text-xl font-bold text-gray-800">{doctors.length} Doctors</span>
        </button>

        <button
          onClick={() => setDutyFilter('On Duty')}
          className={`p-3 rounded-xl border text-left transition ${
            dutyFilter === 'On Duty' ? 'bg-green-50 border-green-300' : 'bg-white border-gray-100 hover:bg-gray-50'
          }`}
        >
          <span className="text-xs text-green-700 font-medium block">🟢 On Duty / Available</span>
          <span className="text-xl font-bold text-green-800">{onDutyCount} Ready</span>
        </button>

        <button
          onClick={() => setDutyFilter('In Consultation')}
          className={`p-3 rounded-xl border text-left transition ${
            dutyFilter === 'In Consultation' ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-100 hover:bg-gray-50'
          }`}
        >
          <span className="text-xs text-amber-700 font-medium block">🟡 In Consultation</span>
          <span className="text-xl font-bold text-amber-800">{inConsultCount} Busy</span>
        </button>

        <button
          onClick={() => setDutyFilter('Off Duty')}
          className={`p-3 rounded-xl border text-left transition ${
            dutyFilter === 'Off Duty' ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-100 hover:bg-gray-50'
          }`}
        >
          <span className="text-xs text-gray-500 block">⚪ Off Duty / Leave</span>
          <span className="text-xl font-bold text-gray-700">{offDutyCount} Out</span>
        </button>
      </div>

      {/* Search and Specialty Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search by doctor name, specialty, room..."
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
      {filteredDoctors.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-gray-100 text-center text-gray-500">
          <p>No doctors found matching the selected filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setDutyFilter('All');
              setSpecialtyFilter('All');
            }}
            className="text-blue-600 text-sm font-semibold hover:underline mt-2 inline-block"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => {
            const status = getDutyStatus(doc);
            const waitingForDoc = activeQueue.filter((a) => a.doctorId === doc.id).length;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
              >
                <div className="p-5 space-y-4">
                  {/* Doctor Info & Status Badge */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={doc.avatar || 'https://images.unsplash.com/photo-1594824813589-4081c7e997a6?w=300&auto=format&fit=crop&q=80'}
                        alt={doc.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                          status === 'On Duty'
                            ? 'bg-green-500'
                            : status === 'In Consultation'
                            ? 'bg-amber-500'
                            : 'bg-gray-400'
                        }`}
                        title={status}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold text-gray-800 text-base">{doc.name}</h2>
                      </div>
                      <p className="text-blue-600 text-sm font-medium">{doc.specialty}</p>
                      <p className="text-xs text-gray-400">{doc.qualification || 'MBBS, MD'}</p>
                    </div>
                  </div>

                  {/* Status & Queue Details Box */}
                  <div className="text-xs space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-medium">Duty Status:</span>
                      <select
                        value={status}
                        onChange={(e) => {
                          if (updateDoctorDutyStatus) {
                            updateDoctorDutyStatus(doc.id, e.target.value);
                          }
                        }}
                        className={`text-xs font-semibold rounded px-2 py-1 border bg-white cursor-pointer ${
                          status === 'On Duty'
                            ? 'text-green-700 border-green-200'
                            : status === 'In Consultation'
                            ? 'text-amber-700 border-amber-200'
                            : 'text-gray-600 border-gray-200'
                        }`}
                      >
                        <option value="On Duty">🟢 On Duty</option>
                        <option value="In Consultation">🟡 In Consultation</option>
                        <option value="Off Duty">⚪ Off Duty</option>
                      </select>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Queue Load:</span>
                      <span className={`font-semibold ${waitingForDoc > 0 ? 'text-amber-600' : 'text-gray-600'}`}>
                        {waitingForDoc} {waitingForDoc === 1 ? 'patient' : 'patients'} waiting
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Clinic Room:</span>
                      <span className="font-medium text-gray-700 truncate max-w-[170px]" title={doc.clinicAddress || 'Suite 201'}>
                        {doc.clinicAddress || 'OPD Suite 201'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Shift / Hours:</span>
                      <span className="font-medium text-gray-700 truncate max-w-[170px]" title={formatAvailability(doc.availability)}>
                        {formatAvailability(doc.availability)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Consultation Fee:</span>
                      <span className="font-semibold text-green-700">${doc.consultationFee || doc.fee || 50}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                  <Link
                    to={`/doctor/${doc.id}`}
                    className="flex-1 text-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium py-2 rounded-lg transition"
                  >
                    Profile & Bio
                  </Link>
                  <Link
                    to={`/book?doctor=${doc.id}`}
                    className={`flex-1 text-center text-xs font-semibold py-2 rounded-lg transition ${
                      status === 'Off Duty'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {status === 'Off Duty' ? 'Off Duty' : 'Book Now'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
