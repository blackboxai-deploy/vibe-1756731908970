'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { providers } from '@/data/providers';

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [professionFilter, setProfessionFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const professions = [
    { value: 'all', label: 'All Professions' },
    ...Array.from(new Set(providers.map(p => p.profession))).map(prof => ({
      value: prof,
      label: prof
    }))
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    ...Array.from(new Set(providers.map(p => p.location))).map(loc => ({
      value: loc,
      label: loc
    }))
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Providers' },
    { value: 'available', label: 'Available Now' },
    { value: 'busy', label: 'Currently Busy' },
    { value: 'offline', label: 'Offline' }
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProfession = professionFilter === 'all' || provider.profession === professionFilter;
    const matchesAvailability = availabilityFilter === 'all' || provider.availability === availabilityFilter;
    const matchesLocation = locationFilter === 'all' || provider.location === locationFilter;
    
    return matchesSearch && matchesProfession && matchesAvailability && matchesLocation;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">Qualified Healthcare Professionals</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Healthcare Providers
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Meet our team of licensed nurses, trained caregivers, and certified healthcare 
              professionals serving Faridabad with dedication and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 min-w-0">
              <Input
                placeholder="Search providers, professions, or specializations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={professionFilter} onValueChange={setProfessionFilter}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {professions.map(profession => (
                    <SelectItem key={profession.value} value={profession.value}>
                      {profession.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredProviders.length} of {providers.length} providers
            </p>
          </div>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProviders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="relative mb-4">
                      <img 
                        src={provider.profileImage}
                        alt={`${provider.name} - ${provider.profession}`}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md"
                      />
                      <Badge 
                        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${getAvailabilityColor(provider.availability)}`}
                        variant="secondary"
                      >
                        {provider.availability}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{provider.name}</CardTitle>
                    <CardDescription className="font-medium text-blue-600">
                      {provider.profession}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{provider.experience}</div>
                        <div className="text-xs text-gray-600">Years Exp.</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-yellow-600 flex items-center justify-center">
                          {provider.rating} <span className="text-yellow-500 ml-1">★</span>
                        </div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{provider.totalReviews}</div>
                        <div className="text-xs text-gray-600">Reviews</div>
                      </div>
                    </div>

                    <Separator />

                    {/* Location */}
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Location:</p>
                      <p className="font-medium text-sm">{provider.location}</p>
                    </div>

                    {/* Specializations */}
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.specializations.slice(0, 3).map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                        {provider.specializations.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{provider.specializations.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Certifications:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.certifications.slice(0, 2).map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {provider.certifications.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{provider.certifications.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Languages:</p>
                      <p className="text-sm">{provider.languages.join(', ')}</p>
                    </div>

                    <Separator />

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        disabled={provider.availability === 'offline'}
                        asChild={provider.availability !== 'offline'}
                      >
                        {provider.availability !== 'offline' ? (
                          <Link href={`/booking?provider=${provider.id}`}>
                            Book with {provider.name.split(' ')[0]}
                          </Link>
                        ) : (
                          <span>Currently Unavailable</span>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No providers found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all providers.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setProfessionFilter('all');
                    setAvailabilityFilter('all');
                    setLocationFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Provider Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Healthcare Network
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of families across Faridabad for quality healthcare services
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{providers.filter(p => p.profession.includes('Nurse')).length}+</div>
              <div className="text-sm text-gray-600 mt-1">Licensed Nurses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{providers.filter(p => p.profession.includes('Attendant') || p.profession.includes('Caregiver')).length}+</div>
              <div className="text-sm text-gray-600 mt-1">Trained Caregivers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{providers.filter(p => p.profession.includes('Doctor') || p.profession.includes('Physician')).length}+</div>
              <div className="text-sm text-gray-600 mt-1">Qualified Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Emergency Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Browse our services and book with qualified healthcare providers in Faridabad. 
            Professional care delivered right to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-blue-600" asChild>
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}