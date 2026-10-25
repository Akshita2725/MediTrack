/**
 * Clinical seed dataset in pure JavaScript
 */

export const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Aneez Patel',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    specialty: 'Cardiology',
    qualification: 'MD, DM (Cardiology), FACC',
    experienceYears: 14,
    clinicalInterests: ['Interventional Cardiology', 'Heart Failure Management', 'Echocardiography'],
    diseasesTreated: ['Arrhythmia', 'Coronary Artery Disease', 'Hypertension', 'Valvular Heart Disease'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '09:00 AM - 04:00 PM',
      slots: ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM']
    },
    consultationTypes: ['In-Clinic', 'Tele-Consultation'],
    rating: 4.9,
    reviewCount: 142,
    fee: 70,
    about: 'Senior Consultant Cardiologist specializing in preventive heart health, cardiovascular risk reduction, and non-invasive diagnostics.',
    clinicAddress: 'Suite 402, MediTrack Central Heart & Vascular Wing',
    phone: '+1 (555) 234-8901',
    email: 'dr.aneez@meditrack.org'
  },
  {
    id: 'doc-2',
    name: 'Dr. Michael Chang',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80',
    specialty: 'General Medicine',
    qualification: 'MBBS, MD (Internal Medicine)',
    experienceYears: 11,
    clinicalInterests: ['Preventive Medicine', 'Metabolic Syndrome', 'Chronic Disease Management'],
    diseasesTreated: ['Viral Infections', 'Hypertension', 'Fatigue Disorders', 'Gastrointestinal Distress', 'Allergies'],
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      hours: '08:30 AM - 03:00 PM',
      slots: ['08:30 AM', '09:45 AM', '11:00 AM', '01:30 PM', '02:30 PM']
    },
    consultationTypes: ['In-Clinic', 'Tele-Consultation'],
    rating: 4.8,
    reviewCount: 98,
    fee: 55,
    about: 'Dedicated internist focused on holistic primary healthcare, lifestyle medicine, and prompt clinical triage for complex symptoms.',
    clinicAddress: 'Suite 201, Primary Care Pavilion',
    phone: '+1 (555) 432-1100',
    email: 'dr.chang@meditrack.org'
  },
  {
    id: 'doc-3',
    name: 'Dr. Reginald Liew',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&auto=format&fit=crop&q=80',
    specialty: 'Cardiology',
    qualification: 'MBBS, FRCP, PhD (Electrophysiology)',
    experienceYears: 18,
    clinicalInterests: ['Cardiac Electrophysiology', 'Pacemaker Implantation', 'Atrial Fibrillation'],
    diseasesTreated: ['Palpitations', 'Tachycardia', 'Bradycardia', 'Syncope', 'Congestive Heart Failure'],
    availability: {
      days: ['Tuesday', 'Thursday', 'Friday'],
      hours: '10:00 AM - 05:00 PM',
      slots: ['10:00 AM', '11:15 AM', '01:00 PM', '02:30 PM', '04:00 PM']
    },
    consultationTypes: ['In-Clinic', 'Tele-Consultation'],
    rating: 4.95,
    reviewCount: 210,
    fee: 90,
    about: 'World-renowned electrophysiologist providing advanced rhythm evaluation, remote ECG analysis, and structured therapy plans.',
    clinicAddress: 'Suite 408, Cardiac Rhythm Institute',
    phone: '+1 (555) 678-9012',
    email: 'dr.liew@meditrack.org'
  },
  {
    id: 'doc-4',
    name: 'Dr. Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1594824813589-4081c7e997a6?w=300&auto=format&fit=crop&q=80',
    specialty: 'Dermatology',
    qualification: 'MD, FAAD (Dermatology)',
    experienceYears: 9,
    clinicalInterests: ['Clinical Dermatology', 'Acne & Rosacea', 'Skin Cancer Screening', 'Psoriasis Therapy'],
    diseasesTreated: ['Eczema', 'Psoriasis', 'Severe Acne', 'Contact Dermatitis', 'Alopecia', 'Skin Lesions'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      hours: '09:00 AM - 04:30 PM',
      slots: ['09:00 AM', '10:30 AM', '01:00 PM', '03:00 PM', '04:00 PM']
    },
    consultationTypes: ['In-Clinic', 'Tele-Consultation'],
    rating: 4.9,
    reviewCount: 165,
    fee: 65,
    about: 'Board-certified dermatologist combining evidence-based medical skincare with modern non-invasive clinical therapies.',
    clinicAddress: 'Suite 104, Dermatology & Cutaneous Sciences',
    phone: '+1 (555) 789-0123',
    email: 'dr.jenkins@meditrack.org'
  },
  {
    id: 'doc-5',
    name: 'Dr. Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
    specialty: 'Endocrinology',
    qualification: 'MD, FACE (Endocrinology & Metabolism)',
    experienceYears: 13,
    clinicalInterests: ['Type 1 & 2 Diabetes Management', 'Thyroid Disorders', 'Osteoporosis', 'PCOS'],
    diseasesTreated: ['Diabetes Mellitus', 'Hypothyroidism', 'Hyperthyroidism', 'Adrenal Insufficiency', 'Metabolic Bone Disease'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      hours: '08:00 AM - 02:00 PM',
      slots: ['08:30 AM', '09:30 AM', '11:00 AM', '12:30 PM', '01:30 PM']
    },
    consultationTypes: ['In-Clinic', 'Tele-Consultation'],
    rating: 4.85,
    reviewCount: 120,
    fee: 75,
    about: 'Specialist in hormonal harmony, continuous glucose monitoring (CGM) integration, and targeted endocrine therapy.',
    clinicAddress: 'Suite 305, Endocrine & Metabolic Center',
    phone: '+1 (555) 890-1234',
    email: 'dr.rostova@meditrack.org'
  },
  {
    id: 'doc-6',
    name: 'Dr. Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80',
    specialty: 'Neurology',
    qualification: 'MD, DM, FAAN',
    experienceYears: 16,
    clinicalInterests: ['Headache Medicine', 'Peripheral Neuropathy', 'Epilepsy & Seizures', 'Stroke Recovery'],
    diseasesTreated: ['Migraine', 'Cluster Headache', 'Neuropathic Pain', 'Parkinsonism', 'Carpal Tunnel Syndrome'],
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday'],
      hours: '10:00 AM - 05:00 PM',
      slots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM']
    },
    consultationTypes: ['In-Clinic', 'Tele-Consultation'],
    rating: 4.92,
    reviewCount: 184,
    fee: 85,
    about: 'Expert neurologist dedicated to precise neuro-diagnostic evaluations and advanced chronic migraine prophylactic care.',
    clinicAddress: 'Suite 510, Neurosciences Diagnostic Wing',
    phone: '+1 (555) 901-2345',
    email: 'dr.vance@meditrack.org'
  },
  {
    id: 'doc-7',
    name: 'Dr. Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=300&auto=format&fit=crop&q=80',
    specialty: 'Pediatrics',
    qualification: 'MD (Pediatrics), FAAP',
    experienceYears: 8,
    clinicalInterests: ['Developmental Pediatrics', 'Pediatric Asthma', 'Immunizations', 'Childhood Nutrition'],
    diseasesTreated: ['Pediatric Infections', 'Asthma', 'Growth Delays', 'Food Allergies', 'Bronchiolitis'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '08:30 AM - 03:30 PM',
      slots: ['09:00 AM', '10:15 AM', '11:30 AM', '01:45 PM', '02:45 PM']
    },
    consultationTypes: ['In-Clinic', 'Tele-Consultation'],
    rating: 4.97,
    reviewCount: 240,
    fee: 50,
    about: 'Caring, family-focused pediatrician providing warm, evidence-based care for infants, children, and adolescents.',
    clinicAddress: 'Suite 101, Children & Family Health Hub',
    phone: '+1 (555) 345-6789',
    email: 'dr.lin@meditrack.org'
  },
  {
    id: 'doc-8',
    name: 'Dr. David Ross',
    avatar: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&auto=format&fit=crop&q=80',
    specialty: 'Orthopedics',
    qualification: 'MS (Orthopedics), MCh, FAAOS',
    experienceYears: 15,
    clinicalInterests: ['Joint Preservation', 'Sports Medicine', 'Spine Biomechanics', 'Arthroscopy'],
    diseasesTreated: ['Osteoarthritis', 'Ligament Tears', 'Rotator Cuff Injuries', 'Sciatica', 'Fracture Rehabilitation'],
    availability: {
      days: ['Monday', 'Thursday', 'Friday', 'Saturday'],
      hours: '09:00 AM - 04:00 PM',
      slots: ['09:15 AM', '10:45 AM', '01:15 PM', '02:45 PM', '03:45 PM']
    },
    consultationTypes: ['In-Clinic', 'Tele-Consultation'],
    rating: 4.88,
    reviewCount: 175,
    fee: 80,
    about: 'Orthopedic specialist committed to preserving joint mobility, rapid sports injury rehabilitation, and surgical precision.',
    clinicAddress: 'Suite 205, Orthopedic & Sports Medicine Wing',
    phone: '+1 (555) 567-8901',
    email: 'dr.ross@meditrack.org'
  }
];

