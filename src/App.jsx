import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { Layout } from './components/layout/Layout.jsx';

// Pages
import { DashboardPage } from './pages/DashboardPage.jsx';
import { DoctorsPage } from './pages/DoctorsPage.jsx';
import { DoctorProfilePage } from './pages/DoctorProfilePage.jsx';
import { PatientsPage } from './pages/PatientsPage.jsx';
import { PatientProfilePage } from './pages/PatientProfilePage.jsx';
import { AppointmentsPage } from './pages/AppointmentsPage.jsx';
import { BookingPage } from './pages/BookingPage.jsx';
import { BookingSuccessPage } from './pages/BookingSuccessPage.jsx';
import { PrescriptionsListPage } from './pages/PrescriptionsListPage.jsx';
import { PrescriptionFormPage } from './pages/PrescriptionFormPage.jsx';
import { PrescriptionDetailsPage } from './pages/PrescriptionDetailsPage.jsx';
import { FollowUpsPage } from './pages/FollowUpsPage.jsx';
import { TeleconsultationPage } from './pages/TeleconsultationPage.jsx';
import { MessagesPage } from './pages/MessagesPage.jsx';
import { BackupPage } from './pages/BackupPage.jsx';

// Syllabus Topic Mini Projects & Features
import { DoctorPortfolioPage } from './pages/DoctorPortfolioPage.jsx';
import { PharmacyStorePage } from './pages/PharmacyStorePage.jsx';
import { RegistrationPage } from './pages/RegistrationPage.jsx';

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctor/:id" element={<DoctorProfilePage />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/patient/:id" element={<PatientProfilePage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/book" element={<BookingPage />} />
                <Route path="/book/success" element={<BookingSuccessPage />} />
                <Route path="/booking-success" element={<BookingSuccessPage />} />
                <Route path="/prescriptions" element={<PrescriptionsListPage />} />
                <Route path="/prescriptions/new" element={<PrescriptionFormPage />} />
                <Route path="/prescriptions/:id" element={<PrescriptionDetailsPage />} />
                <Route path="/follow-ups" element={<FollowUpsPage />} />
                <Route path="/teleconsult" element={<TeleconsultationPage />} />
                <Route path="/teleconsultation" element={<TeleconsultationPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/backup" element={<BackupPage />} />

                {/* Doctor Credentials, Bio & Portfolio Routes */}
                <Route path="/portfolio" element={<DoctorPortfolioPage />} />
                <Route path="/portfolio/:id" element={<DoctorPortfolioPage />} />
                <Route path="/credentials" element={<DoctorPortfolioPage />} />
                <Route path="/credentials/:id" element={<DoctorPortfolioPage />} />
                <Route path="/mycredentials" element={<DoctorPortfolioPage />} />
                <Route path="/mycredentials/:id" element={<DoctorPortfolioPage />} />
                <Route path="/bio" element={<DoctorPortfolioPage />} />
                <Route path="/bio/:id" element={<DoctorPortfolioPage />} />
                <Route path="/doctor/:id/credentials" element={<DoctorPortfolioPage />} />
                <Route path="/doctor/:id/bio" element={<DoctorPortfolioPage />} />
                <Route path="/pharmacy" element={<PharmacyStorePage />} />
                <Route path="/pharmacy-store" element={<PharmacyStorePage />} />
                <Route path="/store" element={<PharmacyStorePage />} />
                <Route path="/register" element={<RegistrationPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </CartProvider>
    </ToastProvider>
  );
}
