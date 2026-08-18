import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Users,
  Settings,
  Share2,
  FileText,
  Activity,
  Maximize2,
  ShieldCheck,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';

export const TeleconsultationPage = () => {
  const { currentDoctor, currentPatient, role } = useApp();
  const navigate = useNavigate();

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [activeTab, setActiveTab] = useState('notes');

  const [clinicalNotes, setClinicalNotes] = useState(
    'Patient reports mild chest tightness after exercise. Vitals stable. Recommend ECG review and follow-up in 2 weeks.'
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Top Telehealth Control Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Encrypted Teleconsultation Room #104
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Active Call: Dr. {currentDoctor?.name?.replace('Dr. ', '') || 'Physician'} &amp; {currentPatient?.name || 'Patient'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Badge variant="success" size="sm" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 inline mr-1" /> HIPAA Encrypted
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/prescriptions/new')}
            icon={<FileText className="w-3.5 h-3.5" />}
            className="bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 font-bold text-xs"
          >
            Issue Rx
          </Button>
        </div>
      </div>

      {/* Main Video Stage & Clinical Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[580px]">
        {/* Main Video Canvas - 8 Cols */}
        <div className="lg:col-span-8 bg-slate-950 rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xl border border-slate-800">
          {/* Main Remote Feed View */}
          <div className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden bg-slate-900">
            {!isVideoOff ? (
              <img
                src={
                  role === 'doctor'
                    ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'
                    : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80'
                }
                alt="Video Participant"
                className="w-full h-full object-cover opacity-90"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-500 text-xs">
                <VideoOff className="w-10 h-10" />
                <span className="font-medium">Camera feed disabled</span>
              </div>
            )}

            {/* Remote Participant Label */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 border border-white/10 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{role === 'doctor' ? currentPatient?.name : currentDoctor?.name}</span>
            </div>

            {/* Self Picture-in-Picture (PiP) Window */}
            <div className="absolute bottom-4 right-4 w-36 h-28 sm:w-44 sm:h-32 bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <img
                src={
                  role === 'doctor'
                    ? currentDoctor?.avatar
                    : currentPatient?.avatar
                }
                alt="Self"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded-md text-[10px] text-white font-bold backdrop-blur-xs">
                You ({role})
              </div>
            </div>
          </div>

          {/* Bottom Floating Telehealth Call Action Dock */}
          <div className="flex items-center justify-center gap-3 pt-3.5">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`p-3 rounded-2xl transition-all shadow-md cursor-pointer ${
                isMicMuted ? 'bg-rose-600 text-white shadow-rose-600/30' : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
              title={isMicMuted ? 'Unmute' : 'Mute'}
            >
              {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-2xl transition-all shadow-md cursor-pointer ${
                isVideoOff ? 'bg-rose-600 text-white shadow-rose-600/30' : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
              title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>

            <button
              onClick={() => {
                setIsCallActive(false);
                navigate('/appointments');
              }}
              className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
            >
              <PhoneOff className="w-4 h-4" /> End Call
            </button>
          </div>
        </div>

        {/* Right Clinical Sidebar - 4 Cols */}
        <Card className="lg:col-span-4 p-0 flex flex-col h-full bg-white border-slate-200/90 shadow-xs overflow-hidden">
          {/* Header tabs */}
          <div className="flex items-center border-b border-slate-100 bg-slate-50/50 p-2 gap-1.5">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'notes' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Consult Notes
            </button>
            <button
              onClick={() => setActiveTab('vitals')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'vitals' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Patient Vitals
            </button>
          </div>

          {/* Tab content */}
          <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto">
            {activeTab === 'notes' ? (
              <div className="space-y-3 flex-1 flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Physician Real-Time SOAP Notes
                </span>
                <textarea
                  value={clinicalNotes}
                  onChange={e => setClinicalNotes(e.target.value)}
                  placeholder="Record observations, telemetry readings, and proposed treatments during session..."
                  className="w-full flex-1 p-3 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 outline-none resize-none font-medium leading-relaxed"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Telemetric Vitals Stream
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Heart Rate</span>
                    <strong className="text-sm font-extrabold font-mono text-slate-900 block mt-0.5">72 BPM</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Blood Pressure</span>
                    <strong className="text-sm font-extrabold font-mono text-blue-600 block mt-0.5">120/80 mmHg</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase font-bold text-slate-400">SpO2 Oxygen</span>
                    <strong className="text-sm font-extrabold font-mono text-emerald-600 block mt-0.5">99%</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Temperature</span>
                    <strong className="text-sm font-extrabold font-mono text-slate-900 block mt-0.5">98.6 &deg;F</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/patient/${currentPatient?.id || 'pat-1'}`)}
                className="text-xs font-bold"
              >
                Open Full Chart
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate('/prescriptions/new')}
                className="text-xs font-bold shadow-xs shadow-blue-500/20"
              >
                Issue Rx Slip
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