export const INITIAL_PATIENTS = [
  {
    id: 'pat-1',
    name: 'Eleanor Vance',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    age: 48,
    gender: 'Female',
    contact: '+1 (555) 776-9021',
    email: 'eleanor.vance@gmail.com',
    address: '742 Evergreen Terrace, Springfield',
    bloodGroup: 'A+',
    allergies: ['Penicillin', 'Sulfa drugs'],
    conditions: ['Hypertension', 'Mild Arrhythmia'],
    lastVisit: '2026-08-02',
    nextFollowUp: '2026-08-18',
    assignedDoctorId: 'doc-1'
  },
  {
    id: 'pat-2',
    name: 'Robert Thornton',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 56,
    gender: 'Male',
    contact: '+1 (555) 889-3412',
    email: 'r.thornton@outlook.com',
    address: '1204 Pine Creek Rd, Austin, TX',
    bloodGroup: 'O+',
    allergies: ['Aspirin'],
    conditions: ['Type 2 Diabetes', 'Hyperlipidemia'],
    lastVisit: '2026-08-10',
    nextFollowUp: '2026-08-17',
    assignedDoctorId: 'doc-5'
  },
  {
    id: 'pat-3',
    name: 'Sophia Martinez',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    age: 29,
    gender: 'Female',
    contact: '+1 (555) 321-6547',
    email: 'sophia.m@icloud.com',
    address: '88 Maple Boulevard, Seattle, WA',
    bloodGroup: 'B+',
    allergies: ['Latex'],
    conditions: ['Severe Acne', 'Atopic Dermatitis'],
    lastVisit: '2026-07-28',
    nextFollowUp: '2026-08-25',
    assignedDoctorId: 'doc-4'
  },
  {
    id: 'pat-4',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    age: 62,
    gender: 'Male',
    contact: '+1 (555) 654-7890',
    email: 'jwilson62@gmail.com',
    address: '310 Ocean Drive, Miami, FL',
    bloodGroup: 'AB-',
    allergies: ['None known'],
    conditions: ['Atrial Fibrillation', 'Coronary Artery Disease'],
    lastVisit: '2026-08-12',
    nextFollowUp: '2026-08-16',
    assignedDoctorId: 'doc-3'
  },
  {
    id: 'pat-5',
    name: 'Chloe Bennett',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    age: 34,
    gender: 'Female',
    contact: '+1 (555) 456-1234',
    email: 'chloe.bennett@yahoo.com',
    address: '450 Sunset Blvd, Los Angeles, CA',
    bloodGroup: 'O-',
    allergies: ['Ibuprofen'],
    conditions: ['Chronic Migraine', 'Tension Headaches'],
    lastVisit: '2026-08-05',
    nextFollowUp: '2026-08-19',
    assignedDoctorId: 'doc-6'
  },
  {
    id: 'pat-6',
    name: 'Lucas Campbell',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    age: 8,
    gender: 'Male',
    contact: '+1 (555) 987-6543 (Parent)',
    email: 'campbell.family@gmail.com',
    address: '56 Elm St, Boston, MA',
    bloodGroup: 'A+',
    allergies: ['Peanuts', 'Tree Nuts'],
    conditions: ['Mild Pediatric Asthma', 'Seasonal Rhinitis'],
    lastVisit: '2026-07-20',
    nextFollowUp: '2026-08-22',
    assignedDoctorId: 'doc-7'
  },
  {
    id: 'pat-7',
    name: 'Marcus Brody',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    age: 41,
    gender: 'Male',
    contact: '+1 (555) 234-5678',
    email: 'marcus.brody@gmail.com',
    address: '902 Broadway, New York, NY',
    bloodGroup: 'B-',
    allergies: ['Codeine'],
    conditions: ['Knee Osteoarthritis', 'Meniscus Tear (Post-Op)'],
    lastVisit: '2026-08-08',
    nextFollowUp: '2026-08-14',
    assignedDoctorId: 'doc-8'
  },
  {
    id: 'pat-8',
    name: 'Amara Okafor',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&auto=format&fit=crop&q=80',
    age: 37,
    gender: 'Female',
    contact: '+1 (555) 876-5432',
    email: 'amara.okafor@gmail.com',
    address: '33 Willow Way, Denver, CO',
    bloodGroup: 'A-',
    allergies: ['None known'],
    conditions: ['General Wellness', 'Iron Deficiency Anemia'],
    lastVisit: '2026-08-14',
    nextFollowUp: '2026-08-28',
    assignedDoctorId: 'doc-2'
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-101',
    queueNumber: 1,
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    doctorId: 'doc-1',
    doctorName: 'Dr. Aneez Patel',
    doctorSpecialty: 'Cardiology',
    date: '2026-08-17',
    time: '09:00 AM',
    consultationType: 'In-Clinic',
    symptoms: 'Mild chest tightness on exertion and palpitations during evening hours.',
    status: 'In Consultation',
    notes: 'Prior ECG showed sinus rhythm with rare PACs.',
    createdAt: '2026-08-15T08:30:00Z'
  },
  {
    id: 'apt-102',
    queueNumber: 2,
    patientId: 'pat-2',
    patientName: 'Robert Thornton',
    doctorId: 'doc-5',
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialty: 'Endocrinology',
    date: '2026-08-17',
    time: '09:30 AM',
    consultationType: 'In-Clinic',
    symptoms: 'Fasting blood glucose fluctuations and recent HbA1c test review.',
    status: 'Waiting',
    notes: 'Bring current glucose logs and glucometer.',
    createdAt: '2026-08-14T11:20:00Z'
  },
  {
    id: 'apt-103',
    queueNumber: 3,
    patientId: 'pat-4',
    patientName: 'James Wilson',
    doctorId: 'doc-3',
    doctorName: 'Dr. Reginald Liew',
    doctorSpecialty: 'Cardiology',
    date: '2026-08-17',
    time: '10:00 AM',
    consultationType: 'Tele-Consultation',
    symptoms: 'Post-cardioversion follow-up and smartwatch irregular pulse notifications.',
    status: 'Waiting',
    notes: 'Tele-consult via MediTrack HD video room.',
    createdAt: '2026-08-15T14:15:00Z'
  },
  {
    id: 'apt-104',
    queueNumber: 4,
    patientId: 'pat-3',
    patientName: 'Sophia Martinez',
    doctorId: 'doc-4',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialty: 'Dermatology',
    date: '2026-08-17',
    time: '10:30 AM',
    consultationType: 'In-Clinic',
    symptoms: 'Facial redness flare-up and topical retinoid adjustment.',
    status: 'Scheduled',
    notes: 'Skin evaluation in Exam Room 2.',
    createdAt: '2026-08-16T09:00:00Z'
  },
  {
    id: 'apt-105',
    queueNumber: 5,
    patientId: 'pat-5',
    patientName: 'Chloe Bennett',
    doctorId: 'doc-6',
    doctorName: 'Dr. Marcus Vance',
    doctorSpecialty: 'Neurology',
    date: '2026-08-17',
    time: '11:30 AM',
    consultationType: 'Tele-Consultation',
    symptoms: 'Frequent throbbing left temple headaches with photophobia.',
    status: 'Scheduled',
    notes: 'Review headache diary and trigger log.',
    createdAt: '2026-08-16T12:45:00Z'
  },
  {
    id: 'apt-106',
    queueNumber: 6,
    patientId: 'pat-8',
    patientName: 'Amara Okafor',
    doctorId: 'doc-2',
    doctorName: 'Dr. Michael Chang',
    doctorSpecialty: 'General Medicine',
    date: '2026-08-17',
    time: '01:30 PM',
    consultationType: 'In-Clinic',
    symptoms: 'Routine wellness physical, blood pressure check, and blood panel discussion.',
    status: 'Scheduled',
    notes: 'Annual preventative screening.',
    createdAt: '2026-08-16T15:00:00Z'
  },
  {
    id: 'apt-107',
    queueNumber: 7,
    patientId: 'pat-6',
    patientName: 'Lucas Campbell',
    doctorId: 'doc-7',
    doctorName: 'Dr. Maya Lin',
    doctorSpecialty: 'Pediatrics',
    date: '2026-08-18',
    time: '09:00 AM',
    consultationType: 'In-Clinic',
    symptoms: 'Night-time dry cough and inhaler technique assessment.',
    status: 'Scheduled',
    notes: 'Accompanied by mother.',
    createdAt: '2026-08-16T16:20:00Z'
  },
  {
    id: 'apt-108',
    queueNumber: 8,
    patientId: 'pat-7',
    patientName: 'Marcus Brody',
    doctorId: 'doc-8',
    doctorName: 'Dr. David Ross',
    doctorSpecialty: 'Orthopedics',
    date: '2026-08-18',
    time: '10:45 AM',
    consultationType: 'In-Clinic',
    symptoms: 'Knee joint stiffness and review of post-surgical recovery exercise program.',
    status: 'Scheduled',
    notes: 'Bring orthopedic brace for fit inspection.',
    createdAt: '2026-08-16T17:00:00Z'
  },
  {
    id: 'apt-109',
    queueNumber: 9,
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    doctorId: 'doc-2',
    doctorName: 'Dr. Michael Chang',
    doctorSpecialty: 'General Medicine',
    date: '2026-08-02',
    time: '10:00 AM',
    consultationType: 'In-Clinic',
    symptoms: 'Seasonal allergies and sinus pressure.',
    status: 'Completed',
    notes: 'Prescribed antihistamine and nasal spray.',
    createdAt: '2026-08-01T10:00:00Z'
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 'rx-201',
    appointmentId: 'apt-109',
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    patientAge: 48,
    patientAllergies: ['Penicillin', 'Sulfa drugs'],
    doctorId: 'doc-1',
    doctorName: 'Dr. Aneez Patel',
    doctorSpecialty: 'Cardiology',
    doctorQualification: 'MD, DM (Cardiology), FACC',
    date: '2026-08-02',
    symptoms: 'Elevated systolic blood pressure (142/90 mmHg) and occasional palpitation.',
    diagnosis: 'Stage 1 Essential Hypertension & Sinus Arrhythmia',
    notes: 'Reduce dietary sodium intake (<2000mg/day). Monitor BP twice daily and record in MediTrack journal.',
    medicines: [
      {
        id: 'med-1',
        name: 'Amlodipine Besylate',
        dosage: '5 mg',
        frequency: 'Once daily (Morning)',
        duration: '30 days',
        instructions: 'Take with or without food. Do not skip doses.'
      },
      {
        id: 'med-2',
        name: 'Metoprolol Succinate ER',
        dosage: '25 mg',
        frequency: 'Once daily (Evening)',
        duration: '30 days',
        instructions: 'Swallow whole with a full glass of water.'
      },
      {
        id: 'med-3',
        name: 'CoQ10 Heart Support Enzyme',
        dosage: '100 mg',
        frequency: 'Once daily with meals',
        duration: '60 days',
        instructions: 'Nutritional cardiovascular co-factor supplement.'
      }
    ],
    followUpDate: '2026-08-18',
    createdAt: '2026-08-02T11:00:00Z'
  },
  {
    id: 'rx-202',
    patientId: 'pat-2',
    patientName: 'Robert Thornton',
    patientAge: 56,
    patientAllergies: ['Aspirin'],
    doctorId: 'doc-5',
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialty: 'Endocrinology',
    doctorQualification: 'MD, FACE',
    date: '2026-08-10',
    symptoms: 'Post-prandial spikes, dry mouth, mild peripheral tingling.',
    diagnosis: 'Type 2 Diabetes Mellitus with Mild Neuropathy',
    notes: 'Maintain low-glycemic index meals. 30 minutes brisk walking daily after dinner.',
    medicines: [
      {
        id: 'med-4',
        name: 'Metformin Hydrochloride XR',
        dosage: '500 mg',
        frequency: 'Twice daily (With meals)',
        duration: '60 days',
        instructions: 'Take immediately with breakfast and dinner to avoid gastric upset.'
      },
      {
        id: 'med-5',
        name: 'Empagliflozin',
        dosage: '10 mg',
        frequency: 'Once daily (Morning)',
        duration: '30 days',
        instructions: 'Ensure adequate water hydration throughout the day.'
      },
      {
        id: 'med-6',
        name: 'Alpha-Lipoic Acid',
        dosage: '600 mg',
        frequency: 'Once daily on empty stomach',
        duration: '30 days',
        instructions: 'Neuropathic antioxidant support.'
      }
    ],
    followUpDate: '2026-08-17',
    createdAt: '2026-08-10T14:30:00Z'
  },
  {
    id: 'rx-203',
    patientId: 'pat-3',
    patientName: 'Sophia Martinez',
    patientAge: 29,
    patientAllergies: ['Latex'],
    doctorId: 'doc-4',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialty: 'Dermatology',
    doctorQualification: 'MD, FAAD',
    date: '2026-07-28',
    symptoms: 'Papulopustular rosacea across cheeks and sensitive skin barrier.',
    diagnosis: 'Erythematotelangiectatic Rosacea',
    notes: 'Use gentle non-foaming cleanser and SPF 50+ mineral sunscreen daily.',
    medicines: [
      {
        id: 'med-7',
        name: 'Ivermectin 1% Cream',
        dosage: 'Pea-sized amount',
        frequency: 'Once daily at bedtime',
        duration: '45 days',
        instructions: 'Apply thin layer evenly to affected facial zones.'
      },
      {
        id: 'med-8',
        name: 'Doxycycline Hyclate',
        dosage: '40 mg (Sub-antimicrobial)',
        frequency: 'Once daily in morning',
        duration: '30 days',
        instructions: 'Take with a full glass of water. Avoid lying down for 30 minutes.'
      }
    ],
    followUpDate: '2026-08-25',
    createdAt: '2026-07-28T16:00:00Z'
  }
];

