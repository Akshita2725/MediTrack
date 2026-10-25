import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Video,
  ArrowRight,
  Stethoscope,
  Heart,
  Plus,
  Play,
  UserCheck,
  Search,
  Activity,
  Award,
  ChevronRight,
  Phone,
  Mail,
  ShoppingBag,
  UserPlus,
  ShieldCheck,
  Sparkles,
  Pill,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { Card } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Button } from '../components/common/Button.jsx';
import { useLiveDateTime } from '../hooks/useLiveDateTime.js';
import { useSelector } from 'react-redux';
import { selectActiveAlertsCount, selectTriageAlerts } from '../store/triageSlice.js';
import { ReduxTriageLivePanel } from '../components/features/ReduxTriageLivePanel.jsx';
import { Zap } from 'lucide-react';

export const DashboardPage = () => {
  const { role } = useApp();

  return (
    <div className="space-y-6">
      {role === 'receptionist' && <ReceptionistDashboard />}
      {role === 'doctor' && <DoctorDashboard />}
      {role === 'patient' && <PatientDashboard />}
    </div>
  );
};

/* =========================================================================
   1. RECEPTIONIST DASHBOARD
   Focus: Front Desk Triage, Patient Queue, Walk-ins, Check-in Actions
   ========================================================================= */
