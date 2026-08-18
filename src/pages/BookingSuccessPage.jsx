import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Stethoscope,
  MapPin,
  FileText,
  Printer,
  ArrowRight,
  Video,
  Activity,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { formatClinicalDate } from '../utils/dateUtils.js';

export const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { appointments } = useApp();

  const appointmentId = searchParams.get('id');
  const appointment = appointments.find(a => a.id === appointmentId) || appointments[appointments.length - 1];

  if (!appointment) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Booking Record Not Found</h2>
        <Button onClick={() => navigate('/appointments')}>View Appointments</Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="text-center space-y-2.5">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/15 border border-emerald-100">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Appointment Confirmed!</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
          Your clinical visit has been registered and verified in the central patient queue.
        </p>
      </div>

      {/* Official Clinical Booking Slip Ticket */}
      <Card className="p-6 sm:p-8 border-2 border-slate-200/90 bg-white shadow-lg space-y-6 print:border-none print:shadow-none">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs font-extrabold text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                Ticket #{appointment.id}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">MediTrack Encounter Pass</h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Queue Slot</span>
            <span className="text-2xl font-black text-blue-600 font-mono">
              #{appointment.queueNumber.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Appointment Grid Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Patient Name</span>
            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              {appointment.patientName}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Attending Specialist</span>
            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              {appointment.doctorName}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">{appointment.doctorSpecialty}</div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Scheduled Time</span>
            <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              {formatClinicalDate(appointment.date)}
            </div>
            <div className="text-[11px] text-slate-600 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {appointment.time}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Mode &amp; Location</span>
            <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
              {appointment.consultationType === 'Tele-Consultation' ? (
                <Video className="w-4 h-4 text-purple-600" />
              ) : (
                <MapPin className="w-4 h-4 text-blue-600" />
              )}
              {appointment.consultationType}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {appointment.consultationType === 'Tele-Consultation'
                ? 'MediTrack Encrypted Video Room'
                : 'Room #4, Outpatient Clinic Wing'}
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs">
          <span className="text-blue-900 font-bold uppercase text-[10px] tracking-wider block mb-1">
            Reason for Consultation:
          </span>
          <p className="text-slate-700 font-medium leading-relaxed">{appointment.symptoms}</p>
        </div>

        {/* Buttons for actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 print:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            icon={<Printer className="w-4 h-4" />}
            className="font-bold text-xs"
          >
            Print Ticket
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/appointments')}
              className="w-full sm:w-auto font-bold text-xs"
            >
              All Appointments
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/')}
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto font-bold text-xs shadow-md shadow-blue-500/25"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
