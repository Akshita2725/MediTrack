import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Plus,
  Heart,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  FileText,
  UserCheck,
  Filter,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { Modal } from '../components/common/Modal.jsx';

export const PatientsPage = () => {
  const { patients, addPatient, setCurrentPatientId, setRole, role } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);

  // New Patient Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Female');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');
  const [errors, setErrors] = useState({});

  const filteredPatients = useMemo(() => {
    let list = patients;

    if (genderFilter !== 'ALL') {
      list = list.filter(p => p.gender.toLowerCase() === genderFilter.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.contact.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.conditions.some(c => c.toLowerCase().includes(q)) ||
          p.allergies.some(a => a.toLowerCase().includes(q))
      );
    }

    return list;
  }, [patients, genderFilter, searchQuery]);

  const validateForm = () => {
    const err = {};
    if (!name.trim()) err.name = 'Patient name is required.';
    if (!age || Number(age) <= 0) err.age = 'Valid age is required.';
    if (!contact.trim()) err.contact = 'Contact number is required.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleCreatePatient = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newPat = addPatient({
      name: name.trim(),
      age: Number(age),
      gender,
      contact: contact.trim(),
      email: email.trim() || 'patient@meditrack.org',
      address: address.trim() || 'Springfield, USA',
      bloodGroup,
      allergies: allergies ? allergies.split(',').map(a => a.trim()) : ['None known'],
      conditions: conditions ? conditions.split(',').map(c => c.trim()) : ['General Wellness']
    });

    setIsNewPatientModalOpen(false);
    // Reset Form
    setName('');
    setAge('');
    setContact('');
    setEmail('');
    setAddress('');
    setAllergies('');
    setConditions('');
    setErrors({});

    if (newPat?.id) {
      navigate(`/patient/${newPat.id}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Electronic Health Records & Patient Roster"
        subtitle="Manage master patient registries, clinical histories, allergy cross-checks, and active pharmacotherapy."
        actions={
          <Button
            onClick={() => setIsNewPatientModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
            size="md"
            className="shadow-md shadow-blue-500/25"
          >
            Register Patient
          </Button>
        }
      />

      {/* Filter & Search Ribbon */}
      <Card className="p-4.5 bg-white space-y-3.5 shadow-xs border border-slate-200/90">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {['ALL', 'Female', 'Male'].map(gen => (
              <button
                key={gen}
                onClick={() => setGenderFilter(gen)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  genderFilter === gen
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {gen === 'ALL' ? `All Patients (${patients.length})` : `${gen}s`}
              </button>
            ))}
          </div>

          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search patient, allergy, condition..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
        </div>
      </Card>

      {/* Patients Grid */}
      {filteredPatients.length === 0 ? (
        <EmptyState
          icon={<Users className="w-10 h-10 text-slate-400" />}
          title="No Patient Records Matched"
          description="Try modifying your search criteria or register a new patient in the system."
          actionLabel="Register Patient"
          onAction={() => setIsNewPatientModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPatients.map(patient => (
            <Card
              key={patient.id}
              hover={true}
              className="flex flex-col justify-between p-5.5 hover:border-purple-300/90 transition-all group border-slate-200/90 shadow-xs"
            >
              <div className="space-y-4">
                {/* Header Profile Info */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs group-hover:border-purple-300 transition-colors flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <Badge variant="purple" size="sm">
                        Blood {patient.bloodGroup}
                      </Badge>
                      <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">
                        ID: {patient.id}
                      </span>
                    </div>

                    <h3
                      onClick={() => navigate(`/patient/${patient.id}`)}
                      className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 cursor-pointer mt-1 truncate transition-colors"
                    >
                      {patient.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {patient.gender} &bull; {patient.age} Years Old
                    </p>
                  </div>
                </div>

                {/* Chronic conditions */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Clinical Diagnoses:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {patient.conditions.map(condition => (
                      <span
                        key={condition}
                        className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md border border-slate-200/60"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Allergies Warning */}
                {patient.allergies && patient.allergies.length > 0 && patient.allergies[0] !== 'None known' && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200/80 rounded-xl flex items-center gap-2 text-[11px] text-rose-700 font-bold">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                    <span className="truncate">Allergies: {patient.allergies.join(', ')}</span>
                  </div>
                )}

                {/* Contact info snippet */}
                <div className="p-3 bg-slate-50 rounded-xl text-[11px] space-y-1 text-slate-600 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-700">{patient.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate font-medium text-slate-500">{patient.email}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/patient/${patient.id}`)}
                  className="text-xs font-bold"
                >
                  View EHR Profile
                </Button>

                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate(`/book?patient=${patient.id}`)}
                    icon={<Calendar className="w-3.5 h-3.5" />}
                  >
                    Book Visit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* New Patient Registration Modal */}
      <Modal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
        title="Register New Patient in Clinical System"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleCreatePatient} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              {errors.name && <p className="text-[11px] text-rose-600 font-bold mt-0.5">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Age *</label>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  placeholder="34"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                {errors.age && <p className="text-[11px] text-rose-600 font-bold mt-0.5">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 outline-none focus:bg-white focus:border-blue-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              {errors.contact && <p className="text-[11px] text-rose-600 font-bold mt-0.5">{errors.contact}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={e => setBloodGroup(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-blue-500"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="City, State"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Known Drug / Environmental Allergies (comma-separated)
            </label>
            <input
              type="text"
              value={allergies}
              onChange={e => setAllergies(e.target.value)}
              placeholder="e.g. Penicillin, NSAIDs, Sulfa (or leave blank for None known)"
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Chronic Clinical Conditions (comma-separated)
            </label>
            <input
              type="text"
              value={conditions}
              onChange={e => setConditions(e.target.value)}
              placeholder="e.g. Hypertension, Type-2 Diabetes, Asthma"
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsNewPatientModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={<Plus className="w-4 h-4" />}>
              Save &amp; Register Patient
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
