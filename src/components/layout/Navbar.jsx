import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Activity,
  Calendar,
  Users,
  Stethoscope,
  FileText,
  Clock,
  PlusCircle,
  Video,
  Database,
  Menu,
  X,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { RoleSwitcher } from './RoleSwitcher.jsx';
import { SearchBar } from '../common/SearchBar.jsx';
import { useLiveDateTime } from '../../hooks/useLiveDateTime.js';

export const Navbar = () => {
  const { role, currentDoctor, currentPatient, searchQuery, setSearchQuery, activeQueue, appointments } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { dateFormatted, timeFormatted } = useLiveDateTime();

  const waitingCount = activeQueue.filter(a => a.status === 'Waiting').length;

  const getNavLinks = () => {
    return [
      { to: '/', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
      {
        to: '/appointments',
        label: 'Appointments',
        icon: <Calendar className="w-4 h-4" />,
        badge: waitingCount > 0 ? waitingCount : null
      },
      { to: '/doctors', label: 'Doctors', icon: <Stethoscope className="w-4 h-4" /> },
      { to: '/patients', label: 'Patients', icon: <Users className="w-4 h-4" /> },
      { to: '/prescriptions', label: 'Prescriptions', icon: <FileText className="w-4 h-4" /> },
      { to: '/follow-ups', label: 'Follow-Ups', icon: <Clock className="w-4 h-4" /> },
      { to: '/messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
      { to: '/teleconsultation', label: 'Telehealth', icon: <Video className="w-4 h-4" /> },
      { to: '/backup', label: 'Backup', icon: <Database className="w-4 h-4" /> }
    ];
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
      {/* Top Utility Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all duration-200">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base text-slate-900 tracking-tight">MediTrack</span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/70">
                Clinic OS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Next-Gen Healthcare Management</p>
          </div>
        </Link>

        {/* Global Live Search Bar */}
        <div className="hidden md:block flex-1 max-w-xs">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search patients, doctors, drugs..."
          />
        </div>

        {/* Live Date & Time Chip */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{dateFormatted}</span>
          <span className="text-slate-300">|</span>
          <span className="font-mono font-bold text-blue-700">{timeFormatted}</span>
        </div>

        {/* Global Role Switcher */}
        <div className="flex items-center gap-2.5">
          <RoleSwitcher />

          {/* Quick Book Appointment CTA */}
          <Link
            to="/book"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xs shadow-blue-500/25 active:scale-[0.98] transition-all flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book Visit</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="border-t border-slate-100 bg-slate-50/70 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-1.5">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-2xs border border-slate-200/90'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search patients, doctors, drugs..."
          />
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-auto px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <PlusCircle className="w-4 h-4" /> Book Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
