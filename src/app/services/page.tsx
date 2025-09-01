'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { services } from '@/data/services';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'medical', label: 'Medical Services' },
    { value: 'care', label: 'Care Services' },
    { value: 'emergency', label: 'Emergency Services' },
    { value: 'diagnostic', label: 'Diagnostic Services' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Services' },
    { value: '24/7', label: '24/7 Available' },
    { value: 'scheduled', label: 'Scheduled Services' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesAvailability = availabilityFilter === 'all' || service.availability === availabilityFilter;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">Professional Healthcare Services</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Healthcare Services
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Comprehensive home healthcare solutions in Faridabad with qualified 
              professionals and modern medical equipment delivered to your doorstep.
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
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-48">
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
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredServices.length} of {services.length} services
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all services.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                    setAvailabilityFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Service Categories Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Healthcare Service Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our services are organized into categories to help you find 
              the right healthcare solution for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(1).map((category) => {
              const categoryServices = services.filter(s => s.category === category.value);
              const categoryColors = {
                medical: 'border-blue-200 bg-blue-50',
                care: 'border-green-200 bg-green-50',
                emergency: 'border-red-200 bg-red-50',
                diagnostic: 'border-purple-200 bg-purple-50'
              };
              
              return (
                <div 
                  key={category.value} 
                  className={`p-6 rounded-xl border-2 ${categoryColors[category.value as keyof typeof categoryColors]} hover:shadow-md transition-all`}
                >
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {category.label}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {categoryServices.length} services available
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCategoryFilter(category.value)}
                  >
                    View Services
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="destructive" className="mb-4">24/7 Emergency Available</Badge>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Immediate Medical Assistance?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our emergency response team is always ready to help. 
            Call now for urgent medical care, ambulance services, or critical support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="destructive" asChild>
              <a href="tel:9999917016">Emergency: 9999917016</a>
            </Button>
            <Button size="lg" variant="outline">
              <a href="mailto:ncrhomecareservice@gmail.com">Email Support</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}