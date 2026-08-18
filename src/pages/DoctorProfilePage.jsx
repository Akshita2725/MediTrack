import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Star,
  Clock,
  MapPin,
  Calendar,
  Video,
  Building,
  CheckCircle2,
  Award,
  BookOpen,
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Card } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Button } from '../components/common/Button.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { formatClinicalDate } from '../utils/dateUtils.js';

export const DoctorProfilePage = () => {
  const { id } = useParams();
  const { doctors, appointments, setCurrentDoctorId, setRole } = useApp();
  const navigate = useNavigate();

  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <EmptyState
        icon={<Stethoscope className="w-10 h-10 text-slate-400" />}
        title="Doctor Profile Not Found"
        description="The requested medical specialist profile ID does not exist in MediTrack records."
        actionLabel="Back to Doctor Directory"
        onAction={() => navigate('/doctors')}
      />
    );
  }

  const docAppointments = appointments.filter(a => a.doctorId === doctor.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Back Button */}
      <button
        onClick={() => navigate('/doctors')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Doctor Directory
      </button>

      {/* Main Profile Header Card */}
      <Card className="p-6 sm:p-8 border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-white shadow-md shadow-slate-200/80"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="primary" size="md">
                  {doctor.specialty}
                </Badge>
                <div className="flex items-center gap-1 text-xs font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-500 font-semibold">({doctor.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {doctor.name}
              </h1>
              <p className="text-sm font-bold text-blue-600 mt-0.5">{doctor.qualification}</p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {doctor.clinicAddress}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setCurrentDoctorId(doctor.id);
                setRole('doctor');
                navigate('/');
              }}
              icon={<Stethoscope className="w-4 h-4 text-emerald-600" />}
            >
              Switch Workspace
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/book?doctor=${doctor.id}`)}
              icon={<Calendar className="w-4 h-4" />}
            >
              Book Consultation
            </Button>
          </div>
        </div>

        {/* Quick Clinical Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Seniority</span>
            <strong className="text-slate-900 text-lg font-black">{doctor.experienceYears} Years</strong>
            <span className="text-slate-500 text-[11px] font-medium block">Clinical Practice</span>
          </div>

          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/60">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Consultation Fee</span>
            <strong className="text-blue-600 text-lg font-black font-mono">${doctor.fee}</strong>
            <span className="text-slate-500 text-[11px] font-medium block">Standard Session</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Modalities</span>
            <strong className="text-slate-900 text-sm font-bold block mt-0.5">In-Clinic &amp; Video</strong>
            <span className="text-slate-500 text-[11px] font-medium block">Telemedicine Ready</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Active Consults</span>
            <strong className="text-emerald-600 text-lg font-black font-mono">{docAppointments.length}</strong>
            <span className="text-slate-500 text-[11px] font-medium block">Scheduled / Queued</span>
          </div>
        </div>
      </Card>

      {/* Two Column Layout: Clinical Bio vs Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Biography, Expertise & Conditions */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6">
            <h2 className="text-base font-extrabold text-slate-900 pb-3.5 border-b border-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" /> Physician Clinical Overview
            </h2>
            <p className="text-xs text-slate-600 mt-4 leading-relaxed whitespace-pre-line font-medium">{doctor.about}</p>

            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Focus &amp; Interests</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.clinicalInterests.map(interest => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-100"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Common Pathologies &amp; Conditions Managed</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {doctor.diseasesTreated.map(disease => (
                  <div
                    key={disease}
                    className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{disease}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Contact Details */}
          <Card className="p-6">
            <h2 className="text-base font-extrabold text-slate-900 pb-3.5 border-b border-slate-100 flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" /> Direct Department Contacts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <Phone className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Office Extension</span>
                  <span className="font-bold text-slate-800">{doctor.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <Mail className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Direct Email</span>
                  <span className="font-bold text-slate-800">{doctor.email}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Timetable, Slots & Queue */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6">
            <h2 className="text-base font-extrabold text-slate-900 pb-3.5 border-b border-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" /> Available Consultation Schedule
            </h2>

            <div className="space-y-4.5 mt-4">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">Operating Days</span>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.availability.days.map(day => (
                    <span
                      key={day}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200/80"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Practice Hours</span>
                <p className="text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {doctor.availability.hours}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">Bookable Time Slots</span>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availability.slots.map(slot => (
                    <div
                      key={slot}
                      className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center font-mono text-xs font-bold text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Button
                  onClick={() => navigate(`/book?doctor=${doctor.id}`)}
                  className="w-full justify-center shadow-md shadow-blue-500/25"
                  icon={<Calendar className="w-4 h-4" />}
                >
                  Schedule Appointment with {doctor.name}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
