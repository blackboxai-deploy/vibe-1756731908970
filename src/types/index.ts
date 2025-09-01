export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  unit: string;
  features: string[];
  category: 'medical' | 'care' | 'emergency' | 'diagnostic';
  availability: '24/7' | 'scheduled';
  duration?: string;
}

export interface Provider {
  id: string;
  name: string;
  profession: string;
  experience: number;
  rating: number;
  totalReviews: number;
  specializations: string[];
  availability: 'available' | 'busy' | 'offline';
  location: string;
  profileImage?: string;
  certifications: string[];
  languages: string[];
}

export interface Booking {
  id: string;
  serviceId: string;
  providerId: string;
  userId: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  address: string;
  totalCost: number;
  platformFee: number;
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  medicalHistory?: string[];
  profileImage?: string;
  isProvider: boolean;
}

export interface TrackingStatus {
  bookingId: string;
  status: 'booked' | 'provider-assigned' | 'en-route' | 'arrived' | 'in-progress' | 'completed';
  estimatedArrival?: string;
  currentLocation?: string;
  updates: {
    timestamp: string;
    message: string;
    status: string;
  }[];
}