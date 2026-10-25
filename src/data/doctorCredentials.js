/**
 * Comprehensive Medical Credentials & Clinical Biographies
 * Fully typed, structured datasets for all hospital doctors
 */

export const DOCTOR_CREDENTIALS = {
  'doc-1': {
    id: 'doc-1',
    name: 'Dr. Aneez Patel',
    specialty: 'Cardiology',
    title: 'Senior Consultant Interventional Cardiologist',
    licenseNumber: 'MD-CARD-88412-NY',
    npiNumber: '1982736450',
    experienceYears: 14,
    clinicAddress: 'Suite 402, MediTrack Central Heart & Vascular Wing',
    languages: ['English', 'Hindi', 'Gujarati', 'Medical Latin'],
    philosophy:
      'Practicing evidence-based, patient-centered cardiovascular medicine. Emphasizing early detection of coronary pathologies, comprehensive arterial lipid profiling, and tailored lifestyle modifications alongside modern interventional therapies.',
    education: [
      { degree: 'Doctor of Medicine (M.D.)', institution: 'Harvard Medical School', year: '2010' },
      { degree: 'Internal Medicine Residency', institution: 'Johns Hopkins Hospital', year: '2013' },
      { degree: 'Cardiovascular Disease Fellowship', institution: 'Massachusetts General Hospital', year: '2016' },
      { degree: 'Advanced Interventional Coronary Fellowship', institution: 'Brigham and Women’s Hospital', year: '2017' }
    ],
    boardCertifications: [
      { name: 'Diplomate in Cardiovascular Disease', board: 'American Board of Internal Medicine (ABIM)', year: '2016' },
      { name: 'Certification in Adult Comprehensive Echocardiography', board: 'National Board of Echocardiography (NBE)', year: '2017' },
      { name: 'Diplomate in Nuclear Cardiology', board: 'Certification Board of Nuclear Cardiology (CBNC)', year: '2018' }
    ],
    affiliations: [
      'Fellow of the American College of Cardiology (FACC)',
      'Fellow of the Society for Cardiovascular Angiography and Interventions (FSCAI)',
      'Member, American Heart Association Council on Clinical Cardiology',
      'Attending Physician, Central University Medical Center'
    ],
    publications: [
      {
        title: 'Longitudinal Analysis of Ambulatory Blood Pressure Telemetry in Hypertensive Cohorts',
        journal: 'New England Journal of Medicine & Clinical Research',
        year: '2024',
        citations: 42,
        doi: '10.1056/NEJMoa2024108'
      },
      {
        title: 'Preventive Stratification for Early Atherosclerotic Plaque Regression via Statin Protocols',
        journal: 'Journal of the American College of Cardiology',
        year: '2022',
        citations: 89,
        doi: '10.1016/j.jacc.2022.04.015'
      },
      {
        title: 'Real-Time Telemetric ECG Monitoring in Ambulatory Heart Failure Management',
        journal: 'Circulation: Cardiovascular Quality and Outcomes',
        year: '2021',
        citations: 31,
        doi: '10.1161/CIRCOUTCOMES.120.007891'
      }
    ],
    awards: [
      { title: 'Top Cardiologist Award - Excellence in Patient Outcomes', issuer: 'Metro Healthcare Association', year: '2024' },
      { title: 'Clinical Innovation in Preventive Cardiology', issuer: 'American College of Cardiology', year: '2022' }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Eleanor Vance',
        date: '2 weeks ago',
        rating: 5.0,
        comment: 'Dr. Patel took the time to explain my cardiac stress test results in terms I could understand. His lifestyle and medication plan lowered my blood pressure dramatically.'
      },
      {
        id: 'rev-2',
        author: 'Marcus Vance',
        date: '1 month ago',
        rating: 4.9,
        comment: 'Thorough and highly skilled. The telemetry heart monitor integration worked seamlessly with MediTrack.'
      }
    ]
  },

  'doc-2': {
    id: 'doc-2',
    name: 'Dr. Michael Chang',
    specialty: 'General Medicine',
    title: 'Senior Attending Physician & Primary Care Lead',
    licenseNumber: 'MD-INT-55291-NY',
    npiNumber: '1439281726',
    experienceYears: 11,
    clinicAddress: 'Suite 201, Primary Care Pavilion',
    languages: ['English', 'Mandarin Chinese', 'Conversational Spanish'],
    philosophy:
      'Whole-person preventative healthcare founded on proactive chronic disease screening, metabolic health optimization, and open, empathetic clinical dialogue.',
    education: [
      { degree: 'Bachelor of Science in Biochemistry', institution: 'University of California, Berkeley', year: '2011' },
      { degree: 'Doctor of Medicine (M.D.)', institution: 'Columbia University Vagelos College of Physicians', year: '2015' },
      { degree: 'Internal Medicine Residency', institution: 'NewYork-Presbyterian Hospital / Weill Cornell', year: '2018' }
    ],
    boardCertifications: [
      { name: 'Diplomate in Internal Medicine', board: 'American Board of Internal Medicine (ABIM)', year: '2018' },
      { name: 'Certified Physician Executive (CPE)', board: 'American Association for Physician Leadership', year: '2021' }
    ],
    affiliations: [
      'Fellow, American College of Physicians (FACP)',
      'Member, Society of General Internal Medicine (SGIM)',
      'Clinical Instructor, Department of Medicine, University Health'
    ],
    publications: [
      {
        title: 'Integrated Primary Care Delivery Models in Urban Metabolic Syndrome Cohorts',
        journal: 'Annals of Internal Medicine',
        year: '2024',
        citations: 28,
        doi: '10.7326/M23-1490'
      },
      {
        title: 'Digital Health Triage Algorithms in Acute Primary Care Consultations: A Multicenter Study',
        journal: 'JAMA Internal Medicine',
        year: '2023',
        citations: 45,
        doi: '10.1001/jamainternmed.2023.2104'
      }
    ],
    awards: [
      { title: 'Excellence in Primary Care Teaching', issuer: 'Columbia University Alumni Association', year: '2023' },
      { title: 'Community Physician Service Citation', issuer: 'State Medical Society', year: '2021' }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Robert Thornton',
        date: '3 weeks ago',
        rating: 4.8,
        comment: 'Dr. Chang catches things other doctors miss. He reviewed my bloodwork line by line and coordinated with my endocrinologist effortlessly.'
      },
      {
        id: 'rev-4',
        author: 'Grace Hopper',
        date: '2 months ago',
        rating: 5.0,
        comment: 'Quick wait times, very kind bedside manner, and thorough annual wellness exam.'
      }
    ]
  },

  'doc-3': {
    id: 'doc-3',
    name: 'Dr. Reginald Liew',
    specialty: 'Cardiology',
    title: 'Director of Cardiac Arrhythmia & Electrophysiology',
    licenseNumber: 'MD-EP-90214-MA',
    npiNumber: '1728394019',
    experienceYears: 18,
    clinicAddress: 'Suite 408, Cardiac Rhythm Institute',
    languages: ['English', 'Cantonese', 'French'],
    philosophy:
      'Advancing precision electrophysiological interventions for complex rhythm disorders. Every heartbeat matters; our goal is to restore normal rhythm safely through minimally invasive catheter therapies and remote pacemaker analytics.',
    education: [
      { degree: 'MBBS (Honors) & Master of Arts', institution: 'University of Cambridge, UK', year: '2004' },
      { degree: 'PhD in Cardiac Electrophysiology', institution: 'Imperial College London', year: '2009' },
      { degree: 'Postdoctoral Fellowship in Cardiac Arrhythmias', institution: 'Mayo Clinic, Rochester', year: '2012' }
    ],
    boardCertifications: [
      { name: 'Certified Electrophysiology Specialist (CEPS-AC)', board: 'International Board of Heart Rhythm Examiners', year: '2012' },
      { name: 'Fellow of the Royal College of Physicians (FRCP)', board: 'Royal College of Physicians, London', year: '2014' },
      { name: 'Diplomate in Clinical Cardiac Electrophysiology', board: 'ABIM Subspecialty Board', year: '2015' }
    ],
    affiliations: [
      'Heart Rhythm Society (HRS) Fellow',
      'European Heart Rhythm Association (EHRA)',
      'Fellow, American College of Cardiology (FACC)',
      'Honorary Professor of Cardiovascular Medicine'
    ],
    publications: [
      {
        title: 'Cryoballoon vs Radiofrequency Catheter Ablation for Paroxysmal Atrial Fibrillation: 5-Year Registry',
        journal: 'Heart Rhythm',
        year: '2024',
        citations: 64,
        doi: '10.1016/j.hrthm.2023.11.018'
      },
      {
        title: 'Long-Term Performance of Leadless Transcatheter Pacemaker Systems',
        journal: 'Europace: European Heart Rhythm Journal',
        year: '2022',
        citations: 51,
        doi: '10.1093/europace/euac044'
      }
    ],
    awards: [
      { title: 'Global Pioneer in Electrophysiology', issuer: 'International Heart Rhythm Society', year: '2023' },
      { title: 'Distinguished Clinical Investigator', issuer: 'Cambridge Medical Trust', year: '2020' }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Arthur Pendelton',
        date: '1 week ago',
        rating: 5.0,
        comment: 'My atrial fibrillation episodes were terrifying. Dr. Liew performed an ablation and I have been arrhythmia-free for 10 months now.'
      }
    ]
  },

  'doc-4': {
    id: 'doc-4',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Dermatology',
    title: 'Head of Cutaneous Medicine & Dermatopathology',
    licenseNumber: 'MD-DERM-41982-MA',
    npiNumber: '1092837465',
    experienceYears: 9,
    clinicAddress: 'Suite 104, Dermatology & Cutaneous Sciences',
    languages: ['English', 'German'],
    philosophy:
      'Combining molecular dermatology with patient-centered cutaneous therapies. Focused on early dermoscopic melanoma identification, advanced biologic interventions for severe psoriasis, and restoring barrier integrity.',
    education: [
      { degree: 'Doctor of Medicine (M.D.)', institution: 'Harvard Medical School', year: '2014' },
      { degree: 'Internal Medicine Preliminary Year', institution: 'Beth Israel Deaconess Medical Center', year: '2015' },
      { degree: 'Dermatology Residency (Chief Resident)', institution: 'Harvard Combined Dermatology Program', year: '2018' },
      { degree: 'Fellowship in Cutaneous Oncology & Laser Medicine', institution: 'Massachusetts General Hospital', year: '2019' }
    ],
    boardCertifications: [
      { name: 'Diplomate in Dermatology', board: 'American Board of Dermatology (ABD)', year: '2018' },
      { name: 'Micrographic Dermatologic Surgery Subspecialty', board: 'American Board of Dermatology', year: '2021' }
    ],
    affiliations: [
      'Fellow, American Academy of Dermatology (FAAD)',
      'Member, American Society for Dermatologic Surgery (ASDS)',
      'Member, Women’s Dermatologic Society (WDS)',
      'International Society of Dermoscopy'
    ],
    publications: [
      {
        title: 'Targeted Interleukin-13 and JAK Inhibitor Regimens in Treatment-Refractory Atopic Dermatitis',
        journal: 'Journal of the American Academy of Dermatology',
        year: '2024',
        citations: 37,
        doi: '10.1016/j.jaad.2023.09.045'
      },
      {
        title: 'High-Resolution Dermoscopy Pattern Recognition for Early Melanoma In Situ Screening',
        journal: 'British Journal of Dermatology',
        year: '2023',
        citations: 53,
        doi: '10.1093/bjd/ljad188'
      }
    ],
    awards: [
      { title: 'Young Dermatologist Investigator Award', issuer: 'American Academy of Dermatology', year: '2023' },
      { title: 'Chief Resident Leadership Distinction', issuer: 'Harvard Combined Dermatology Program', year: '2018' }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Sophia Martinez',
        date: '2 weeks ago',
        rating: 5.0,
        comment: 'Dr. Jenkins cleared my stubborn eczema within weeks after years of misdiagnoses elsewhere. She is caring, gentle, and brilliant.'
      },
      {
        id: 'rev-7',
        author: 'Lucas Vance',
        date: '1 month ago',
        rating: 4.9,
        comment: 'Very thorough full-body skin check. Detected an atypical mole early and handled the biopsy with zero pain.'
      }
    ]
  },

  'doc-5': {
    id: 'doc-5',
    name: 'Dr. Elena Rostova',
    specialty: 'Endocrinology',
    title: 'Director of Diabetes & Metabolic Therapeutics',
    licenseNumber: 'MD-ENDO-63189-IL',
    npiNumber: '1827364501',
    experienceYears: 13,
    clinicAddress: 'Suite 305, Endocrine & Metabolic Center',
    languages: ['English', 'Russian', 'Ukrainian'],
    philosophy:
      'Hormonal harmony through continuous metabolic biomarker tracking. Empowering diabetes patients with real-time CGM data, tailored insulin regimens, and modern bone density preservation therapies.',
    education: [
      { degree: 'Doctor of Medicine (M.D.)', institution: 'Johns Hopkins University School of Medicine', year: '2011' },
      { degree: 'Internal Medicine Residency', institution: 'Mayo Clinic, Rochester', year: '2014' },
      { degree: 'Fellowship in Endocrinology, Diabetes & Metabolism', institution: 'Cleveland Clinic', year: '2017' }
    ],
    boardCertifications: [
      { name: 'Diplomate in Endocrinology, Diabetes, & Metabolism', board: 'American Board of Internal Medicine', year: '2017' },
      { name: 'Endocrine Certification in Neck Ultrasound (ECNU)', board: 'American Association of Clinical Endocrinology', year: '2019' }
    ],
    affiliations: [
      'Fellow of the American College of Endocrinology (FACE)',
      'The Endocrine Society',
      'American Diabetes Association (ADA) Professional Section',
      'Editorial Review Board, Journal of Clinical Endocrinology'
    ],
    publications: [
      {
        title: 'Continuous Glucose Monitoring (CGM) Integration in Complex Type 2 Diabetes: Longitudinal Glycemic Stability',
        journal: 'Diabetes Care',
        year: '2024',
        citations: 58,
        doi: '10.2337/dc23-1782'
      },
      {
        title: 'Subclinical Thyroid Dysfunction and Cardiovascular Risk Endpoints in Postmenopausal Women',
        journal: 'Endocrine Reviews',
        year: '2022',
        citations: 74,
        doi: '10.1210/endrev/bnac018'
      }
    ],
    awards: [
      { title: 'Endocrine Clinical Excellence Award', issuer: 'American College of Endocrinology', year: '2024' },
      { title: 'Distinguished Service in Diabetes Education', issuer: 'Midwest Diabetes Foundation', year: '2021' }
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'Robert Thornton',
        date: '1 week ago',
        rating: 5.0,
        comment: 'Under Dr. Rostova’s guidance my HbA1c dropped from 8.8 to 6.2 without constant hypoglycemia. Her CGM analytics dashboard is a lifesaver.'
      }
    ]
  },

  'doc-6': {
    id: 'doc-6',
    name: 'Dr. Marcus Vance',
    specialty: 'Neurology',
    title: 'Chief of Clinical Neurosciences & Headache Diagnostics',
    licenseNumber: 'MD-NEURO-77102-CA',
    npiNumber: '1901827364',
    experienceYears: 16,
    clinicAddress: 'Suite 510, Neurosciences Diagnostic Wing',
    languages: ['English', 'Spanish'],
    philosophy:
      'Precision diagnostic neurology focused on reducing chronic pain burdens, preventing stroke recurrence, and deploying modern CGRP antagonist therapeutics for migraine sufferers.',
    education: [
      { degree: 'Doctor of Medicine (M.D.)', institution: 'Yale School of Medicine', year: '2008' },
      { degree: 'Neurology Residency (Chief Resident)', institution: 'Hospital of the University of Pennsylvania', year: '2012' },
      { degree: 'Fellowship in Clinical Neurophysiology & Headache Medicine', institution: 'Brigham and Women’s Hospital', year: '2014' }
    ],
    boardCertifications: [
      { name: 'Diplomate in Neurology', board: 'American Board of Psychiatry and Neurology (ABPN)', year: '2012' },
      { name: 'Certified in Headache Medicine', board: 'United Council for Neurologic Subspecialties (UCNS)', year: '2014' },
      { name: 'Diplomate in Clinical Neurophysiology', board: 'ABPN Subspecialty Board', year: '2015' }
    ],
    affiliations: [
      'Fellow of the American Academy of Neurology (FAAN)',
      'American Headache Society (AHS)',
      'World Federation of Neurology',
      'International Parkinson and Movement Disorder Society'
    ],
    publications: [
      {
        title: 'Calcitonin Gene-Related Peptide (CGRP) Targeted Monoclonal Therapies in Chronic Refractory Migraine',
        journal: 'Neurology',
        year: '2024',
        citations: 72,
        doi: '10.1212/WNL.0000000000207891'
      },
      {
        title: 'High-Density EEG Mapping and Neuromodulation in Complex Peripheral Neuropathy',
        journal: 'The Lancet Neurology',
        year: '2022',
        citations: 63,
        doi: '10.1016/S1474-4422(22)00115-4'
      }
    ],
    awards: [
      { title: 'Harold G. Wolff Lecture Distinction in Headache Medicine', issuer: 'American Headache Society', year: '2023' },
      { title: 'Physician of the Year in Neuroscience Care', issuer: 'California Neurological Society', year: '2021' }
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Jennifer Hayes',
        date: '3 weeks ago',
        rating: 5.0,
        comment: 'After 15 years of daily debilitating migraines, Dr. Vance prescribed a targeted treatment plan that gave me my life back. Truly grateful.'
      }
    ]
  },

  'doc-7': {
    id: 'doc-7',
    name: 'Dr. Maya Lin',
    specialty: 'Pediatrics',
    title: 'Director of Pediatric Primary Care & Child Wellness',
    licenseNumber: 'MD-PED-33981-WA',
    npiNumber: '1543219870',
    experienceYears: 8,
    clinicAddress: 'Suite 101, Children & Family Health Hub',
    languages: ['English', 'Mandarin Chinese', 'Japanese'],
    philosophy:
      'Warm, proactive, family-centered pediatrics. Fostering childhood physical milestones, early allergen immunization strategies, and supportive pediatric mental health checkups.',
    education: [
      { degree: 'Doctor of Medicine (M.D.)', institution: 'Stanford University School of Medicine', year: '2016' },
      { degree: 'Pediatrics Residency', institution: 'Boston Children’s Hospital / Harvard Medical School', year: '2019' },
      { degree: 'Fellowship in Pediatric Ambulatory Care & Child Development', institution: 'Children’s Hospital of Philadelphia', year: '2020' }
    ],
    boardCertifications: [
      { name: 'Diplomate in General Pediatrics', board: 'American Board of Pediatrics (ABP)', year: '2019' },
      { name: 'Pediatric Advanced Life Support (PALS) Instructor', board: 'American Heart Association', year: '2020' }
    ],
    affiliations: [
      'Fellow of the American Academy of Pediatrics (FAAP)',
      'Member, Society for Pediatric Research (SPR)',
      'Member, Academic Pediatric Association (APA)',
      'Pediatric Consultant, Regional Children’s Health Network'
    ],
    publications: [
      {
        title: 'Early Allergen Oral Introduction Protocols in High-Risk Pediatric Atopic Cohorts',
        journal: 'Pediatrics',
        year: '2024',
        citations: 39,
        doi: '10.1542/peds.2023-063901'
      },
      {
        title: 'Community-Based Childhood Asthma Action Plans and Emergency Department Utilization Trends',
        journal: 'The Journal of Pediatrics',
        year: '2023',
        citations: 41,
        doi: '10.1016/j.jpeds.2023.04.012'
      }
    ],
    awards: [
      { title: 'Compassionate Pediatrician Award', issuer: 'Parent Advocacy Coalition', year: '2024' },
      { title: 'Excellence in Resident Teaching', issuer: 'Boston Children’s Hospital', year: '2019' }
    ],
    reviews: [
      {
        id: 'rev-10',
        author: 'Emily & David Watson (Parents)',
        date: '1 week ago',
        rating: 5.0,
        comment: 'Dr. Lin is simply extraordinary with our twin toddlers. Gentle, fun, and gives very practical developmental advice that works.'
      }
    ]
  },

  'doc-8': {
    id: 'doc-8',
    name: 'Dr. David Ross',
    specialty: 'Orthopedics',
    title: 'Chief of Orthopedic Surgery & Sports Medicine',
    licenseNumber: 'MD-ORTH-92044-TX',
    npiNumber: '1654321098',
    experienceYears: 15,
    clinicAddress: 'Suite 205, Orthopedic & Sports Medicine Wing',
    languages: ['English', 'German'],
    philosophy:
      'Preserving natural joint kinematics and functional mobility through minimally invasive arthroscopic repair, biologic regenerative therapies, and accelerated athletic physical rehabilitation.',
    education: [
      { degree: 'Doctor of Medicine (M.D.)', institution: 'Duke University School of Medicine', year: '2009' },
      { degree: 'Orthopedic Surgery Residency', institution: 'Hospital for Special Surgery (HSS), New York', year: '2014' },
      { degree: 'Fellowship in Sports Medicine & Shoulder Reconstruction', institution: 'The Steadman Clinic, Vail', year: '2015' }
    ],
    boardCertifications: [
      { name: 'Diplomate in Orthopaedic Surgery', board: 'American Board of Orthopaedic Surgery (ABOS)', year: '2016' },
      { name: 'Subspecialty Certification in Orthopaedic Sports Medicine', board: 'ABOS Subspecialty Committee', year: '2018' }
    ],
    affiliations: [
      'Fellow, American Academy of Orthopaedic Surgeons (FAAOS)',
      'Member, American Orthopaedic Society for Sports Medicine (AOSSM)',
      'Member, Arthroscopy Association of North America (AANA)',
      'Consulting Team Physician, Regional Athletics League'
    ],
    publications: [
      {
        title: 'Comparative Biomechanical Stability of Quadriceps-Tendon vs Bone-Patellar Tendon ACL Reconstructions',
        journal: 'The American Journal of Sports Medicine',
        year: '2024',
        citations: 67,
        doi: '10.1177/03635465231219082'
      },
      {
        title: 'Leukocyte-Poor Platelet-Rich Plasma in Knee Osteoarthritis: 2-Year Randomized Controlled Trial',
        journal: 'The Journal of Bone and Joint Surgery',
        year: '2022',
        citations: 88,
        doi: '10.2106/JBJS.21.00945'
      }
    ],
    awards: [
      { title: 'Top Sports Medicine Surgeon', issuer: 'Orthopedic Surgical Society', year: '2023' },
      { title: 'O’Donoghue Sports Injury Research Award', issuer: 'AOSSM', year: '2020' }
    ],
    reviews: [
      {
        id: 'rev-11',
        author: 'James Wilson',
        date: '2 weeks ago',
        rating: 5.0,
        comment: 'Dr. Ross repaired my torn meniscus arthroscopically. I was walking with minimal discomfort in 48 hours and back cycling within 6 weeks.'
      }
    ]
  }
};

