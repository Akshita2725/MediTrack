import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Activity, ShieldCheck, HeartPulse } from 'lucide-react';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <HeartPulse className="w-4 h-4 text-blue-600" />
            <span>MediTrack &bull; Clinical Healthcare Operations</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> HIPAA / EHR Standards Ready
            </span>
            <span>&bull;</span>
            <span>Real-time Triage</span>
            <span>&bull;</span>
            <span>v2.5 High-Density</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
