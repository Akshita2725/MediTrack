import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Search,
  Pill,
  User,
  Stethoscope,
  Calendar,
  Repeat,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { formatClinicalDate } from '../utils/dateUtils.js';

export const PrescriptionsListPage = () => {
  const {
    prescriptions,
    role,
    currentDoctor,
    currentPatient,
    setRepeatPrescriptionData,
    setRole
  } = useApp();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrescriptions = useMemo(() => {
    let list = prescriptions;

    // Role-specific view
    if (role === 'doctor' && currentDoctor) {
      list = list.filter(p => p.doctorId === currentDoctor.id);
    } else if (role === 'patient' && currentPatient) {
      list = list.filter(p => p.patientId === currentPatient.id);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          p.patientName.toLowerCase().includes(q) ||
          p.doctorName.toLowerCase().includes(q) ||
          p.diagnosis.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.medicines.some(m => m.name.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [prescriptions, role, currentDoctor, currentPatient, searchQuery]);

  // Repeat prescription handler
  const handleRepeat = (rx) => {
    const clonedRx = {
      patientId: rx.patientId,
      patientName: rx.patientName,
      patientAge: rx.patientAge,
      patientAllergies: [...rx.patientAllergies],
      doctorId: rx.doctorId,
      doctorName: rx.doctorName,
      doctorSpecialty: rx.doctorSpecialty,
      doctorQualification: rx.doctorQualification,
      symptoms: `Refill order for ${rx.diagnosis}`,
      diagnosis: rx.diagnosis,
      notes: `Refilled from prescription #${rx.id}`,
      medicines: rx.medicines.map(m => ({ ...m, id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 5)}` })),
      followUpDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    };

    setRepeatPrescriptionData(clonedRx);
    setRole('doctor');
    navigate('/prescriptions/new');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Digital Prescriptions & Pharmacotherapy Records"
        subtitle={
          role === 'doctor'
            ? `Pharmacotherapy issued by ${currentDoctor?.name}`
            : role === 'patient'
            ? `My Prescribed Medicines & Refills (${currentPatient?.name})`
            : 'Clinic central pharmacy repository, doctor orders, and refill histories.'
        }
        actions={
          <Button
            onClick={() => {
              if (role !== 'doctor') setRole('doctor');
              navigate('/prescriptions/new');
            }}
            icon={<Plus className="w-4 h-4" />}
            size="md"
            className="shadow-md shadow-blue-500/25"
          >
            Create New Rx
          </Button>
        }
      />

      {/* Search & Statistics Bar */}
      <Card className="p-4.5 bg-white border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search medicine, diagnosis, patient, Rx#..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Total Records: <strong className="text-slate-800 font-bold">{filteredPrescriptions.length}</strong>
          </div>
        </div>
      </Card>

      {/* Prescriptions List */}
      {filteredPrescriptions.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-10 h-10 text-slate-400" />}
          title="No Prescriptions Found"
          description="Issue digital prescriptions for your patients or adjust your search keywords."
          actionLabel="Draft Prescription"
          onAction={() => {
            if (role !== 'doctor') setRole('doctor');
            navigate('/prescriptions/new');
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredPrescriptions.map(rx => (
            <Card
              key={rx.id}
              hover={true}
              className="p-5.5 hover:border-emerald-300/90 transition-all shadow-xs border-slate-200/90"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4.5 border-b border-slate-100">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100 shadow-2xs">
                    <Pill className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-extrabold text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                        {rx.id}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Issued: {formatClinicalDate(rx.date)}
                      </span>
                      {rx.followUpDate && (
                        <Badge variant="warning" size="sm" dot={true}>
                          Follow-up: {formatClinicalDate(rx.followUpDate)}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 mt-1">{rx.diagnosis}</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Patient: <strong className="text-slate-800">{rx.patientName}</strong> ({rx.patientAge} yrs) &bull; Attending: <strong className="text-slate-800">{rx.doctorName}</strong> ({rx.doctorSpecialty})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRepeat(rx)}
                    icon={<Repeat className="w-3.5 h-3.5 text-blue-600" />}
                    className="text-xs font-bold"
                  >
                    Repeat / Refill Rx
                  </Button>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate(`/prescriptions/${rx.id}`)}
                    className="text-xs font-bold"
                  >
                    View Official Rx &rarr;
                  </Button>
                </div>
              </div>

              {/* Medicine items row */}
              <div className="pt-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2.5">
                  Prescribed Pharmaceuticals ({rx.medicines.length} items):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {rx.medicines.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-0.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-extrabold">{med.name}</strong>
                        <span className="text-blue-600 font-bold font-mono text-[11px]">{med.dosage}</span>
                      </div>
                      <p className="text-slate-500 text-[11px] font-medium">
                        {med.frequency} &bull; <span className="font-semibold text-slate-700">{med.duration}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