/**
 * Helper to get complete credentials for any doctor with guaranteed fallback
 */
export const getDoctorCredentials = (doctorOrId) => {
  const docId = typeof doctorOrId === 'string' ? doctorOrId : doctorOrId?.id;
  const match = DOCTOR_CREDENTIALS[docId];
  if (match) {
    return match;
  }

  // Fallback generation for any custom or new doctor added at runtime
  const docName = typeof doctorOrId === 'object' ? doctorOrId?.name : 'Medical Specialist';
  const specialty = typeof doctorOrId === 'object' ? doctorOrId?.specialty : 'Clinical Medicine';
  const experienceYears = typeof doctorOrId === 'object' ? (doctorOrId?.experienceYears || 10) : 10;

  return {
    id: docId || 'doc-1',
    name: docName,
    specialty: specialty,
    title: `Consultant in ${specialty}`,
    licenseNumber: `MD-${specialty.substring(0, 4).toUpperCase()}-99100`,
    npiNumber: '1999888777',
    experienceYears: experienceYears,
    clinicAddress: typeof doctorOrId === 'object' ? (doctorOrId?.clinicAddress || 'MediTrack Diagnostic Center') : 'MediTrack Diagnostic Center',
    languages: ['English'],
    philosophy: typeof doctorOrId === 'object' && doctorOrId?.about
      ? doctorOrId.about
      : `Delivering patient-centered, high-acuity care with ${experienceYears} years of clinical expertise.`,
    education: [
      { degree: 'Doctor of Medicine (M.D.)', institution: 'University Medical College', year: '2012' },
      { degree: `${specialty} Specialty Residency`, institution: 'University Teaching Hospital', year: '2016' }
    ],
    boardCertifications: [
      { name: `Board Certified in ${specialty}`, board: 'National Medical Specialty Board', year: '2016' }
    ],
    affiliations: [
      `Fellow, National Society of ${specialty}`,
      'State Medical Licensing Board Certified'
    ],
    publications: [
      {
        title: `Clinical Efficacy and Outcome Metrics in Advanced ${specialty} Care`,
        journal: 'Journal of Modern Clinical Medicine',
        year: '2023',
        citations: 18,
        doi: '10.1016/j.jmcm.2023.01.002'
      }
    ],
    awards: [
      { title: 'Clinical Care Recognition', issuer: 'Hospital Quality Board', year: '2023' }
    ],
    reviews: [
      {
        id: 'rev-def-1',
        author: 'Clinic Patient',
        date: 'Recent visit',
        rating: 4.9,
        comment: 'Attentive, skilled, and took time to address all my clinical questions.'
      }
    ]
  };
};
