import React from 'react';
import { UserCheck, Stethoscope, User } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export const RoleSwitcher = () => {
  const {
    role,
    setRole,
    doctors,
    currentDoctorId,
    setCurrentDoctorId,
    patients,
    currentPatientId,
    setCurrentPatientId
  } = useApp();

  return (
    <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/90">
      {/* 3 Role Selection Segment Pills */}
      <div className="grid grid-cols-3 gap-1 bg-white p-0.5 rounded-xl shadow-2xs border border-slate-200/70">
        <button
          onClick={() => setRole('receptionist')}
          className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
            role === 'receptionist'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Receptionist</span>
          <span className="sm:hidden">Staff</span>
        </button>

        <button
          onClick={() => setRole('doctor')}
          className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
            role === 'doctor'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Doctor</span>
        </button>

        <button
          onClick={() => setRole('patient')}
          className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
            role === 'patient'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Patient</span>
        </button>
      </div>

      {/* Role specific profile selector dropdown */}
      {role === 'doctor' && (
        <div className="flex items-center gap-1.5 pl-1">
          <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap hidden lg:inline">
            Active:
          </span>
          <select
            value={currentDoctorId}
            onChange={e => setCurrentDoctorId(e.target.value)}
            className="text-xs font-bold bg-white text-slate-800 border border-slate-200/90 rounded-xl px-2.5 py-1.5 shadow-2xs outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer max-w-[150px] sm:max-w-[200px] truncate"
          >
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>
        </div>
      )}

      {role === 'patient' && (
        <div className="flex items-center gap-1.5 pl-1">
          <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap hidden lg:inline">
            Active:
          </span>
          <select
            value={currentPatientId}
            onChange={e => setCurrentPatientId(e.target.value)}
            className="text-xs font-bold bg-white text-slate-800 border border-slate-200/90 rounded-xl px-2.5 py-1.5 shadow-2xs outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer max-w-[150px] sm:max-w-[200px] truncate"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} (Age {p.age})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
