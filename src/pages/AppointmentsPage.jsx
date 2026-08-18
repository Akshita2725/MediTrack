import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Stethoscope,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Video,
  Play,
  RotateCcw,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { formatClinicalDate } from '../utils/dateUtils.js';

export const AppointmentsPage = () => {
  const {
    appointments,
    updateAppointmentStatus,
    role,
    currentDoctor,
    currentPatient,
    doctors
  } = useApp();

  const navigate = useNavigate();

  // Filters State
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Extract unique specialties
  const specialties = useMemo(() => {
    return Array.from(new Set(doctors.map(d => d.specialty)));
  }, [doctors]);

  // Derived filtered appointment records
  const filteredAppointments = useMemo(() => {
    let list = appointments;

    // Role-specific view
    if (role === 'doctor' && currentDoctor) {
      list = list.filter(a => a.doctorId === currentDoctor.id);
    } else if (role === 'patient' && currentPatient) {
      list = list.filter(a => a.patientId === currentPatient.id);
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      list = list.filter(a => a.status === statusFilter);
    }

    // Specialty filter
    if (specialtyFilter !== 'ALL') {
      list = list.filter(a => a.doctorSpecialty === specialtyFilter);
    }

    // Specific Date filter
    if (dateFilter) {
      list = list.filter(a => a.date === dateFilter);
    }

    // Search query filter (Patient Name, Doctor Name, Symptoms, ID)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        a =>
          a.patientName.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q) ||
          a.symptoms.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [
    appointments,
    role,
    currentDoctor,
    currentPatient,
    statusFilter,
    specialtyFilter,
    dateFilter,
    searchQuery
  ]);

  const handleStartConsultation = (aptId) => {
    updateAppointmentStatus(aptId, 'In Consultation');
  };

  const handleComplete = (aptId) => {
    updateAppointmentStatus(aptId, 'Completed');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Appointments & Clinical Triage Master"
        subtitle={
          role === 'receptionist'
            ? 'Manage full clinic roster, change status, assign queue slots, and control patient intake.'
            : role === 'doctor'
            ? `Specialist Appointment Log for ${currentDoctor?.name}`
            : `My Personal Appointment History & Future Bookings (${currentPatient?.name})`
        }
        actions={
          <Button
            onClick={() => navigate('/book')}
            icon={<Plus className="w-4 h-4" />}
            size="md"
            className="shadow-md shadow-blue-500/25"
          >
            New Booking
          </Button>
        }
      />

      {/* High Density Filter Ribbon */}
      <Card className="p-4.5 bg-white space-y-3.5 shadow-xs border border-slate-200/90">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Status Segment Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {['ALL', 'Scheduled', 'Waiting', 'In Consultation', 'Completed', 'Cancelled'].map(
              status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {status === 'ALL' ? 'All Records' : status}
                </button>
              )
            )}
          </div>

          {/* Search Query Input */}
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search patient, doctor, condition..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-3.5 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-bold">Specialty:</span>
            <select
              value={specialtyFilter}
              onChange={e => setSpecialtyFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700 font-semibold outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">All Specialties</option>
              {specialties.map(spec => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-bold">Date:</span>
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700 font-semibold outline-none focus:border-blue-500 cursor-pointer"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter('')}
                className="text-xs text-rose-600 hover:underline font-bold ml-1 cursor-pointer"
              >
                Clear Date
              </button>
            )}
          </div>

          <div className="ml-auto text-slate-400 font-medium">
            Showing <strong className="text-slate-800 font-bold">{filteredAppointments.length}</strong> matching appointments
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <EmptyState
          icon={<CalendarIcon className="w-10 h-10 text-slate-400" />}
          title="No Appointments Found"
          description="Try adjusting your search keywords, active filter date, or status selection."
          actionLabel="Book New Appointment"
          onAction={() => navigate('/book')}
        />
      ) : (
        <div className="space-y-3.5">
          {filteredAppointments.map(apt => (
            <Card
              key={apt.id}
              hover={true}
              className={`p-4.5 transition-all duration-200 border ${
                apt.status === 'In Consultation'
                  ? 'border-blue-300 bg-blue-50/25 shadow-xs'
                  : apt.status === 'Completed'
                  ? 'opacity-85 bg-slate-50/50 border-slate-200'
                  : 'bg-white border-slate-200/90'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                {/* Left section: Identity & Clinical Context */}
                <div className="flex items-start gap-3.5 min-w-[280px]">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex flex-col items-center justify-center font-bold flex-shrink-0 border border-blue-100 shadow-2xs">
                    <span className="text-[9px] text-blue-500 uppercase font-mono font-bold">Queue</span>
                    <span className="text-sm font-extrabold font-mono leading-none">#{apt.queueNumber}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        onClick={() => navigate(`/patient/${apt.patientId}`)}
                        className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {apt.patientName}
                      </h3>
                      <Badge
                        variant={
                          apt.status === 'In Consultation'
                            ? 'primary'
                            : apt.status === 'Waiting'
                            ? 'warning'
                            : apt.status === 'Completed'
                            ? 'success'
                            : apt.status === 'Cancelled'
                            ? 'danger'
                            : 'default'
                        }
                        size="sm"
                        dot={true}
                      >
                        {apt.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5 font-normal">
                      <span className="font-bold text-slate-700">Symptoms:</span> {apt.symptoms}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Stethoscope className="w-3 h-3 text-blue-600" />
                        <strong className="text-slate-800">{apt.doctorName}</strong> ({apt.doctorSpecialty})
                      </span>
                      <span>&bull;</span>
                      <span className="font-mono text-slate-400">ID: {apt.id}</span>
                    </div>
                  </div>
                </div>

                {/* Middle: Date, Time & Mode */}
                <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-xs">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-bold text-slate-800">{formatClinicalDate(apt.date)}</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-bold font-mono text-slate-700">{apt.time}</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <Badge
                    variant={apt.consultationType === 'Tele-Consultation' ? 'purple' : 'default'}
                    size="sm"
                  >
                    {apt.consultationType}
                  </Badge>
                </div>

                {/* Right: Actions & Status Changing */}
                <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto justify-end">
                  {/* Receptionist Status Selector */}
                  {role === 'receptionist' && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 font-bold">Status:</span>
                      <select
                        value={apt.status}
                        onChange={e => updateAppointmentStatus(apt.id, e.target.value)}
                        className="text-xs font-bold bg-white text-slate-800 border border-slate-200/90 rounded-xl px-2.5 py-1.5 outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Waiting">Waiting</option>
                        <option value="In Consultation">In Consultation</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  )}

                  {/* Doctor Quick Handlers */}
                  {role === 'doctor' && apt.status === 'Waiting' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleStartConsultation(apt.id)}
                      icon={<Play className="w-3.5 h-3.5" />}
                    >
                      Begin Consultation
                    </Button>
                  )}

                  {role === 'doctor' && apt.status === 'In Consultation' && (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleComplete(apt.id)}
                      icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    >
                      Discharge &amp; Complete
                    </Button>
                  )}

                  {/* Tele-Consultation Room link */}
                  {apt.consultationType === 'Tele-Consultation' && apt.status !== 'Cancelled' && (
                    <Button
                      size="sm"
                      variant="purple"
                      onClick={() => navigate('/teleconsultation')}
                      icon={<Video className="w-3.5 h-3.5" />}
                    >
                      Join Video
                    </Button>
                  )}

                  {/* Write Prescription for this appointment */}
                  {role === 'doctor' && apt.status !== 'Cancelled' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate('/prescriptions/new')}
                      className="text-xs text-blue-600 hover:bg-blue-50 font-bold"
                    >
                      Issue Rx
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
