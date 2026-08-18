import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  Calendar,
  User,
  Stethoscope,
  Plus,
  AlertCircle,
  ArrowRight,
  Filter,
  Check,
  Phone,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { formatClinicalDate } from '../utils/dateUtils.js';

export const FollowUpsPage = () => {
  const {
    followUps,
    updateFollowUpStatus,
    role,
    currentDoctor,
    currentPatient
  } = useApp();

  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredFollowUps = useMemo(() => {
    let list = followUps;

    if (role === 'doctor' && currentDoctor) {
      list = list.filter(f => f.doctorId === currentDoctor.id);
    } else if (role === 'patient' && currentPatient) {
      list = list.filter(f => f.patientId === currentPatient.id);
    }

    if (statusFilter !== 'ALL') {
      list = list.filter(f => f.status === statusFilter);
    }

    return list.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }, [followUps, role, currentDoctor, currentPatient, statusFilter]);

  const handleMarkResolved = (id) => {
    updateFollowUpStatus(id, 'Completed');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Clinical Follow-Up Tracker &amp; Recovery Monitoring"
        subtitle="Manage scheduled post-consultation evaluations, medication review checks, and chronic care re-evaluations."
      />

      {/* Status Segment Filter */}
      <Card className="p-4 bg-white border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {['ALL', 'Pending', 'Scheduled', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/25'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {status === 'ALL' ? `All Follow-ups (${followUps.length})` : status}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Pending Tasks: <strong className="text-amber-600 font-extrabold">{followUps.filter(f => f.status === 'Pending').length}</strong>
          </div>
        </div>
      </Card>

      {/* Follow-up list */}
      {filteredFollowUps.length === 0 ? (
        <EmptyState
          icon={<Clock className="w-10 h-10 text-slate-400" />}
          title="No Follow-Ups Recorded"
          description="All patient post-consultation follow-up reviews have been resolved or none are due."
        />
      ) : (
        <div className="space-y-3.5">
          {filteredFollowUps.map(item => (
            <Card
              key={item.id}
              hover={true}
              className={`p-5 transition-all border-slate-200/90 shadow-xs ${
                item.status === 'Completed' ? 'bg-slate-50/70 opacity-80' : 'bg-white hover:border-blue-300/90'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border shadow-2xs ${
                      item.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}
                  >
                    {item.status === 'Completed' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        onClick={() => navigate(`/patient/${item.patientId}`)}
                        className="text-sm font-extrabold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        {item.patientName}
                      </h3>
                      <Badge
                        variant={item.status === 'Completed' ? 'success' : 'warning'}
                        size="sm"
                        dot={true}
                      >
                        {item.status}
                      </Badge>
                      <span className="text-xs text-slate-400 font-medium">
                        Due: <strong className="text-slate-700">{formatClinicalDate(item.dueDate)}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium mt-1">{item.reason}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                      Attending: <strong className="text-slate-700">{item.doctorName}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                  {item.status !== 'Completed' && (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleMarkResolved(item.id)}
                      icon={<Check className="w-3.5 h-3.5" />}
                      className="font-bold text-xs"
                    >
                      Mark Resolved
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/patient/${item.patientId}`)}
                    className="font-bold text-xs"
                  >
                    View Patient Chart &rarr;
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
