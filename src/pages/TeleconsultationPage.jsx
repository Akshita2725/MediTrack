import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export function TeleconsultationPage() {
  const { doctors, patients } = useApp();
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [inCall, setInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [clinicalNotes, setClinicalNotes] = useState('');

  const activeDoc = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];
  const activePat = patients.find((p) => p.id === selectedPatientId) || patients[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Teleconsultation Room</h1>
          <p className="text-gray-500 text-sm">Simulated encrypted video call between doctor and patient</p>
        </div>
        <Link
          to="/prescriptions/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm text-center transition"
        >
          + Write Prescription
        </Link>
      </div>

      {!inCall ? (
        /* Pre-Call Setup Screen */
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-lg mx-auto text-center space-y-5">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            📹
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Start Video Consultation</h2>
            <p className="text-gray-500 text-sm mt-1">Select participants and enter the virtual clinic room</p>
          </div>

          <div className="space-y-3 text-left">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Doctor</label>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Patient</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.age} yrs)</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setInCall(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg text-sm transition"
          >
            Connect Call Now
          </button>
        </div>
      ) : (
        /* Active Call Screen */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-800 shadow-lg">
              {/* Doctor Main View */}
              {isVideoOff ? (
                <div className="text-center text-slate-400">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-slate-300 mb-2">
                    {activeDoc?.name?.charAt(0) || 'D'}
                  </div>
                  <p className="font-medium text-slate-300">{activeDoc?.name}</p>
                  <p className="text-xs text-slate-500">Camera turned off</p>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={activeDoc?.avatar || 'https://images.unsplash.com/photo-1594824813589-4081c7e997a6?w=600&auto=format&fit=crop&q=80'}
                    alt={activeDoc?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    🟢 Live: {activeDoc?.name} ({activeDoc?.specialty})
                  </div>
                </div>
              )}

              {/* Patient PiP (Picture in Picture) */}
              <div className="absolute bottom-4 right-4 w-32 sm:w-40 aspect-video bg-slate-800 border-2 border-white/20 rounded-xl overflow-hidden shadow-md">
                <img
                  src={activePat?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80'}
                  alt={activePat?.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-2 text-[10px] text-white bg-black/50 px-1 rounded">
                  {activePat?.name}
                </span>
              </div>
            </div>

            {/* In-Call Controls Bar */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-center gap-4 shadow-sm">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  isMuted ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isMuted ? 'Unmute Mic' : 'Mute Mic'}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  isVideoOff ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
              </button>

              <button
                onClick={() => setInCall(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition"
              >
                End Consultation
              </button>
            </div>
          </div>

          {/* Consultation Notes Sidebar */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-gray-800 text-base">Session Notes</h2>
            <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded-lg">
              <p><span className="font-semibold text-gray-700">Patient:</span> {activePat?.name} ({activePat?.age} yrs)</p>
              <p><span className="font-semibold text-gray-700">Doctor:</span> {activeDoc?.name}</p>
              <p><span className="font-semibold text-gray-700">Status:</span> Connected via HD Audio/Video</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Doctor's Live Consultation Notes</label>
              <textarea
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                rows={6}
                placeholder="Type symptoms discussed, blood pressure reported, observations..."
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Link
              to="/prescriptions/new"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs text-center block transition"
            >
              Open Prescription Pad
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
