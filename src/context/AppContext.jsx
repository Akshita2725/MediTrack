import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import {
  INITIAL_DOCTORS,
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_FOLLOW_UPS,
  INITIAL_MESSAGES,
  INITIAL_CONVERSATIONS
} from '../data/initialData.js';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [role, setRole] = useLocalStorage('meditrack_v2026_role', 'receptionist');
  const [currentDoctorId, setCurrentDoctorId] = useLocalStorage('meditrack_v2026_doctor_id', 'doc-1');
  const [currentPatientId, setCurrentPatientId] = useLocalStorage('meditrack_v2026_patient_id', 'pat-1');

  const [doctors, setDoctors] = useLocalStorage('meditrack_v2026_doctors', INITIAL_DOCTORS);
  const [patients, setPatients] = useLocalStorage('meditrack_v2026_patients', INITIAL_PATIENTS);
  const [appointments, setAppointments] = useLocalStorage('meditrack_v2026_appointments', INITIAL_APPOINTMENTS);
  const [prescriptions, setPrescriptions] = useLocalStorage('meditrack_v2026_prescriptions', INITIAL_PRESCRIPTIONS);
  const [followUps, setFollowUps] = useLocalStorage('meditrack_v2026_followups', INITIAL_FOLLOW_UPS);
  const [messages, setMessages] = useLocalStorage('meditrack_v2026_messages', INITIAL_MESSAGES);
  const [conversations, setConversations] = useLocalStorage('meditrack_v2026_conversations', INITIAL_CONVERSATIONS);

  const [searchQuery, setSearchQuery] = useLocalStorage('meditrack_v2026_search', '');
  const [repeatPrescriptionData, setRepeatPrescriptionData] = useLocalStorage('meditrack_v2026_repeat_rx', null);

  // Active Doctor / Patient objects
  const currentDoctor = useMemo(() => {
    return doctors.find(d => d.id === currentDoctorId) || doctors[0];
  }, [doctors, currentDoctorId]);

  const currentPatient = useMemo(() => {
    return patients.find(p => p.id === currentPatientId) || patients[0];
  }, [patients, currentPatientId]);

  // Derived Active Queue:
  // "completed appointments should be removed from the queue when marked completed"
  const activeQueue = useMemo(() => {
    return appointments
      .filter(apt => apt.status !== 'Completed' && apt.status !== 'Cancelled')
      .sort((a, b) => a.queueNumber - b.queueNumber);
  }, [appointments]);

  const completedAppointments = useMemo(() => {
    return appointments
      .filter(apt => apt.status === 'Completed')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [appointments]);

  // Appointment creation
  const addAppointment = useCallback((bookingData) => {
    const doctor = doctors.find(d => d.id === bookingData.doctorId) || doctors[0];
    const newQueueNum = appointments.length + 1;
    const newId = `apt-${Date.now()}`;

    const newAppointment = {
      id: newId,
      queueNumber: newQueueNum,
      patientId: bookingData.patientId,
      patientName: bookingData.patientName,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date: bookingData.date,
      time: bookingData.time,
      consultationType: bookingData.consultationType,
      symptoms: bookingData.symptoms,
      status: 'Scheduled',
      notes: bookingData.notes || '',
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  }, [doctors, appointments.length, setAppointments]);

  // Status updating:
  // "the receptionist should be able to select or change the status of an appointment or consultation"
  // "completed appointments should be removed from the queue when marked completed"
  const updateAppointmentStatus = useCallback((appointmentId, newStatus) => {
    setAppointments(prev =>
      prev.map(apt => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            status: newStatus
          };
        }
        return apt;
      })
    );
  }, [setAppointments]);

  const cancelAppointment = useCallback((appointmentId) => {
    updateAppointmentStatus(appointmentId, 'Cancelled');
  }, [updateAppointmentStatus]);

  // Prescription creation
  const addPrescription = useCallback((prescriptionData) => {
    const doctor = doctors.find(d => d.id === prescriptionData.doctorId) || currentDoctor || doctors[0];
    const patient = patients.find(p => p.id === prescriptionData.patientId) || patients[0];
    const newId = `rx-${Date.now()}`;

    const newPrescription = {
      id: newId,
      appointmentId: prescriptionData.appointmentId,
      patientId: patient.id,
      patientName: patient.name,
      patientAge: patient.age,
      patientAllergies: patient.allergies || ['None known'],
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorQualification: doctor.qualification,
      date: new Date().toISOString().split('T')[0],
      symptoms: prescriptionData.symptoms,
      diagnosis: prescriptionData.diagnosis,
      notes: prescriptionData.notes || '',
      medicines: prescriptionData.medicines,
      followUpDate: prescriptionData.followUpDate,
      createdAt: new Date().toISOString()
    };

    setPrescriptions(prev => [newPrescription, ...prev]);

    // If a follow-up date was set, automatically create follow-up item
    if (prescriptionData.followUpDate) {
      const newFollowUp = {
        id: `fup-${Date.now()}`,
        patientId: patient.id,
        patientName: patient.name,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        dueDate: prescriptionData.followUpDate,
        diagnosis: prescriptionData.diagnosis,
        notes: `Follow-up review for prescription #${newId}`,
        status: 'Pending',
        contact: patient.contact
      };
      setFollowUps(prev => [newFollowUp, ...prev]);
    }

    return newPrescription;
  }, [doctors, currentDoctor, patients, setPrescriptions, setFollowUps]);

  // Follow-Up items
  const addFollowUp = useCallback((followUpData) => {
    const newId = `fup-${Date.now()}`;
    const newFollowUp = {
      id: newId,
      ...followUpData,
      status: 'Pending'
    };
    setFollowUps(prev => [newFollowUp, ...prev]);
    return newFollowUp;
  }, [setFollowUps]);

  const updateFollowUpStatus = useCallback((followUpId, status) => {
    setFollowUps(prev =>
      prev.map(f => (f.id === followUpId ? { ...f, status } : f))
    );
  }, [setFollowUps]);

  // Patient creation
  const addPatient = useCallback((patientData) => {
    const newId = `pat-${Date.now()}`;
    const newPatient = {
      id: newId,
      ...patientData,
      avatar: patientData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setPatients(prev => [...prev, newPatient]);
    return newPatient;
  }, [setPatients]);

  // Doctor creation
  const addDoctor = useCallback((doctorData) => {
    const newId = `doc-${Date.now()}`;
    const newDoctor = {
      id: newId,
      ...doctorData,
      avatar: doctorData.avatar || 'https://images.unsplash.com/photo-1594824813589-4081c7e997a6?w=300&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewCount: 1
    };
    setDoctors(prev => [...prev, newDoctor]);
    return newDoctor;
  }, [setDoctors]);

  const updateDoctorDutyStatus = useCallback((doctorId, dutyStatus) => {
    setDoctors(prev =>
      prev.map(d => (d.id === doctorId ? { ...d, dutyStatus } : d))
    );
  }, [setDoctors]);

  // Messages
  const sendMessage = useCallback((arg1, arg2, arg3) => {
    let recipientId, text, isDoctorNote = false;
    if (typeof arg1 === 'object' && arg1 !== null) {
      recipientId = arg1.recipientId || arg1.receiverId;
      text = arg1.text || arg1.content || '';
      isDoctorNote = Boolean(arg1.isDoctorNote);
    } else {
      recipientId = arg1;
      text = arg2 || '';
      isDoctorNote = Boolean(arg3);
    }

    const sender = role === 'doctor' ? currentDoctor : currentPatient;
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: sender?.id || 'unknown',
      senderName: sender?.name || 'User',
      senderRole: role,
      recipientId,
      receiverId: recipientId,
      text,
      content: text,
      timestamp: new Date().toISOString(),
      isDoctorNote
    };
    setMessages(prev => [...prev, newMsg]);
    return newMsg;
  }, [role, currentDoctor, currentPatient, setMessages]);

  // Reset to demo data
  const resetToDemoData = useCallback(() => {
    setDoctors(INITIAL_DOCTORS);
    setPatients(INITIAL_PATIENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setFollowUps(INITIAL_FOLLOW_UPS);
    setMessages(INITIAL_MESSAGES);
    setConversations(INITIAL_CONVERSATIONS);
    setRole('receptionist');
    setCurrentDoctorId('doc-1');
    setCurrentPatientId('pat-1');
    setSearchQuery('');
    setRepeatPrescriptionData(null);
  }, [
    setDoctors,
    setPatients,
    setAppointments,
    setPrescriptions,
    setFollowUps,
    setMessages,
    setConversations,
    setRole,
    setCurrentDoctorId,
    setCurrentPatientId,
    setSearchQuery,
    setRepeatPrescriptionData
  ]);

  // Export JSON
  const exportJsonData = useCallback(() => {
    const data = {
      doctors,
      patients,
      appointments,
      prescriptions,
      followUps,
      messages,
      exportedAt: new Date().toISOString(),
      version: '2026.08.17-js'
    };
    return JSON.stringify(data, null, 2);
  }, [doctors, patients, appointments, prescriptions, followUps, messages]);

  // Import JSON
  const importJsonData = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.doctors && Array.isArray(parsed.doctors)) setDoctors(parsed.doctors);
      if (parsed.patients && Array.isArray(parsed.patients)) setPatients(parsed.patients);
      if (parsed.appointments && Array.isArray(parsed.appointments)) setAppointments(parsed.appointments);
      if (parsed.prescriptions && Array.isArray(parsed.prescriptions)) setPrescriptions(parsed.prescriptions);
      if (parsed.followUps && Array.isArray(parsed.followUps)) setFollowUps(parsed.followUps);
      if (parsed.messages && Array.isArray(parsed.messages)) setMessages(parsed.messages);
      return { success: true, message: 'MediTrack clinic dataset restored successfully!' };
    } catch (e) {
      return { success: false, message: 'Invalid JSON file: ' + (e?.message || 'Parse error') };
    }
  }, [setDoctors, setPatients, setAppointments, setPrescriptions, setFollowUps, setMessages]);

  const value = {
    role,
    setRole,
    currentDoctor,
    currentDoctorId,
    setCurrentDoctorId,
    currentPatient,
    currentPatientId,
    setCurrentPatientId,
    doctors,
    patients,
    appointments,
    activeQueue,
    completedAppointments,
    prescriptions,
    followUps,
    messages,
    conversations,
    searchQuery,
    setSearchQuery,
    repeatPrescriptionData,
    setRepeatPrescriptionData,
    addAppointment,
    updateAppointmentStatus,
    cancelAppointment,
    addPrescription,
    addFollowUp,
    updateFollowUpStatus,
    addPatient,
    addDoctor,
    setDoctors,
    updateDoctorDutyStatus,
    sendMessage,
    resetToDemoData,
    resetToDefault: resetToDemoData,
    importJsonData,
    importData: importJsonData,
    exportJsonData,
    exportData: exportJsonData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