export const INITIAL_FOLLOW_UPS = [
  {
    id: 'fup-1',
    patientId: 'pat-4',
    patientName: 'James Wilson',
    doctorId: 'doc-3',
    doctorName: 'Dr. Reginald Liew',
    doctorSpecialty: 'Cardiology',
    dueDate: '2026-08-16',
    diagnosis: 'Atrial Fibrillation rhythm review',
    notes: 'Check 2-week Holter monitor ECG sync and anti-coagulation adherence.',
    status: 'Pending',
    contact: '+1 (555) 654-7890'
  },
  {
    id: 'fup-2',
    patientId: 'pat-2',
    patientName: 'Robert Thornton',
    doctorId: 'doc-5',
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialty: 'Endocrinology',
    dueDate: '2026-08-17',
    diagnosis: 'Glycemic Target Evaluation',
    notes: 'Review continuous glucose monitor averages and fasting labs.',
    status: 'Pending',
    contact: '+1 (555) 889-3412'
  },
  {
    id: 'fup-3',
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    doctorId: 'doc-1',
    doctorName: 'Dr. Aneez Patel',
    doctorSpecialty: 'Cardiology',
    dueDate: '2026-08-18',
    diagnosis: 'Hypertension Medication Tolerance',
    notes: 'BP log inspection and check for peripheral ankle edema.',
    status: 'Pending',
    contact: '+1 (555) 776-9021'
  },
  {
    id: 'fup-4',
    patientId: 'pat-5',
    patientName: 'Chloe Bennett',
    doctorId: 'doc-6',
    doctorName: 'Dr. Marcus Vance',
    doctorSpecialty: 'Neurology',
    dueDate: '2026-08-19',
    diagnosis: 'Migraine Prophylaxis Assessment',
    notes: 'Evaluate monthly headache frequency reduction after CGRP initiation.',
    status: 'Pending',
    contact: '+1 (555) 456-1234'
  },
  {
    id: 'fup-5',
    patientId: 'pat-6',
    patientName: 'Lucas Campbell',
    doctorId: 'doc-7',
    doctorName: 'Dr. Maya Lin',
    doctorSpecialty: 'Pediatrics',
    dueDate: '2026-08-22',
    diagnosis: 'Pediatric Asthma Control Test',
    notes: 'Peak flow meter reading audit and exercise tolerance evaluation.',
    status: 'Pending',
    contact: '+1 (555) 987-6543'
  },
  {
    id: 'fup-6',
    patientId: 'pat-3',
    patientName: 'Sophia Martinez',
    doctorId: 'doc-4',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialty: 'Dermatology',
    dueDate: '2026-08-25',
    diagnosis: 'Rosacea Skin Barrier Check',
    notes: 'Photographic progression comparison and topical taper plan.',
    status: 'Pending',
    contact: '+1 (555) 321-6547'
  },
  {
    id: 'fup-7',
    patientId: 'pat-7',
    patientName: 'Marcus Brody',
    doctorId: 'doc-8',
    doctorName: 'Dr. David Ross',
    doctorSpecialty: 'Orthopedics',
    dueDate: '2026-08-14',
    diagnosis: 'Post-Op Knee Range of Motion',
    notes: 'Flexion degree measurement and physical therapy transition.',
    status: 'Pending',
    contact: '+1 (555) 234-5678'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    senderId: 'pat-1',
    senderName: 'Eleanor Vance',
    senderRole: 'patient',
    recipientId: 'doc-1',
    text: 'Hello Dr. Patel, my morning BP reading was 126/82 today. The new dosage seems much smoother!',
    timestamp: '2026-08-16T19:30:00Z'
  },
  {
    id: 'msg-2',
    senderId: 'doc-1',
    senderName: 'Dr. Aneez Patel',
    senderRole: 'doctor',
    recipientId: 'pat-1',
    text: 'Excellent news Eleanor. Continue taking Metoprolol in the evening and keep logging in MediTrack.',
    timestamp: '2026-08-16T20:05:00Z',
    isDoctorNote: true
  },
  {
    id: 'msg-3',
    senderId: 'pat-4',
    senderName: 'James Wilson',
    senderRole: 'patient',
    recipientId: 'doc-3',
    text: 'Good morning Dr. Liew. I received the tele-consultation link for our 10:00 AM session today.',
    timestamp: '2026-08-17T08:15:00Z'
  },
  {
    id: 'msg-4',
    senderId: 'doc-3',
    senderName: 'Dr. Reginald Liew',
    senderRole: 'doctor',
    recipientId: 'pat-4',
    text: 'Great James. Have your latest smartwatch rhythm PDF ready to share on screen.',
    timestamp: '2026-08-17T08:25:00Z'
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    doctorId: 'doc-1',
    doctorName: 'Dr. Aneez Patel',
    lastMessage: 'Excellent news Eleanor. Continue taking Metoprolol in the evening...',
    lastTimestamp: '2026-08-16T20:05:00Z',
    unreadCount: 0
  },
  {
    id: 'conv-2',
    patientId: 'pat-4',
    patientName: 'James Wilson',
    doctorId: 'doc-3',
    doctorName: 'Dr. Reginald Liew',
    lastMessage: 'Great James. Have your latest smartwatch rhythm PDF ready to share on screen.',
    lastTimestamp: '2026-08-17T08:25:00Z',
    unreadCount: 1
  },
  {
    id: 'conv-3',
    patientId: 'pat-2',
    patientName: 'Robert Thornton',
    doctorId: 'doc-5',
    doctorName: 'Dr. Elena Rostova',
    lastMessage: 'Fasting glucose was 112 mg/dL this morning.',
    lastTimestamp: '2026-08-15T18:40:00Z',
    unreadCount: 0
  },
  {
    id: 'conv-4',
    patientId: 'pat-3',
    patientName: 'Sophia Martinez',
    doctorId: 'doc-4',
    doctorName: 'Dr. Sarah Jenkins',
    lastMessage: 'Skin redness has reduced by approximately 40% after week 2.',
    lastTimestamp: '2026-08-14T15:10:00Z',
    unreadCount: 0
  }
];
