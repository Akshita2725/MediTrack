import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  User,
  AlertTriangle,
  Calendar,
  Clock,
  FileText,
  Repeat,
  Plus,
  ArrowLeft,
  Heart,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  CheckCircle2,
  Share2,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { formatClinicalDate } from '../utils/dateUtils.js';

export const PatientProfilePage = () => {
  const { id } = useParams();
  const {
    patients,
    prescriptions,
    appointments,
    followUps,
    setRepeatPrescriptionData,
    setRole,
    setCurrentPatientId,
    role
  } = useApp();
  const navigate = useNavigate();

  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return (
      <EmptyState
        icon={<User className="w-10 h-10 text-slate-400" />}
        title="Patient Record Not Found"
        description="The requested medical patient ID does not exist in MediTrack archives."
        actionLabel="Back to Patient Directory"
        onAction={() => navigate('/patients')}
      />
    );
  }

  // Patient's prescriptions
  const patientPrescriptions = prescriptions.filter(rx => rx.patientId === patient.id);

  // Patient's past visits / appointments
  const patientAppointments = appointments.filter(a => a.patientId === patient.id);

  // Patient's follow-ups
  const patientFollowUps = followUps.filter(f => f.patientId === patient.id);

  // Handle "Repeat / Refill Prescription" workflow
  const handleRepeatPrescription = (prevRx) => {
    const clonedRx = {
      patientId: prevRx.patientId,
      patientName: prevRx.patientName,
      patientAge: prevRx.patientAge,
      patientAllergies: [...prevRx.patientAllergies],
      doctorId: prevRx.doctorId,
      doctorName: prevRx.doctorName,
      doctorSpecialty: prevRx.doctorSpecialty,
      doctorQualification: prevRx.doctorQualification,
      symptoms: `Refill / Maintenance for ${prevRx.diagnosis}`,
      diagnosis: prevRx.diagnosis,
      notes: `Prescription refill repeated from visit on ${prevRx.date}`,
      medicines: prevRx.medicines.map(m => ({ ...m, id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 5)}` })),
      followUpDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    };

    setRepeatPrescriptionData(clonedRx);
    setRole('doctor');
    navigate('/prescriptions/new');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Back Button */}
      <button
        onClick={() => navigate('/patients')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Patient Directory
      </button>

      {/* Main Patient Header Card */}
      <Card className="p-6 sm:p-8 border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-white shadow-md shadow-slate-200/80"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="purple" size="md">
                  Blood Group: {patient.bloodGroup}
                </Badge>
                <span className="font-mono text-xs font-bold text-slate-400">
                  Medical Record #: {patient.id}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {patient.name}
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">
                {patient.gender}, {patient.age} Years Old
              </p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {patient.address}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setCurrentPatientId(patient.id);
                setRole('patient');
                navigate('/');
              }}
              icon={<User className="w-4 h-4 text-purple-600" />}
            >
              Switch Workspace
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/book?patient=${patient.id}`)}
              icon={<Calendar className="w-4 h-4" />}
            >
              Book New Visit
            </Button>
          </div>
        </div>

        {/* Allergy Alert Banner if applicable */}
        {patient.allergies && patient.allergies.length > 0 && patient.allergies[0] !== 'None known' && (
          <div className="mt-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs text-rose-900 font-medium">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <div>
              <strong className="font-bold">CRITICAL ALLERGY ALERT:</strong> Known hypersensitivity to{' '}
              <span className="font-extrabold underline">{patient.allergies.join(', ')}</span>. Cross-verify before issuing pharmacotherapy orders.
            </div>
          </div>
        )}

        {/* Chronic Conditions & Contact Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Chronic Diagnoses</span>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {patient.conditions.map(c => (
                <span key={c} className="px-2.5 py-0.5 bg-white font-bold text-slate-800 rounded-md border border-slate-200">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Primary Phone</span>
            <strong className="text-slate-900 text-sm font-bold block mt-1">{patient.contact}</strong>
            <span className="text-slate-400 text-[11px] block truncate mt-0.5">{patient.email}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Total Encounters</span>
            <div className="flex items-baseline gap-2 mt-1">
              <strong className="text-blue-600 text-lg font-black">{patientAppointments.length} Visits</strong>
              <span className="text-slate-400">&bull;</span>
              <span className="text-emerald-600 font-bold">{patientPrescriptions.length} Rx Issued</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs & Records: Prescriptions, History & Follow-ups */}
      <div className="space-y-6">
        {/* Prescriptions History */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">Active &amp; Past Prescriptions</h2>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setRole('doctor');
                navigate('/prescriptions/new');
              }}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Write New Rx
            </Button>
          </div>

          {patientPrescriptions.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 font-medium">
              No prescriptions on file for this patient.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 mt-2">
              {patientPrescriptions.map(rx => (
                <div key={rx.id} className="py-4.5 first:pt-3 last:pb-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">{rx.id}</span>
                        <Badge variant="success" size="sm" dot={true}>
                          Issued {formatClinicalDate(rx.date)}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-1">{rx.diagnosis}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Prescribing Specialist: <strong className="text-slate-800">{rx.doctorName}</strong> ({rx.doctorSpecialty})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRepeatPrescription(rx)}
                        icon={<Repeat className="w-3.5 h-3.5 text-blue-600" />}
                        className="text-xs font-bold"
                      >
                        Repeat Rx
                      </Button>

                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => navigate(`/prescriptions/${rx.id}`)}
                        className="text-xs"
                      >
                        View Order
                      </Button>
                    </div>
                  </div>

                  {/* Medicines list pill preview */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {rx.medicines.map((med, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs"
                      >
                        <span className="font-extrabold text-slate-800">{med.name}</span>{' '}
                        <span className="text-blue-600 font-bold font-mono">({med.dosage})</span> &bull;{' '}
                        <span className="text-slate-500 font-medium">{med.frequency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Appointments History */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-900">Clinical Visit Encounters</h2>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/book?patient=${patient.id}`)}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Schedule Visit
            </Button>
          </div>

          {patientAppointments.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 font-medium">
              No appointments recorded for this patient.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 mt-2">
              {patientAppointments.map(apt => (
                <div key={apt.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-xs font-bold text-slate-900">{formatClinicalDate(apt.date)}</strong>
                      <span className="text-xs text-slate-500 font-mono">at {apt.time}</span>
                      <Badge
                        variant={
                          apt.status === 'Completed'
                            ? 'success'
                            : apt.status === 'In Consultation'
                            ? 'primary'
                            : 'default'
                        }
                        size="sm"
                        dot={true}
                      >
                        {apt.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      Attending: <strong className="text-slate-800">{apt.doctorName}</strong> ({apt.doctorSpecialty}) &bull;{' '}
                      <span className="text-slate-500">{apt.consultationType}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 italic mt-0.5">&ldquo;{apt.symptoms}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
