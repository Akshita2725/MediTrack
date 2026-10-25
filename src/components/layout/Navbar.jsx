import React, { useState } from 'react';
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
  MessageSquare,
  ShoppingBag,
  UserPlus,
  Award,
  Globe,
  Sparkles,
  ClipboardList,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { RoleSwitcher } from './RoleSwitcher.jsx';
import { SearchBar } from '../common/SearchBar.jsx';
import { useLiveDateTime } from '../../hooks/useLiveDateTime.js';

export const Navbar = () => {
  const { role, currentDoctor, currentPatient, searchQuery, setSearchQuery, activeQueue, appointments } = useApp();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dateFormatted, timeFormatted } = useLiveDateTime();

  const waitingCount = activeQueue.filter((a) => a.status === 'Waiting').length;

  // Role-tailored navigation links (only showing what each role actually needs)
  const getNavLinks = () => {
    if (role === 'receptionist') {
      return [
        { to: '/', label: 'Front Desk Queue', icon: <Activity className="w-4 h-4" /> },
        {
          to: '/appointments',
          label: 'Appointments',
          icon: <Calendar className="w-4 h-4" />,
          badge: waitingCount > 0 ? `${waitingCount} waiting` : null,
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
        },
        { to: '/register', label: 'Patient Intake', icon: <UserPlus className="w-4 h-4" /> },
        { to: '/patients', label: 'Patients Directory', icon: <Users className="w-4 h-4" /> },
        { to: '/doctors', label: 'Doctors On Duty', icon: <Stethoscope className="w-4 h-4" /> },
        { to: '/backup', label: 'Data Backup', icon: <Database className="w-4 h-4" /> }
      ];
    }

    if (role === 'doctor') {
      const myWaitingCount = activeQueue.filter((a) => a.doctorId === currentDoctor?.id).length;
      return [
        { to: '/', label: 'My Clinical Desk', icon: <Activity className="w-4 h-4" /> },
        {
          to: '/appointments',
          label: 'Scheduled Patients',
          icon: <Calendar className="w-4 h-4" />,
          badge: myWaitingCount > 0 ? myWaitingCount : null,
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
        },
        { to: '/prescriptions', label: 'Rx & Prescriptions', icon: <FileText className="w-4 h-4" /> },
        { to: '/follow-ups', label: 'Follow-Ups', icon: <Clock className="w-4 h-4" /> },
        { to: '/teleconsultation', label: 'Telehealth Room', icon: <Video className="w-4 h-4" /> },
        { to: '/messages', label: 'Patient Messages', icon: <MessageSquare className="w-4 h-4" /> },
        { to: `/credentials/${currentDoctor?.id || 'doc-1'}`, label: 'My Credentials & Bio', icon: <Award className="w-4 h-4" /> }
      ];
    }

    // Default: Patient Role
    return [
      { to: '/', label: 'My Health Portal', icon: <HeartHandshake className="w-4 h-4" /> },
      { to: '/book', label: 'Book Appointment', icon: <Calendar className="w-4 h-4" /> },
      { to: '/prescriptions', label: 'My Prescriptions', icon: <FileText className="w-4 h-4" /> },
      {
        to: '/pharmacy',
        label: 'Pharmacy Store',
        icon: <ShoppingBag className="w-4 h-4" />,
        badge: totalItems > 0 ? `${totalItems}` : null,
        badgeColor: 'bg-blue-600 text-white'
      },
      { to: '/messages', label: 'Doctor Chat', icon: <MessageSquare className="w-4 h-4" /> },
      { to: '/teleconsultation', label: 'Join Telehealth', icon: <Video className="w-4 h-4" /> }
    ];
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Utility Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Current Role Badge */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-slate-900 tracking-tight">MediTrack</span>
              <span
                className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full border ${
                  role === 'receptionist'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : role === 'doctor'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}
              >
                {role === 'receptionist' ? 'Front Desk' : role === 'doctor' ? 'Physician' : 'Patient Portal'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              {role === 'receptionist' && 'Reception, intake & patient triage flow'}
              {role === 'doctor' && `Dr. ${currentDoctor?.name?.replace('Dr. ', '') || 'Physician'} • ${currentDoctor?.specialty || 'General'}`}
              {role === 'patient' && `Welcome, ${currentPatient?.name || 'Patient'} • Health Records`}
            </p>
          </div>
        </Link>

        {/* Global Live Search Bar */}
        <div className="hidden lg:block flex-1 max-w-xs">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={
              role === 'receptionist'
                ? 'Search queue, patients, doctors...'
                : role === 'doctor'
                ? 'Search patients, prescriptions...'
                : 'Search medications, doctors...'
            }
          />
        </div>

        {/* Role Switcher & Contextual Quick Actions */}
        <div className="flex items-center gap-2.5">
          <RoleSwitcher />

          {/* Patient: Quick Shopping Cart Button */}
          {role === 'patient' && (
            <Link
              to="/pharmacy"
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors border border-slate-200/80 shadow-2xs"
              title="View Pharmacy Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Receptionist Quick CTA */}
          {role === 'receptionist' && (
            <Link
              to="/register"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:scale-95 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ New Patient</span>
            </Link>
          )}

          {/* Doctor Quick CTA */}
          {role === 'doctor' && (
            <Link
              to="/prescriptions/new"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs active:scale-95 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>+ Write Rx</span>
            </Link>
          )}

          {/* Patient Quick CTA */}
          {role === 'patient' && (
            <Link
              to="/book"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs active:scale-95 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </Link>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar (Clean, Uncongested) */}
      <div className="border-t border-slate-100 bg-slate-50/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 py-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-2xs border border-slate-200/90'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      link.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Discreet Learning / Tools Link */}
            <div className="ml-auto pl-4 border-l border-slate-200 flex items-center gap-2 text-xs">
              <NavLink
                to="/api-explorer"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors ${
                    isActive ? 'bg-slate-200/70 text-slate-900 font-bold' : ''
                  }`
                }
                title="Curriculum REST API & GitHub explorer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">API & Research Hub</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-xl">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search..."
          />
          <div className="flex flex-col gap-1.5 pt-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between p-2.5 rounded-xl text-xs font-bold ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${link.badgeColor || 'bg-slate-100 text-slate-800'}`}>
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}

            <NavLink
              to="/api-explorer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50"
            >
              <Globe className="w-4 h-4" />
              <span>API Explorer & GitHub Viewer</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
