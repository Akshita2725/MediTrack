import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels = {
  '': 'Home',
  'doctors': 'Doctors Directory',
  'patients': 'Patients Directory',
  'appointments': 'Appointments Schedule',
  'book': 'Book Appointment',
  'booking-success': 'Confirmation',
  'prescriptions': 'Prescriptions & Rx',
  'new': 'New Prescription',
  'follow-ups': 'Follow-Up Tracking',
  'teleconsult': 'Telehealth Room',
  'teleconsultation': 'Telehealth Room',
  'messages': 'Secure Messages',
  'backup': 'System & Backup',
  'portfolio': 'Credentials & Bio',
  'credentials': 'Doctor Credentials',
  'mycredentials': 'My Credentials & Bio',
  'bio': 'Physician Biography',
  'pharmacy': 'Pharmacy Store',
  'pharmacy-store': 'Pharmacy Store',
  'store': 'Pharmacy Store',
  'register': 'Patient Intake Registration',
  'api-explorer': 'REST API Hub'
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // If on the root page, no breadcrumb needed or show simple home
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto py-1 scrollbar-none">
      <Link
        to="/"
        className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Clinic Home</span>
      </Link>

      {pathnames.map((segment, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = routeLabels[segment] || (segment.startsWith('doc-') || segment.startsWith('pat-') || segment.startsWith('rx-') ? `#${segment}` : segment);

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            {isLast ? (
              <span className="font-bold text-slate-800 bg-slate-100/80 px-2 py-0.5 rounded-md shrink-0">
                {label}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-slate-600 hover:text-blue-600 transition-colors shrink-0"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
