import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Video,
  ArrowRight,
  TrendingUp,
  Stethoscope,
  Heart,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  Phone,
  UserCheck,
  Search,
  Activity,
  Award,
  MoreVertical,
  Flame,
  Droplet,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Card } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Button } from '../components/common/Button.jsx';
import { useLiveDateTime } from '../hooks/useLiveDateTime.js';
import { getWeekScheduleDays, formatClinicalDate } from '../utils/dateUtils.js';

export const DashboardPage = () => {
  const {
    role,
    currentDoctor,
    currentPatient,
    appointments,
    activeQueue,
    completedAppointments,
    prescriptions,
    followUps,
    updateAppointmentStatus,
    searchQuery
  } = useApp();

  const navigate = useNavigate();
  const { dateFormatted, timeFormatted, isoDate } = useLiveDateTime();

  // Selected schedule date in week strip (defaults to today ISO)
  const [selectedDayIso, setSelectedDayIso] = useState(isoDate);

  // Calculate dynamic 6-day week strip relative to today
  const scheduleDays = useMemo(() => {
    return getWeekScheduleDays(new Date());
  }, []);

  // Filtered Appointments based on global search & active role
  const relevantAppointments = useMemo(() => {
    let list = appointments;

    if (role === 'doctor' && currentDoctor) {
      list = list.filter(a => a.doctorId === currentDoctor.id);
    } else if (role === 'patient' && currentPatient) {
      list = list.filter(a => a.patientId === currentPatient.id);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        a =>
          a.patientName.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q) ||
          a.doctorSpecialty.toLowerCase().includes(q) ||
          a.symptoms.toLowerCase().includes(q)
      );
    }

    return list;
  }, [appointments, role, currentDoctor, currentPatient, searchQuery]);

  // Consultations for the chosen day in the schedule pill strip
  const dayScheduleAppointments = useMemo(() => {
    const list = relevantAppointments.filter(a => a.date === selectedDayIso);
    return list.length > 0 ? list : relevantAppointments.slice(0, 3);
  }, [relevantAppointments, selectedDayIso]);

  // Real-time Queue stats
  const inConsultationApt = appointments.find(a => a.status === 'In Consultation');
  const waitingApts = activeQueue.filter(a => a.status === 'Waiting');

  // Status transitions
  const handleStartConsultation = (aptId) => {
    if (inConsultationApt && inConsultationApt.id !== aptId) {
      updateAppointmentStatus(inConsultationApt.id, 'Completed');
    }
    updateAppointmentStatus(aptId, 'In Consultation');
  };

  const handleMarkCompleted = (aptId) => {
    updateAppointmentStatus(aptId, 'Completed');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Dynamic Top Clinic Status Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-7 text-white shadow-lg border border-slate-800 relative overflow-hidden">
        {/* Ambient background light flare */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -top-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Clinic Status
              </span>
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> {dateFormatted} &bull; {timeFormatted}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {role === 'receptionist' && 'Reception & Triage Queue Board'}
              {role === 'doctor' && `Physician Workspace: ${currentDoctor?.name}`}
              {role === 'patient' && `Patient Health Hub: ${currentPatient?.name}`}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl font-normal leading-relaxed">
              {role === 'receptionist' &&
                'Real-time patient intake monitoring, exam room assignment, physician coordination, and appointment check-in.'}
              {role === 'doctor' &&
                `Active Specialty: ${currentDoctor?.specialty}. Review clinical schedules, inspect vital signs, and issue digital prescriptions.`}
              {role === 'patient' &&
                `Manage upcoming visits with Dr. ${currentDoctor?.name?.replace('Dr. ', '') || 'Specialist'}, refill active pharmacotherapy, and enter telemedicine sessions.`}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {role === 'receptionist' && (
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/book')}
                icon={<Plus className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-500/30"
              >
                Intake Patient
              </Button>
            )}
            {role === 'doctor' && (
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/prescriptions/new')}
                icon={<FileText className="w-4 h-4" />}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/30 border-none"
              >
                Write Rx Order
              </Button>
            )}
            {role === 'patient' && (
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/book')}
                icon={<CalendarIcon className="w-4 h-4" />}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md shadow-purple-500/30 border-none"
              >
                Book Appointment
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Core Vital Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4.5 bg-white hover:border-amber-300/80 transition-all flex items-center justify-between shadow-[0_1px_3px_rgba(15,23,42,0.04)]" hover>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Waiting Queue</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold font-mono text-slate-900">{activeQueue.length}</span>
              <span className="text-[11px] font-bold text-amber-600 px-1.5 py-0.5 rounded-md bg-amber-50">Active In Line</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shadow-2xs">
            <Clock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4.5 bg-white hover:border-emerald-300/80 transition-all flex items-center justify-between shadow-[0_1px_3px_rgba(15,23,42,0.04)]" hover>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Completed Today</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold font-mono text-slate-900">{completedAppointments.length}</span>
              <span className="text-[11px] font-bold text-emerald-600 px-1.5 py-0.5 rounded-md bg-emerald-50">Discharged</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4.5 bg-white hover:border-purple-300/80 transition-all flex items-center justify-between shadow-[0_1px_3px_rgba(15,23,42,0.04)]" hover>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Rx Issued</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold font-mono text-slate-900">{prescriptions.length}</span>
              <span className="text-[11px] font-bold text-purple-600 px-1.5 py-0.5 rounded-md bg-purple-50">Active Orders</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4.5 bg-white hover:border-cyan-300/80 transition-all flex items-center justify-between shadow-[0_1px_3px_rgba(15,23,42,0.04)]" hover>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Pending Reviews</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold font-mono text-slate-900">
                {followUps.filter(f => f.status === 'Pending').length}
              </span>
              <span className="text-[11px] font-bold text-cyan-600 px-1.5 py-0.5 rounded-md bg-cyan-50">Follow-ups</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center shadow-2xs">
            <AlertCircle className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Main 12-Column High-Density Clinical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Active Patient Queue & Live Triage Flow */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Queue Table Card */}
          <Card className="p-0 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500/50" />
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  {role === 'receptionist' && 'Active Intake & Exam Room Queue'}
                  {role === 'doctor' && `Patients Scheduled for Dr. ${currentDoctor?.name?.replace('Dr. ', '')}`}
                  {role === 'patient' && 'My Active & Upcoming Consultations'}
                </h3>
              </div>
              <Badge variant="primary" size="sm">
                {relevantAppointments.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled').length} in line
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 text-slate-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200/80">
                  <tr>
                    <th className="py-3 px-4">Q#</th>
                    <th className="py-3 px-4">Patient / Symptoms</th>
                    <th className="py-3 px-4">Attending Doctor</th>
                    <th className="py-3 px-4">Time & Mode</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {relevantAppointments
                    .filter(a => a.status !== 'Completed' && a.status !== 'Cancelled')
                    .map((apt) => {
                      const isConsulting = apt.status === 'In Consultation';
                      return (
                        <tr
                          key={apt.id}
                          className={`hover:bg-slate-50 transition-colors ${
                            isConsulting ? 'bg-blue-50/50 font-medium' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                            <span className="px-2 py-1 bg-slate-100 rounded-md text-slate-800 border border-slate-200">
                              #{apt.queueNumber.toString().padStart(2, '0')}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{apt.patientName}</div>
                            <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{apt.symptoms}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{apt.doctorName}</div>
                            <div className="text-[10px] font-medium text-slate-400">{apt.doctorSpecialty}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold font-mono text-slate-700">{apt.time}</div>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold inline-block mt-0.5 ${
                                apt.consultationType === 'Tele-Consultation'
                                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {apt.consultationType}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {role === 'receptionist' ? (
                              <select
                                value={apt.status}
                                onChange={e => updateAppointmentStatus(apt.id, e.target.value)}
                                className="text-[11px] font-bold bg-white text-slate-800 border border-slate-200 rounded-lg px-2 py-1 shadow-2xs outline-none focus:border-blue-500 cursor-pointer"
                              >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Waiting">Waiting</option>
                                <option value="In Consultation">In Consultation</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <Badge
                                variant={
                                  apt.status === 'In Consultation'
                                    ? 'primary'
                                    : apt.status === 'Waiting'
                                    ? 'warning'
                                    : 'default'
                                }
                                size="sm"
                                dot={true}
                              >
                                {apt.status}
                              </Badge>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                            {role === 'doctor' && apt.status === 'Waiting' && (
                              <Button
                                size="xs"
                                variant="primary"
                                onClick={() => handleStartConsultation(apt.id)}
                                icon={<Play className="w-3 h-3" />}
                              >
                                Call In
                              </Button>
                            )}
                            {role === 'doctor' && apt.status === 'In Consultation' && (
                              <Button
                                size="xs"
                                variant="success"
                                onClick={() => handleMarkCompleted(apt.id)}
                                icon={<CheckCircle2 className="w-3 h-3" />}
                              >
                                Finish
                              </Button>
                            )}
                            {apt.consultationType === 'Tele-Consultation' && (
                              <Button
                                size="xs"
                                variant="purple"
                                onClick={() => navigate('/teleconsultation')}
                                icon={<Video className="w-3 h-3" />}
                              >
                                Video
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              {relevantAppointments.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled').length === 0 && (
                <div className="p-10 text-center text-slate-400 text-xs font-medium">
                  All consultations for this view have been completed or none are scheduled.
                </div>
              )}
            </div>
          </Card>

          {/* Interactive Heart Rate & Vital Waveform Card */}
          <Card className="p-5 bg-slate-950 text-white rounded-3xl overflow-hidden relative shadow-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                  Telemetry Live Sensor &bull; Exam Room #1
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                Connected &bull; 60 Hz
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Resting Pulse</span>
                <div className="text-xl font-extrabold font-mono text-rose-400 mt-0.5 flex items-baseline gap-1">
                  72 <span className="text-[11px] font-normal text-slate-400">BPM</span>
                </div>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Blood Pressure</span>
                <div className="text-xl font-extrabold font-mono text-cyan-400 mt-0.5 flex items-baseline gap-1">
                  120/80 <span className="text-[11px] font-normal text-slate-400">mmHg</span>
                </div>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">SpO2 Oxygen</span>
                <div className="text-xl font-extrabold font-mono text-emerald-400 mt-0.5 flex items-baseline gap-1">
                  99% <span className="text-[11px] font-normal text-slate-400">Sat</span>
                </div>
              </div>
            </div>

            {/* SVG ECG Waveform Path */}
            <div className="h-16 w-full bg-slate-900/80 rounded-xl p-2 flex items-center border border-slate-800/80">
              <svg className="w-full h-full text-emerald-400" viewBox="0 0 500 50" preserveAspectRatio="none">
                <path
                  d="M 0,25 L 60,25 L 70,10 L 80,40 L 90,5 L 100,30 L 110,25 L 200,25 L 210,10 L 220,40 L 230,5 L 240,30 L 250,25 L 340,25 L 350,10 L 360,40 L 370,5 L 380,30 L 390,25 L 500,25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Card>
        </div>

        {/* Right 4 Cols: High-Density Doctor Profile & Schedule Strip */}
        <div className="lg:col-span-4 space-y-6">
          {/* Doctor Spotlight Card */}
          <Card className="p-5 bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <img
                src={
                  role === 'doctor'
                    ? currentDoctor?.avatar
                    : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'
                }
                alt="Doctor Profile"
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-extrabold text-slate-900 truncate">
                    {role === 'doctor' ? currentDoctor?.name : 'Dr. Aneez Patel'}
                  </h4>
                  <Badge variant="primary" size="sm">
                    {role === 'doctor' ? currentDoctor?.specialty : 'Cardiology'}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate font-medium">
                  {role === 'doctor' ? currentDoctor?.qualification : 'MD, DM (Cardiology), FACC'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-4 text-center text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Experience</span>
                <span className="font-extrabold text-slate-800">
                  {role === 'doctor' ? currentDoctor?.experienceYears : 14} Years
                </span>
              </div>
              <div className="p-2.5 bg-blue-50/50 border border-blue-100/60 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Consult Fee</span>
                <span className="font-extrabold text-blue-600 font-mono">
                  ${role === 'doctor' ? currentDoctor?.fee : 70}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/doctor/${role === 'doctor' ? currentDoctor?.id : 'doc-1'}`)}
              className="w-full text-xs font-bold justify-between"
              icon={<ChevronRight className="w-4 h-4" />}
              iconPosition="right"
            >
              View Full Clinical Bio
            </Button>
          </Card>

          {/* Schedule Strip & Consultations */}
          <Card className="p-5 bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3.5">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Weekly Schedule</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">6-Day Outlook</span>
            </div>

            {/* Dynamic 6-day Day Pill Selector Strip */}
            <div className="grid grid-cols-6 gap-1.5 mb-4">
              {scheduleDays.map(day => {
                const isSelected = day.isoDate === selectedDayIso;
                const hasApts = appointments.some(a => a.date === day.isoDate);
                return (
                  <button
                    key={day.isoDate}
                    onClick={() => setSelectedDayIso(day.isoDate)}
                    className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs font-bold ring-2 ring-blue-600/30'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                      {day.dayShort}
                    </span>
                    <span className="text-sm font-extrabold font-mono mt-0.5">{day.dayNum}</span>
                    {hasApts && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1 ${
                          isSelected ? 'bg-white' : 'bg-blue-600'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Consultations List for selected day */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Scheduled Slots ({dayScheduleAppointments.length})
              </div>

              {dayScheduleAppointments.map(apt => (
                <div
                  key={apt.id}
                  className="p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl transition-colors flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-xs text-blue-700">{apt.time}</span>
                      <span className="text-slate-300">&bull;</span>
                      <span className="font-bold text-xs text-slate-900">{apt.patientName}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium truncate max-w-[180px]">
                      {apt.doctorSpecialty} &bull; {apt.symptoms}
                    </p>
                  </div>
                  <Badge
                    variant={apt.status === 'Completed' ? 'success' : 'default'}
                    size="sm"
                  >
                    {apt.status}
                  </Badge>
                </div>
              ))}

              {dayScheduleAppointments.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400">
                  No appointments scheduled for this date.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