const ReceptionistDashboard = () => {
  const {
    appointments,
    activeQueue,
    completedAppointments,
    updateAppointmentStatus,
    patients,
    doctors
  } = useApp();
  const navigate = useNavigate();
  const { dateFormatted, timeFormatted } = useLiveDateTime();
  const [filterStatus, setFilterStatus] = useState('All');

  const waitingPatients = useMemo(
    () => activeQueue.filter((a) => a.status === 'Waiting'),
    [activeQueue]
  );

  const displayedQueue = useMemo(() => {
    if (filterStatus === 'Waiting') return waitingPatients;
    if (filterStatus === 'In Consultation') return activeQueue.filter((a) => a.status === 'In Consultation');
    return activeQueue;
  }, [activeQueue, filterStatus, waitingPatients]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Receptionist Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60 mb-2.5">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Front Desk & Patient Triage Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Clinic Reception & Flow
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage live patient check-ins, call queue numbers, and direct patients to doctor rooms.
          </p>
        </div>

        {/* Quick Reception CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Link
            to="/register"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs"
          >
            <UserPlus className="w-4 h-4 text-blue-600" />
            <span>Register New Patient</span>
          </Link>
          <Link
            to="/book"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Book Visit / Walk-in</span>
          </Link>
        </div>
      </div>

      {/* 3 High-Clarity Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Waiting in Lobby</p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold font-mono text-amber-600">
                  {waitingPatients.length}
                </span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  Need Doctor
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">In Consultation</p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold font-mono text-blue-600">
                  {activeQueue.filter((a) => a.status === 'In Consultation').length}
                </span>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  In Doctor Rooms
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Discharged Today</p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold font-mono text-emerald-600">
                  {completedAppointments.length}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Completed
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Front Desk Queue Section */}
      <Card className="p-0 overflow-hidden border-slate-200/90 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/70">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Live Patient Queue</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Patients ready for triage and room assignment.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs">
            {['All', 'Waiting', 'In Consultation'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterStatus === st
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Queue Items */}
        {displayedQueue.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Queue is clear</p>
            <p className="text-xs text-slate-500">No patients currently waiting under this filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {displayedQueue.map((apt) => (
              <div
                key={apt.id}
                className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Token Number Box */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-700 font-mono font-extrabold text-base flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] uppercase tracking-wider text-blue-400 font-sans">Token</span>
                    <span>#{apt.queueNumber}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        {apt.patientName}
                      </h3>
                      <Badge
                        variant={
                          apt.status === 'Waiting'
                            ? 'warning'
                            : apt.status === 'In Consultation'
                            ? 'primary'
                            : 'default'
                        }
                      >
                        {apt.status}
                      </Badge>
                      <span className="text-xs text-slate-400 font-mono">
                        Slot: {apt.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">
                      Attending: <strong className="text-slate-800">{apt.doctorName}</strong> ({apt.doctorSpecialty})
                    </p>

                    <p className="text-xs text-slate-500 italic bg-slate-100/70 px-2.5 py-1 rounded-md inline-block">
                      Chief Complaint: {apt.symptoms || 'General Checkup'}
                    </p>
                  </div>
                </div>

                {/* Status Control Actions */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {apt.status === 'Scheduled' && (
                    <Button
                      size="sm"
                      onClick={() => updateAppointmentStatus(apt.id, 'Waiting')}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Check In (Lobby)</span>
                    </Button>
                  )}

                  {apt.status === 'Waiting' && (
                    <Button
                      size="sm"
                      onClick={() => updateAppointmentStatus(apt.id, 'In Consultation')}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Send to Doctor</span>
                    </Button>
                  )}

                  {apt.status === 'In Consultation' && (
                    <Button
                      size="sm"
                      onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Complete</span>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                    className="text-xs text-slate-500 hover:text-rose-600"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Live Emergency Triage Section */}
      <ReduxTriageLivePanel />
    </div>
  );
};

/* =========================================================================
   2. DOCTOR DASHBOARD
   Focus: My Patients Today, Consultations, Write Prescription, Telehealth
   ========================================================================= */
const DoctorDashboard = () => {
  const { currentDoctor, appointments, activeQueue, prescriptions, followUps } = useApp();
  const navigate = useNavigate();
  const activeAlertsCount = useSelector(selectActiveAlertsCount);
  const [showReduxTriage, setShowReduxTriage] = useState(false);

  // Filter appointments specifically for the logged-in doctor
  const myAppointments = useMemo(() => {
    return appointments.filter((a) => a.doctorId === currentDoctor?.id);
  }, [appointments, currentDoctor]);

  const myActiveQueue = useMemo(() => {
    return activeQueue.filter((a) => a.doctorId === currentDoctor?.id);
  }, [activeQueue, currentDoctor]);

  const myPrescriptions = useMemo(() => {
    return prescriptions.filter((p) => p.doctorId === currentDoctor?.id);
  }, [prescriptions, currentDoctor]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Doctor Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentDoctor?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80'}
            alt={currentDoctor?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-1.5">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Attending Physician</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {currentDoctor?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {currentDoctor?.specialty} &bull; {currentDoctor?.qualification}
            </p>
          </div>
        </div>

        {/* Doctor Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setShowReduxTriage(!showReduxTriage)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{showReduxTriage ? 'Hide ER Triage' : 'View ER Triage'}</span>
          </button>
          <Link
            to="/teleconsultation"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Video className="w-4 h-4 text-emerald-600" />
            <span>Telehealth Room</span>
          </Link>
          <Link
            to="/prescriptions/new"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>+ Write Prescription</span>
          </Link>
        </div>
      </div>

      {/* 4 Clinical Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">My Patients in Queue</p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold font-mono text-emerald-600">
                  {myActiveQueue.length}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Active Visits
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Prescriptions Issued</p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold font-mono text-blue-600">
                  {myPrescriptions.length}
                </span>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  Rx Orders
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Follow-Ups</p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold font-mono text-purple-600">
                  {followUps.filter((f) => f.doctorId === currentDoctor?.id && f.status === 'Pending').length}
                </span>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                  Reviews Due
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* 4th Metric: Emergency Triage Alerts */}
        <Card
          className="p-5 bg-gradient-to-br from-indigo-50/50 to-white border-indigo-200/80 shadow-2xs cursor-pointer hover:border-indigo-300 transition-colors"
          onClick={() => setShowReduxTriage(!showReduxTriage)}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">ER Triage Alerts</p>
              </div>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-extrabold font-mono text-indigo-700">
                  {activeAlertsCount}
                </span>
                <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                  STAT Alerts
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-500 fill-amber-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Conditionally rendered Emergency Triage Live Panel */}
      {showReduxTriage && <ReduxTriageLivePanel />}

      {/* Doctor's Consultations List */}
      <Card className="p-0 overflow-hidden border-slate-200/90 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-emerald-600" />
              <span>Today's Consultation Schedule</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Scheduled clinical visits for {currentDoctor?.name}
            </p>
          </div>

          <Link
            to="/appointments"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Full Schedule</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {myAppointments.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No scheduled patients today</p>
            <p className="text-xs text-slate-500">Your clinical schedule is currently clear.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {myAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono font-bold text-xs flex flex-col items-center justify-center shrink-0">
                    <span>{apt.time}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        {apt.patientName}
                      </h3>
                      <Badge variant={apt.status === 'Completed' ? 'success' : 'primary'}>
                        {apt.status}
                      </Badge>
                      <span className="text-xs text-slate-400">{apt.consultationType || 'In-Person'}</span>
                    </div>

                    <p className="text-xs text-slate-600">
                      Symptoms: <span className="text-slate-800 font-medium">{apt.symptoms || 'General Consultation'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/prescriptions/new?patientId=${apt.patientId}&appointmentId=${apt.id}`)}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Prescribe</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/patient/${apt.patientId}`)}
                    className="text-xs text-slate-600"
                  >
                    View Chart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

/* =========================================================================
   3. PATIENT DASHBOARD
   Focus: Next Appointment, My Prescriptions, Pharmacy Orders, Book Visit
   ========================================================================= */
const PatientDashboard = () => {
  const { currentPatient, appointments, prescriptions } = useApp();
  const { cartItems, totalItems } = useCart();
  const navigate = useNavigate();

  // Appointments for this patient
  const myAppointments = useMemo(() => {
    return appointments.filter((a) => a.patientId === currentPatient?.id);
  }, [appointments, currentPatient]);

  const upcomingAppointment = useMemo(() => {
    return myAppointments.find((a) => a.status !== 'Completed' && a.status !== 'Cancelled') || myAppointments[0];
  }, [myAppointments]);

  // Prescriptions for this patient
  const myPrescriptions = useMemo(() => {
    return prescriptions.filter((p) => p.patientId === currentPatient?.id);
  }, [prescriptions, currentPatient]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Patient Welcome Card */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentPatient?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
            alt={currentPatient?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/30 shadow-md"
          />
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-purple-100">
              <Heart className="w-3.5 h-3.5 text-rose-300" />
              <span>Personal Health Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hello, {currentPatient?.name}
            </h1>
            <p className="text-xs sm:text-sm text-purple-100/90 font-medium">
              Blood Group: <strong className="text-white">{currentPatient?.bloodGroup || 'A+'}</strong> &bull; Patient ID: #{currentPatient?.id}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Link
            to="/pharmacy"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Medicine ({totalItems})</span>
          </Link>
          <Link
            to="/book"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-purple-900 hover:bg-purple-50 transition-colors shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4 text-purple-600" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>

      {/* Next Upcoming Appointment Highlight */}
      {upcomingAppointment ? (
        <Card className="p-6 border-purple-200/80 bg-purple-50/30 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                    Next Consultation
                  </span>
                  <Badge variant="primary">{upcomingAppointment.status}</Badge>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {upcomingAppointment.doctorName} &bull; {upcomingAppointment.doctorSpecialty}
                </h3>
                <p className="text-xs text-slate-600">
                  Date: <strong className="text-slate-900">{upcomingAppointment.date}</strong> at <strong className="text-slate-900">{upcomingAppointment.time}</strong> ({upcomingAppointment.consultationType || 'In-Person'})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                to="/teleconsultation"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors"
              >
                <Video className="w-4 h-4" />
                <span>Join Video Room</span>
              </Link>
              <Link
                to="/messages"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </Link>
            </div>
          </div>
        </Card>
      ) : null}

      {/* Grid: Prescriptions on Left, Quick Pharmacy & Vitals on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Prescriptions (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-0 overflow-hidden border-slate-200/90 shadow-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span>My Active Prescriptions</span>
              </h2>
              <Link
                to="/prescriptions"
                className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <span>View All ({myPrescriptions.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {myPrescriptions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-600">No prescriptions on file</p>
                <p className="text-xs text-slate-400">Prescriptions from your doctor will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {myPrescriptions.slice(0, 3).map((rx) => (
                  <div key={rx.id} className="p-5 space-y-3 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm text-slate-900">
                            {rx.diagnosis || 'Clinical Diagnosis'}
                          </h3>
                          <span className="font-mono text-xs text-slate-400">#{rx.id}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Prescribed by {rx.doctorName} on {rx.date}
                        </p>
                      </div>

                      <Link
                        to={`/prescriptions/${rx.id}`}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        View Rx
                      </Link>
                    </div>

                    {/* Medications list */}
                    {rx.medicines && rx.medicines.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {rx.medicines.map((m, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-xl font-medium border border-slate-200/60"
                          >
                            <Pill className="w-3.5 h-3.5 text-purple-600" />
                            <span>{m.name || m}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions & Pharmacy Links (1 col) */}
        <div className="space-y-4">
          <Card className="p-5 border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-600" />
              <span>Need Medication Refills?</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Order your prescribed medications and healthcare supplies directly from the clinic pharmacy.
            </p>
            <Link
              to="/pharmacy"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Open Pharmacy Store</span>
            </Link>
          </Card>

          <Card className="p-5 border-slate-200/90 shadow-xs space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Clinic Support & Inquiries</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Have questions regarding treatment plans, prescriptions, or follow-up tests?
            </p>
            <Link
              to="/messages"
              className="w-full inline-flex items-center justify-center gap-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Clinic Team</span>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};
