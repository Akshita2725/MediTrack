/**
 * Pharmacy & Medical Supplies Product Catalog for Shopping Cart Feature (Topic 49-54)
 */
export const PHARMACY_PRODUCTS = [
  {
    id: 'med-01',
    name: 'Amoxicillin 500mg',
    category: 'Antibiotics',
    price: 18.50,
    rating: 4.8,
    reviews: 142,
    stock: 24,
    prescriptionRequired: true,
    description: 'Broad-spectrum antibiotic used to treat bacterial infections.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    tags: ['Antibiotic', 'Capsules']
  },
  {
    id: 'med-02',
    name: 'Digital Pulse Oximeter Pro',
    category: 'Diagnostic',
    price: 34.99,
    rating: 4.9,
    reviews: 320,
    stock: 15,
    prescriptionRequired: false,
    description: 'Instant blood oxygen saturation (SpO2) and pulse rate monitor with OLED display.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&auto=format&fit=crop&q=80',
    tags: ['Medical Device', 'Diagnostics']
  },
  {
    id: 'med-03',
    name: 'Ibuprofen 400mg Softgels',
    category: 'Pain Relief',
    price: 12.00,
    rating: 4.7,
    reviews: 215,
    stock: 45,
    prescriptionRequired: false,
    description: 'Non-steroidal anti-inflammatory drug (NSAID) for fever, aches, and pain.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&auto=format&fit=crop&q=80',
    tags: ['Pain Relief', 'OTC']
  },
  {
    id: 'med-04',
    name: 'Automatic Upper-Arm Blood Pressure Monitor',
    category: 'Diagnostic',
    price: 54.00,
    rating: 4.9,
    reviews: 180,
    stock: 8,
    prescriptionRequired: false,
    description: 'Clinical-accuracy hypertension monitor with heart arrhythmia detector.',
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&auto=format&fit=crop&q=80',
    tags: ['Diagnostic', 'Cardio']
  },
  {
    id: 'med-05',
    name: 'Salbutamol Inhaler (100mcg)',
    category: 'Chronic Care',
    price: 24.50,
    rating: 4.9,
    reviews: 95,
    stock: 18,
    prescriptionRequired: true,
    description: 'Bronchodilator fast-acting inhaler for asthma and respiratory relief.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&auto=format&fit=crop&q=80',
    tags: ['Respiratory', 'Prescription']
  },
  {
    id: 'med-06',
    name: 'Sterile First Aid Trauma Kit',
    category: 'First Aid',
    price: 29.95,
    rating: 4.6,
    reviews: 88,
    stock: 30,
    prescriptionRequired: false,
    description: 'Comprehensive 120-piece kit with antiseptic wipes, bandages, surgical tape, and shears.',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=300&auto=format&fit=crop&q=80',
    tags: ['First Aid', 'Emergency']
  },
  {
    id: 'med-07',
    name: 'Metformin 850mg Tablets',
    category: 'Chronic Care',
    price: 15.20,
    rating: 4.8,
    reviews: 110,
    stock: 50,
    prescriptionRequired: true,
    description: 'First-line medication for the treatment of type 2 diabetes mellitus.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&auto=format&fit=crop&q=80',
    tags: ['Diabetes', 'Prescription']
  },
  {
    id: 'med-08',
    name: 'Vitamin C + Zinc Liposomal Complex',
    category: 'Wellness',
    price: 16.80,
    rating: 4.7,
    reviews: 260,
    stock: 60,
    prescriptionRequired: false,
    description: 'Immune support dietary supplement with enhanced bioavailability.',
    image: 'https://images.unsplash.com/photo-1550572017-ed21f644e590?w=300&auto=format&fit=crop&q=80',
    tags: ['Wellness', 'Vitamins']
  }
];

export const PHARMACY_CATEGORIES = [
  'All',
  'Antibiotics',
  'Diagnostic',
  'Pain Relief',
  'Chronic Care',
  'First Aid',
  'Wellness'
];
