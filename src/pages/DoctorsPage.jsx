import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Star,
  Clock,
  MapPin,
  Calendar,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Award,
  Video,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';

export const DoctorsPage = () => {
  const { doctors, role, setCurrentDoctorId, setRole } = useApp();
  const navigate = useNavigate();

  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('ALL');

  // Extract all distinct specialties
  const specialties = useMemo(() => {
    return Array.from(new Set(doctors.map(d => d.specialty)));
  }, [doctors]);

  // Filtered Doctors list
  const filteredDoctors = useMemo(() => {
    let list = doctors;

    if (selectedSpecialty !== 'ALL') {
      list = list.filter(d => d.specialty === selectedSpecialty);
    }

    if (experienceFilter === '10+') {
      list = list.filter(d => d.experienceYears >= 10);
    } else if (experienceFilter === '15+') {
      list = list.filter(d => d.experienceYears >= 15);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.diseasesTreated.some(dis => dis.toLowerCase().includes(q)) ||
          d.clinicalInterests.some(ci => ci.toLowerCase().includes(q))
      );
    }

    return list;
  }, [doctors, selectedSpecialty, experienceFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Specialist Directory & Clinical Faculty"
        subtitle="Explore specialized medical departments, physician credentials, operating hours, and consult faculty members."
      />

      {/* Specialty Filter Segment Ribbon */}
      <Card className="p-4.5 bg-white space-y-3.5 shadow-xs border border-slate-200/90">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedSpecialty('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                selectedSpecialty === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Departments ({doctors.length})
            </button>
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  selectedSpecialty === spec
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by physician, condition..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-600">Seniority Filter:</span>
            <select
              value={experienceFilter}
              onChange={e => setExperienceFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700 outline-none font-semibold cursor-pointer"
            >
              <option value="ALL">All Seniority</option>
              <option value="10+">10+ Years Experience</option>
              <option value="15+">15+ Years (Senior Consultants)</option>
            </select>
          </div>
          <span className="font-medium text-slate-400">
            Displaying <strong className="text-slate-700">{filteredDoctors.length}</strong> specialized physicians
          </span>
        </div>
      </Card>

      {/* High-Density Doctor Cards Grid */}
      {filteredDoctors.length === 0 ? (
        <EmptyState
          icon={<Stethoscope className="w-10 h-10 text-slate-400" />}
          title="No Medical Specialists Found"
          description="Try selecting another clinical department or clearing your search keywords."
          actionLabel="Show All Doctors"
          onAction={() => {
            setSelectedSpecialty('ALL');
            setSearchQuery('');
            setExperienceFilter('ALL');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.map(doctor => (
            <Card
              key={doctor.id}
              hover={true}
              className="flex flex-col justify-between p-5.5 hover:border-blue-300 transition-all group border-slate-200/90 shadow-xs"
            >
              <div className="space-y-4">
                {/* Doctor Head Info */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-2xs group-hover:border-blue-300 transition-colors flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <Badge variant="primary" size="sm">
                        {doctor.specialty}
                      </Badge>
                      <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{doctor.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => navigate(`/doctor/${doctor.id}`)}
                      className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 cursor-pointer mt-1 truncate transition-colors"
                    >
                      {doctor.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate">{doctor.qualification}</p>
                  </div>
                </div>

                {/* Key clinical focus pills */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Clinical Focus:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {doctor.diseasesTreated.slice(0, 3).map(disease => (
                      <span
                        key={disease}
                        className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md border border-slate-200/60"
                      >
                        {disease}
                      </span>
                    ))}
                    {doctor.diseasesTreated.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-semibold px-1">
                        +{doctor.diseasesTreated.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Practice & Schedule Details */}
                <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1.5 text-[11px] text-slate-600 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Experience:</span>
                    <strong className="text-slate-800 font-bold">{doctor.experienceYears} Years</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Consultation Fee:</span>
                    <strong className="text-blue-600 font-mono font-bold">${doctor.fee} / session</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Hours:</span>
                    <span className="font-semibold text-slate-700">{doctor.availability.hours}</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-1.5 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/doctor/${doctor.id}`)}
                    className="text-xs font-bold"
                  >
                    Profile
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/credentials/${doctor.id}`)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Bio &amp; Credentials
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(`/book?doctor=${doctor.id}`)}
                  icon={<Calendar className="w-3.5 h-3.5" />}
                >
                  Book Visit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
