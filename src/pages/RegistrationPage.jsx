import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { TextInput } from '../components/common/form/TextInput.jsx';
import { SelectDropdown } from '../components/common/form/SelectDropdown.jsx';
import { TextArea } from '../components/common/form/TextArea.jsx';
import { Checkbox } from '../components/common/form/Checkbox.jsx';
import { Modal } from '../components/common/Modal.jsx';
import { Button } from '../components/common/Button.jsx';
import { Card } from '../components/common/Card.jsx';
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateMinLength,
  validateAge,
  validateCheckbox
} from '../utils/formValidation.js';

export const RegistrationPage = () => {
  const { addPatient } = useApp();
  const toast = useToast();
  const navigate = useNavigate();

  // Controlled Form State (Topic 55-60)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    bloodGroup: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalHistory: '',
    allergies: '',
    termsAccepted: false
  });

  // Validation & Touched States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredPatient, setRegisteredPatient] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Field validation function (Reusable validation strategy)
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        return validateRequired(value, 'Full Name') || validateMinLength(value, 3, 'Full Name');
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'age':
        return validateAge(value);
      case 'gender':
        return validateRequired(value, 'Gender selection');
      case 'bloodGroup':
        return validateRequired(value, 'Blood group');
      case 'emergencyContactName':
        return validateRequired(value, 'Emergency contact name');
      case 'emergencyContactPhone':
        return validatePhone(value);
      case 'termsAccepted':
        return validateCheckbox(value, 'You must agree to the HIPAA medical treatment consent');
      default:
        return null;
    }
  };

  // Run full validation on all fields
  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) {
        newErrors[field] = err;
      }
    });
    return newErrors;
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val
    }));

    // If the field was already touched, validate in real time
    if (touched[name]) {
      const errorMsg = validateField(name, val);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg
      }));
    }
  };

  // Handle Field Blur (Topic 55-60: Validation on blur)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg
    }));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the highlighted form errors before proceeding.');
      return;
    }

    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      const allergiesList = formData.allergies.trim()
        ? formData.allergies.split(',').map((s) => s.trim())
        : ['None known'];

      const newPatient = addPatient({
        name: formData.name.trim(),
        email: formData.email.trim(),
        contact: formData.phone.trim(),
        phone: formData.phone.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        emergencyContact: `${formData.emergencyContactName} (${formData.emergencyContactPhone})`,
        medicalHistory: formData.medicalHistory || 'No previous conditions recorded',
        allergies: allergiesList,
        insuranceId: `INS-${Math.floor(100000 + Math.random() * 900000)}`
      });

      setIsSubmitting(false);
      setRegisteredPatient(newPatient);
      setIsSuccessModalOpen(true);
      toast.success(`Patient record created for ${newPatient.name}!`);
    }, 800);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      bloodGroup: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      medicalHistory: '',
      allergies: '',
      termsAccepted: false
    });
    setErrors({});
    setTouched({});
    toast.info('Form cleared.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60 mb-2">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Mini Project: Registration Form with Validation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Patient Intake & Member Registration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete registration using standardized validation, touch tracking, and reusable input components.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors"
        >
          Reset Form
        </button>
      </div>

      {/* Main Form Card */}
      <Card className="p-6 sm:p-8 shadow-md">
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* Section 1: Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                1. Personal Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                id="name"
                name="name"
                label="Full Legal Name"
                placeholder="e.g. Eleanor Vance"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name ? errors.name : undefined}
                required
                icon={User}
              />

              <TextInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="e.g. eleanor@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
                required
                icon={Mail}
              />

              <TextInput
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="e.g. (555) 234-5678"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone ? errors.phone : undefined}
                required
                icon={Phone}
              />

              <div className="grid grid-cols-2 gap-3">
                <TextInput
                  id="age"
                  name="age"
                  type="number"
                  label="Age"
                  placeholder="e.g. 34"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.age ? errors.age : undefined}
                  required
                />

                <SelectDropdown
                  id="gender"
                  name="gender"
                  label="Gender"
                  placeholder="Select..."
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.gender ? errors.gender : undefined}
                  required
                  options={[
                    { value: 'Female', label: 'Female' },
                    { value: 'Male', label: 'Male' },
                    { value: 'Non-binary', label: 'Non-binary' },
                    { value: 'Prefer not to say', label: 'Prefer not to say' }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Clinical & Blood Group */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Heart className="w-4 h-4 text-rose-600" />
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                2. Clinical & Emergency Data
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectDropdown
                id="bloodGroup"
                name="bloodGroup"
                label="Blood Group"
                placeholder="Select Blood Type..."
                value={formData.bloodGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.bloodGroup ? errors.bloodGroup : undefined}
                required
                options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']}
              />

              <TextInput
                id="allergies"
                name="allergies"
                label="Known Drug Allergies"
                placeholder="e.g. Penicillin, Sulfa, None"
                value={formData.allergies}
                onChange={handleChange}
                helperText="Separate multiple allergies with commas"
              />

              <TextInput
                id="emergencyContactName"
                name="emergencyContactName"
                label="Emergency Contact Name"
                placeholder="e.g. Robert Vance (Spouse)"
                value={formData.emergencyContactName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.emergencyContactName ? errors.emergencyContactName : undefined}
                required
              />

              <TextInput
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                type="tel"
                label="Emergency Contact Phone"
                placeholder="e.g. (555) 987-6543"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.emergencyContactPhone ? errors.emergencyContactPhone : undefined}
                required
                icon={Phone}
              />
            </div>

            <TextArea
              id="medicalHistory"
              name="medicalHistory"
              label="Pre-existing Conditions / Medical History"
              placeholder="e.g. Hypertension diagnosed 2021, mild seasonal asthma..."
              rows={3}
              maxLength={400}
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </div>

          {/* Section 3: Consent & Checkbox */}
          <div className="space-y-4 pt-2">
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>HIPAA Patient Consent & Practice Notice</span>
              </div>
              <Checkbox
                id="termsAccepted"
                name="termsAccepted"
                label="I certify the medical intake information provided is accurate"
                description="I agree to MediTrack's electronic health record consent, clinical data sharing with attending physicians, and appointment SMS notifications."
                checked={formData.termsAccepted}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.termsAccepted ? errors.termsAccepted : undefined}
                required
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="text-rose-500 font-bold">*</span>
              <span>Required fields for electronic medical record filing.</span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 text-sm font-extrabold shadow-md bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying & Saving...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Patient Registration</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Registration Completed"
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Welcome, {registeredPatient?.name}!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Your patient chart has been recorded into the clinical database.
            </p>
          </div>

          {registeredPatient && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient ID:</span>
                <span className="font-mono font-bold text-slate-900">{registeredPatient.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Insurance ID:</span>
                <span className="font-mono font-bold text-blue-700">{registeredPatient.insuranceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Blood Group:</span>
                <span className="font-bold text-rose-600">{registeredPatient.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Emergency Contact:</span>
                <span className="font-medium text-slate-800">{registeredPatient.emergencyContact}</span>
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccessModalOpen(false);
                navigate('/patients');
              }}
              className="flex-1 justify-center text-xs"
            >
              View Patients Directory
            </Button>
            <Button
              onClick={() => {
                setIsSuccessModalOpen(false);
                navigate('/book');
              }}
              className="flex-1 justify-center text-xs gap-1.5"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
