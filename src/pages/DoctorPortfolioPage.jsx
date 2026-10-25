import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Stethoscope,
  Award,
  BookOpen,
  Calendar,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Shield,
  FileCheck,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Building,
  GraduationCap,
  Globe,
  Quote,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Tabs } from '../components/common/Tabs.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { getDoctorCredentials } from '../data/doctorCredentials.js';

export const DoctorPortfolioPage = () => {
  const { doctors, currentDoctor, setCurrentDoctorId, setRole } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Find active doctor from route param, or fallback to currently active doctor, or first doctor
  const activeDoctor = useMemo(() => {
    if (id) {
      const found = doctors.find((d) => d.id === id);
      if (found) return found;
    }
    return currentDoctor || doctors[0] || {
      id: 'doc-1',
      name: 'Dr. Aneez Patel',
      specialty: 'Cardiology',
      qualification: 'MD, DM (Cardiology), FACC',
      experienceYears: 14,
      clinicAddress: 'Suite 402, MediTrack Central Heart & Vascular Wing',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviewCount: 142
    };
  }, [id, doctors, currentDoctor]);

  // Load individual authentic credentials dataset for the active doctor
  const creds = useMemo(() => {
    return getDoctorCredentials(activeDoctor);
  }, [activeDoctor]);

  // Determine initial tab based on route URL
  const initialTab = useMemo(() => {
    const path = (location.pathname || '').toLowerCase();
    if (path.includes('/credentials') || path.includes('/mycredentials')) return 'credentials';
    if (path.includes('/bio')) return 'bio';
    if (path.includes('/education')) return 'education';
    if (path.includes('/publications') || path.includes('/research')) return 'publications';
    if (path.includes('/reviews') || path.includes('/testimonials')) return 'reviews';
    if (path.includes('/schedule')) return 'schedule';
    return 'bio';
  }, [location.pathname]);

  // Portfolio active tab state
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const portfolioTabs = [
    { id: 'bio', label: 'Biography & Focus', icon: Stethoscope },
    { id: 'credentials', label: 'Credentials & Licenses', icon: Award },
    { id: 'education', label: 'Education & Training', icon: GraduationCap },
    { id: 'publications', label: 'Research & Publications', icon: BookOpen, badge: creds.publications?.length || 0 },
    { id: 'reviews', label: 'Patient Testimonials', icon: Star, badge: activeDoctor.reviewCount || creds.reviews?.length || 0 },
    { id: 'schedule', label: 'Clinic Hours & Booking', icon: Calendar }
  ];

  const handleSelectDoctor = (docId) => {
    setCurrentDoctorId(docId);
    const path = (location.pathname || '').toLowerCase();
    if (path.includes('/mycredentials')) {
      navigate(`/mycredentials/${docId}`);
    } else if (path.includes('/bio')) {
      navigate(`/bio/${docId}`);
    } else {
      navigate(`/credentials/${docId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            MediTrack
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/doctors" className="hover:text-blue-600 transition-colors">
            Staff Directory
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold">{activeDoctor.name} Credentials & Bio</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>State Board Verified &amp; Active</span>
          </span>
          <span className="text-xs font-mono font-semibold text-slate-500 hidden md:inline">
            License: {creds.licenseNumber}
          </span>
        </div>
      </div>

      {/* Doctor Portfolio Selector Pill Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 px-2">
          Select Physician:
        </span>
        {doctors.map((doc) => {
          const isSelected = doc.id === activeDoctor.id;
          return (
            <button
              key={doc.id}
              onClick={() => handleSelectDoctor(doc.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <img
                src={doc.avatar}
                alt={doc.name}
                className="w-5 h-5 rounded-full object-cover shrink-0"
              />
              <span>{doc.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-500'}`}>
                {doc.specialty}
              </span>
            </button>
          );
        })}
      </div>

      {/* Doctor Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={activeDoctor.avatar}
                alt={activeDoctor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md ring-1 ring-slate-200"
              />
              <div
                className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-xl shadow-xs"
                title="Verified & Board Certified"
              >
                <Shield className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {activeDoctor.name}
                </h1>
                <Badge variant="primary" className="text-xs">
                  {activeDoctor.specialty}
                </Badge>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-md border border-emerald-200">
                  Board Certified
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-blue-700">
                {creds.title || activeDoctor.qualification}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{activeDoctor.rating || 4.9}</span>
                  <span className="text-slate-500 font-medium">({activeDoctor.reviewCount || 140} reviews)</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {activeDoctor.experienceYears || creds.experienceYears || 12} years clinical practice
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {activeDoctor.clinicAddress || creds.clinicAddress}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                <span>License: <strong className="font-mono text-slate-700">{creds.licenseNumber}</strong></span>
                <span>&bull;</span>
                <span>NPI: <strong className="font-mono text-slate-700">{creds.npiNumber}</strong></span>
                <span>&bull;</span>
                <span>Languages: <strong className="text-slate-700">{creds.languages?.join(', ')}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2.5 w-full md:w-auto">
            <Link
              to={`/book?doctor=${activeDoctor.id}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setCurrentDoctorId(activeDoctor.id);
                setRole('doctor');
                navigate('/');
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              <span>Switch Workspace</span>
            </button>

            <Link
              to={`/doctor/${activeDoctor.id}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <span>View Clinic Schedule</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 border-t border-slate-100 pt-4">
          <Tabs tabs={portfolioTabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* Tab 1: Biography & Clinical Focus */}
        {activeTab === 'bio' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 space-y-5">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Stethoscope className="w-4 h-4 text-blue-600" />
                <span>Clinical Biography & Practice Philosophy</span>
              </h2>

              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100/80 flex items-start gap-3">
                <Quote className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed italic">
                  "{creds.philosophy}"
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  {activeDoctor.about || `${activeDoctor.name} is a dedicated specialist in ${activeDoctor.specialty} with over ${activeDoctor.experienceYears || 12} years of active clinical practice.`}
                </p>
                <p>
                  With comprehensive diagnostic capabilities and ongoing commitment to clinical quality, {activeDoctor.name} has managed high-acuity inpatient cases and specialized outpatient consultations with an emphasis on evidence-based therapies, precision triage, and compassionate patient communication.
                </p>
              </div>

              {/* Core Clinical Focus & Treated Conditions */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Specialized Clinical Focus &amp; Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(activeDoctor.clinicalInterests || [
                    `${activeDoctor.specialty} Diagnostics`,
                    'Preventive Screening',
                    'Complex Pathology Management',
                    'Outpatient Care Plans'
                  ]).map((interest) => (
                    <span
                      key={interest}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pathologies &amp; Conditions Treated
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(activeDoctor.diseasesTreated || [
                    'Acute & Chronic Consultations',
                    'Pre-operative Evaluations',
                    'Long-Term Maintenance'
                  ]).map((disease) => (
                    <div
                      key={disease}
                      className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 border border-slate-100"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{disease}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Right Column: Affiliations & Practice Details */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Hospital Affiliations &amp; Societies</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {(creds.affiliations || []).map((affil, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-700">{affil}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Languages Spoken
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {creds.languages?.map((lang) => (
                      <span
                        key={lang}
                        className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Direct Contact
                  </span>
                  <p className="text-xs font-medium text-slate-600 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeDoctor.phone || '+1 (555) 234-8901'}</span>
                  </p>
                  <p className="text-xs font-medium text-slate-600 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeDoctor.email || `${activeDoctor.id}@meditrack.org`}</span>
                  </p>
                </div>
              </Card>

              {/* Honors & Awards */}
              {creds.awards && creds.awards.length > 0 && (
                <Card className="p-6 space-y-3">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Clinical Honors &amp; Awards</span>
                  </h3>
                  <div className="space-y-2.5">
                    {creds.awards.map((award, idx) => (
                      <div key={idx} className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs">
                        <strong className="font-bold text-amber-950 block">{award.title}</strong>
                        <span className="text-amber-800/80 font-medium text-[11px]">
                          {award.issuer} &bull; {award.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Credentials & Certifications */}
        {activeTab === 'credentials' && (
          <div className="space-y-6">
            <Card className="p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>Medical Specialty Board Certifications</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Certified by national accrediting medical specialty examination boards
                  </p>
                </div>
                <Badge variant="success">All Active &amp; in Good Standing</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(creds.boardCertifications || []).map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {cert.name}
                      </h4>
                      <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                        Since {cert.year}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{cert.board}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold pt-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Verified Active Credential</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Official Medical Licensing & Identifiers */}
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>State Licensing &amp; National Medical Identifiers</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                    State Medical License
                  </span>
                  <strong className="text-slate-900 text-sm font-mono font-bold block">
                    {creds.licenseNumber}
                  </strong>
                  <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Unrestricted License
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                    National Provider ID (NPI)
                  </span>
                  <strong className="text-slate-900 text-sm font-mono font-bold block">
                    {creds.npiNumber}
                  </strong>
                  <span className="text-slate-500 text-xs font-medium">
                    Federal Registry Certified
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                    Practice Seniority
                  </span>
                  <strong className="text-slate-900 text-sm font-bold block">
                    {activeDoctor.experienceYears || creds.experienceYears || 12} Years
                  </strong>
                  <span className="text-blue-600 text-xs font-semibold">
                    Attending Medical Staff
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 3: Education & Training */}
        {activeTab === 'education' && (
          <Card className="p-6 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Medical School, Residency &amp; Post-Graduate Training</span>
            </h2>

            <div className="divide-y divide-slate-100">
              {(creds.education || []).map((edu, idx) => (
                <div
                  key={idx}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-xs text-slate-600 font-medium">{edu.institution}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg self-start sm:self-center">
                    Class of {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 4: Research & Publications */}
        {activeTab === 'publications' && (
          <Card className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Peer-Reviewed Clinical Papers &amp; Studies</span>
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                {creds.publications?.length || 0} indexed research papers
              </span>
            </div>

            <div className="space-y-3">
              {(creds.publications || []).map((pub, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xs transition-all space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {pub.title}
                    </h4>
                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md shrink-0">
                      {pub.year}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 italic">
                    {pub.journal}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono pt-1">
                    <span>Citations: {pub.citations}</span>
                    <span>&bull;</span>
                    <span>DOI: {pub.doi}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 5: Patient Testimonials */}
        {activeTab === 'reviews' && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Verified Patient Testimonials &amp; Outcomes</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {activeDoctor.rating} ★ Average Rating
              </span>
            </div>

            <div className="space-y-3">
              {(creds.reviews || []).map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                        {rev.author[0]}
                      </div>
                      <span className="text-xs font-bold text-slate-800">{rev.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <span>★ {rev.rating}</span>
                      <span className="text-slate-400 font-normal ml-1">({rev.date})</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 6: Schedule & Office Hours */}
        {activeTab === 'schedule' && (
          <Card className="p-6 space-y-5">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Clinical Timetable &amp; Bookable Slots</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 space-y-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  Operating Days
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(activeDoctor.availability?.days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']).map((day) => (
                    <span
                      key={day}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200/80"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 space-y-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  Consultation Hours &amp; Fee
                </span>
                <p className="text-xs font-bold text-slate-800">
                  {activeDoctor.availability?.hours || '09:00 AM - 04:00 PM'}
                </p>
                <p className="text-xs text-blue-700 font-bold">
                  Standard Session Fee: ${activeDoctor.fee || 70}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">
                Bookable Daily Time Slots:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(activeDoctor.availability?.slots || ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM']).map((slot) => (
                  <div
                    key={slot}
                    className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center font-mono text-xs font-bold text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-500 font-medium">
                Ready to schedule a clinical consultation with {activeDoctor.name}?
              </p>
              <Link
                to={`/book?doctor=${activeDoctor.id}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs text-center"
              >
                Schedule Appointment Now
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
