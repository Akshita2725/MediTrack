import { createSlice } from '@reduxjs/toolkit';

const initialAlerts = [
  {
    id: 'alt-101',
    patientName: 'David Lee',
    age: 44,
    condition: 'Acute Asthma Exacerbation',
    priority: 'Emergency',
    room: 'ER Bay 02',
    timestamp: '10:45 AM',
    vitals: 'SpO2 88%, HR 118 bpm',
    resolved: false
  },
  {
    id: 'alt-102',
    patientName: 'Maria Garcia',
    age: 58,
    condition: 'Chest Discomfort / Diaphoretic',
    priority: 'Urgent',
    room: 'Triage Room 1',
    timestamp: '11:10 AM',
    vitals: 'BP 160/95, HR 92 bpm',
    resolved: false
  },
  {
    id: 'alt-103',
    patientName: 'Emma Watson',
    age: 29,
    condition: 'Deep Laceration (Forearm)',
    priority: 'Urgent',
    room: 'Minor Procedures',
    timestamp: '11:30 AM',
    vitals: 'BP 118/74, Stable',
    resolved: false
  }
];

const triageSlice = createSlice({
  name: 'triage',
  initialState: {
    alerts: initialAlerts,
    beds: {
      totalBeds: 30,
      occupiedBeds: 21,
      icuAvailable: 3,
      erBaysFree: 4
    },
    filterPriority: 'ALL',
    historyLogs: [
      { id: 'log-1', action: 'INITIAL_STATE_LOADED', timestamp: 'System Initialized' }
    ]
  },
  reducers: {
    addTriageAlert: (state, action) => {
      const newAlert = {
        id: `alt-${Date.now().toString().slice(-4)}`,
        patientName: action.payload.patientName || 'Emergency Walk-in',
        age: action.payload.age || 35,
        condition: action.payload.condition || 'Immediate Triage Assessment Required',
        priority: action.payload.priority || 'Emergency',
        room: action.payload.room || 'ER Trauma Bay 01',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        vitals: action.payload.vitals || 'Vitals Pending',
        resolved: false
      };
      state.alerts.unshift(newAlert);
      state.historyLogs.unshift({
        id: `log-${Date.now()}`,
        action: `DISPATCH: addTriageAlert for ${newAlert.patientName} (${newAlert.priority})`,
        timestamp: new Date().toLocaleTimeString()
      });
      if (state.beds.erBaysFree > 0) {
        state.beds.erBaysFree -= 1;
        state.beds.occupiedBeds += 1;
      }
    },
    resolveTriageAlert: (state, action) => {
      const alertId = action.payload;
      const target = state.alerts.find((a) => a.id === alertId);
      if (target) {
        target.resolved = true;
        state.historyLogs.unshift({
          id: `log-${Date.now()}`,
          action: `DISPATCH: resolveTriageAlert (ID: ${alertId})`,
          timestamp: new Date().toLocaleTimeString()
        });
        if (state.beds.erBaysFree < 10) {
          state.beds.erBaysFree += 1;
          state.beds.occupiedBeds = Math.max(0, state.beds.occupiedBeds - 1);
        }
      }
    },
    setPriorityFilter: (state, action) => {
      state.filterPriority = action.payload;
      state.historyLogs.unshift({
        id: `log-${Date.now()}`,
        action: `DISPATCH: setPriorityFilter (${action.payload})`,
        timestamp: new Date().toLocaleTimeString()
      });
    },
    updateBedCount: (state, action) => {
      const { delta } = action.payload;
      const newOccupied = Math.max(0, Math.min(state.beds.totalBeds, state.beds.occupiedBeds + delta));
      state.beds.occupiedBeds = newOccupied;
      state.historyLogs.unshift({
        id: `log-${Date.now()}`,
        action: `DISPATCH: updateBedCount (occupied: ${newOccupied})`,
        timestamp: new Date().toLocaleTimeString()
      });
    },
    resetTriageDemo: (state) => {
      state.alerts = initialAlerts;
      state.beds = {
        totalBeds: 30,
        occupiedBeds: 21,
        icuAvailable: 3,
        erBaysFree: 4
      };
      state.filterPriority = 'ALL';
      state.historyLogs.unshift({
        id: `log-${Date.now()}`,
        action: 'DISPATCH: resetTriageDemo',
        timestamp: new Date().toLocaleTimeString()
      });
    }
  }
});

export const {
  addTriageAlert,
  resolveTriageAlert,
  setPriorityFilter,
  updateBedCount,
  resetTriageDemo
} = triageSlice.actions;

// Selectors
export const selectTriageAlerts = (state) => {
  if (state.triage.filterPriority === 'ALL') {
    return state.triage.alerts;
  }
  return state.triage.alerts.filter((a) => a.priority === state.triage.filterPriority);
};

export const selectActiveAlertsCount = (state) =>
  state.triage.alerts.filter((a) => !a.resolved).length;

export const selectBedStatistics = (state) => state.triage.beds;
export const selectTriageLogs = (state) => state.triage.historyLogs;
export const selectFilterPriority = (state) => state.triage.filterPriority;

export default triageSlice.reducer;
