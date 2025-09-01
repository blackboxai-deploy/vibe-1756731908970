import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'patient-care',
    name: 'Patient Care',
    description: 'Professional nursing and medical assistance at home with 24/7 monitoring, medication management, vital signs check, and comprehensive medical reports.',
    shortDescription: 'Professional nursing and medical assistance at home',
    priceRange: '₹2,000-₹3,000 per day',
    priceMin: 2000,
    priceMax: 3000,
    unit: 'per day',
    features: [
      '24/7 monitoring',
      'Medication management',
      'Vital signs check',
      'Medical reports',
      'Professional nursing care',
      'Emergency response'
    ],
    category: 'medical',
    availability: '24/7'
  },
  {
    id: 'elderly-care',
    name: 'Elderly Care',
    description: 'Compassionate care for elderly family members with assistance in daily activities, companionship, safety monitoring, and meal preparation.',
    shortDescription: 'Compassionate care for elderly family members',
    priceRange: '₹1,000-₹2,000 per day',
    priceMin: 1000,
    priceMax: 2000,
    unit: 'per day',
    features: [
      'Daily activities assistance',
      'Companionship',
      'Safety monitoring',
      'Meal preparation',
      'Personal hygiene care',
      'Mobility support'
    ],
    category: 'care',
    availability: '24/7'
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    description: 'Professional physiotherapy services at home including exercise therapy, pain relief treatments, mobility improvement, and strength building programs.',
    shortDescription: 'Professional physiotherapy services at home',
    priceRange: '₹800-₹1,500 per session',
    priceMin: 800,
    priceMax: 1500,
    unit: 'per session',
    features: [
      'Exercise therapy',
      'Pain relief treatments',
      'Mobility improvement',
      'Strength building',
      'Rehabilitation programs',
      'Progress tracking'
    ],
    category: 'medical',
    availability: 'scheduled',
    duration: '60-90 minutes'
  },
  {
    id: 'medical-equipment',
    name: 'Medical Equipment Rental',
    description: 'Hospital equipment rental for home care including ICU beds, oxygen concentrators, ventilators, and other essential medical devices.',
    shortDescription: 'Hospital equipment rental for home care',
    priceRange: '₹500-₹15,000 per day',
    priceMin: 500,
    priceMax: 15000,
    unit: 'per day',
    features: [
      'ICU beds',
      'Oxygen concentrators',
      'Ventilators',
      'Medical monitors',
      'Wheelchairs',
      'Installation & maintenance'
    ],
    category: 'medical',
    availability: '24/7'
  },
  {
    id: 'pathlab-services',
    name: 'Pathlab Services',
    description: 'Comprehensive diagnostic tests at your doorstep including blood tests, urine analysis, ECG, and complete health checkups.',
    shortDescription: 'Diagnostic tests at your doorstep',
    priceRange: '₹300-₹5,000 per test',
    priceMin: 300,
    priceMax: 5000,
    unit: 'per test',
    features: [
      'Blood tests',
      'Urine analysis',
      'ECG services',
      'Health checkups',
      'Home sample collection',
      'Fast results'
    ],
    category: 'diagnostic',
    availability: 'scheduled'
  },
  {
    id: 'ambulance-service',
    name: 'Ambulance Service',
    description: '24x7 emergency ambulance service with AC and Non-AC ambulances, BLS equipped vehicles, and immediate emergency response.',
    shortDescription: '24x7 emergency ambulance service',
    priceRange: '₹40-₹200 per km',
    priceMin: 40,
    priceMax: 200,
    unit: 'per km',
    features: [
      'AC & Non-AC ambulances',
      'BLS equipped',
      'Emergency response',
      'Trained paramedics',
      'GPS tracking',
      '24x7 availability'
    ],
    category: 'emergency',
    availability: '24/7'
  }
];