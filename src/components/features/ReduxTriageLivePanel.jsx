import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTriageAlerts,
  selectBedStatistics,
  selectTriageLogs,
  selectFilterPriority,
  selectActiveAlertsCount,
  addTriageAlert,
  resolveTriageAlert,
  setPriorityFilter,
  updateBedCount,
  resetTriageDemo
} from '../../store/triageSlice.js';
import {
  Activity,
  AlertTriangle,
  BedDouble,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Zap,
  Terminal,
  Code
} from 'lucide-react';
import { Badge } from '../common/Badge.jsx';
import { Button } from '../common/Button.jsx';

export const ReduxTriageLivePanel = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(selectTriageAlerts);
  const beds = useSelector(selectBedStatistics);
  const logs = useSelector(selectTriageLogs);
  const activeCount = useSelector(selectActiveAlertsCount);
  const currentFilter = useSelector(selectFilterPriority);

  const [activeTab, setActiveTab] = useState('triage'); // 'triage' | 'state'

  const sampleEmergencyCases = [
    { patientName: 'Arthur Dent', age: 42, condition: 'Severe Dyspnea / Wheezing', priority: 'Emergency', room: 'ER Trauma 01', vitals: 'SpO2 86%, BP 155/95' },
    { patientName: 'Zoe Saldana', age: 31, condition: 'Suspected Fracture (Right Ankle)', priority: 'Urgent', room: 'X-Ray Bay 3', vitals: 'BP 120/80, Stable' },
    { patientName: 'Robert Vance', age: 67, condition: 'Acute Chest Tightness', priority: 'Emergency', room: 'Cardiac Bed 02', vitals: 'SpO2 93%, HR 110 bpm' }
  ];

  const handleSimulateEmergency = () => {
    const randomCase = sampleEmergencyCases[Math.floor(Math.random() * sampleEmergencyCases.length)];
    dispatch(addTriageAlert(randomCase));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Header with Clinical Emergency Triage */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Emergency Department Live Telemetry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <span>Critical Care & Emergency Triage</span>
            <span className="text-xs font-mono font-normal bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-lg border border-emerald-400/20">
              Live Feed
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Real-time ER triage alerts, rapid walk-in intake, trauma bay telemetry, and live hospital bed capacity management.
          </p>
        </div>

        {/* Quick Dispatch Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={handleSimulateEmergency}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Dispatch Emergency Walk-in</span>
          </button>
          <button
            type="button"
            onClick={() => dispatch(resetTriageDemo())}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
            title="Reset Store State"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mini Navigation Tabs */}
      <div className="border-b border-slate-100 bg-slate-50/70 px-6 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2 py-2">
          <button
            type="button"
            onClick={() => setActiveTab('triage')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'triage'
                ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Triage Queue ({activeCount} Active)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('state')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'state'
                ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Department Telemetry & Stream
          </button>
        </div>

        {/* Priority Filter */}
        <div className="hidden sm:flex items-center gap-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Filter:</span>
          {['ALL', 'Emergency', 'Urgent'].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => dispatch(setPriorityFilter(filter))}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                currentFilter === filter
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Bed Capacity Redux Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 bg-slate-50/40 border-b border-slate-100">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total ER Capacity</p>
          <p className="text-xl font-extrabold font-mono text-slate-800 mt-0.5">{beds.totalBeds} Beds</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Occupied</p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => dispatch(updateBedCount({ delta: -1 }))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center cursor-pointer"
                title="Decrease Occupied Beds"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => dispatch(updateBedCount({ delta: 1 }))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center cursor-pointer"
                title="Increase Occupied Beds"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-xl font-extrabold font-mono text-indigo-600 mt-0.5">{beds.occupiedBeds} Beds</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ICU Bays Available</p>
          <p className="text-xl font-extrabold font-mono text-emerald-600 mt-0.5">{beds.icuAvailable} Units</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Free Trauma Bays</p>
          <p className="text-xl font-extrabold font-mono text-amber-600 mt-0.5">{beds.erBaysFree} Free</p>
        </div>
      </div>

      {/* Tab 1: Live Triage Queue */}
      {activeTab === 'triage' && (
        <div className="p-6">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No active triage alerts</p>
                <p className="text-xs text-slate-500">Dispatch a walk-in emergency above to record incoming cases.</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    alert.resolved
                      ? 'bg-slate-50/70 border-slate-200/70 opacity-60'
                      : alert.priority === 'Emergency'
                      ? 'bg-rose-50/40 border-rose-200/80'
                      : 'bg-amber-50/40 border-amber-200/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        alert.resolved
                          ? 'bg-slate-200 text-slate-600'
                          : alert.priority === 'Emergency'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {alert.priority === 'Emergency' ? 'STAT' : 'URG'}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900">{alert.patientName}</h4>
                        <span className="text-xs text-slate-400 font-mono">({alert.age} yrs)</span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                            alert.priority === 'Emergency'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {alert.priority}
                        </span>
                        {alert.resolved && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            Resolved
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-slate-700">{alert.condition}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <span>Room: <strong className="text-slate-800">{alert.room}</strong></span>
                        <span>&bull;</span>
                        <span>Vitals: <strong className="text-slate-800">{alert.vitals}</strong></span>
                        <span>&bull;</span>
                        <span className="font-mono text-[11px] text-slate-400">{alert.timestamp}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {!alert.resolved ? (
                      <button
                        type="button"
                        onClick={() => dispatch(resolveTriageAlert(alert.id))}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Resolved</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 italic font-medium">Cleared</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Department Telemetry & Event Stream */}
      {activeTab === 'state' && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 text-slate-200 font-mono text-xs">
          {/* Live State JSON */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                <Code className="w-4 h-4" />
                <span>Triage & Bed Allocation State</span>
              </span>
              <span className="text-[10px] text-slate-400">Live Telemetry</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] overflow-x-auto max-h-72 scrollbar-thin text-emerald-400">
              {JSON.stringify(
                {
                  alertsCount: alerts.length,
                  filterPriority: currentFilter,
                  beds,
                  activeAlerts: alerts.map((a) => ({ id: a.id, patient: a.patientName, priority: a.priority, resolved: a.resolved }))
                },
                null,
                2
              )}
            </pre>
          </div>

          {/* Action Dispatch Log */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                <span>Dispatched Clinical Events Stream</span>
              </span>
              <span className="text-[10px] text-slate-400">{logs.length} Actions</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-h-72 overflow-y-auto space-y-2 text-[11px]">
              {logs.map((log) => (
                <div key={log.id} className="p-2 rounded bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-2">
                  <span className="text-indigo-300 font-semibold">{log.action}</span>
                  <span className="text-[10px] text-slate-500 shrink-0 font-mono">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
