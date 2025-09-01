'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { services } from '@/data/services';
import { providers } from '@/data/providers';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceId: searchParams?.get('service') || '',
    providerId: searchParams?.get('provider') || '',
    date: undefined as Date | undefined,
    time: '',
    duration: '',
    address: '',
    notes: '',
    emergencyContact: '',
    totalCost: 0,
    platformFee: 0
  });

  const selectedService = services.find(s => s.id === bookingData.serviceId);
  const selectedProvider = providers.find(p => p.id === bookingData.providerId);
  
  const availableProviders = bookingData.serviceId 
    ? providers.filter(provider => {
        const service = services.find(s => s.id === bookingData.serviceId);
        if (!service) return false;
        const serviceKeywords = service.name.toLowerCase().split(' ');
        return serviceKeywords.some(keyword => 
          provider.specializations.some(spec => 
            spec.toLowerCase().includes(keyword) || keyword.includes(spec.toLowerCase())
          ) || provider.profession.toLowerCase().includes(keyword)
        );
      })
    : [];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const durationOptions = selectedService ? [
    { value: '1', label: '1 hour' },
    { value: '2', label: '2 hours' },
    { value: '4', label: '4 hours' },
    { value: '8', label: '8 hours' },
    { value: '24', label: '24 hours' }
  ] : [];

  useEffect(() => {
    if (selectedService && bookingData.duration) {
      const hours = parseInt(bookingData.duration);
      const baseCost = selectedService.priceMin + (hours * 100); // Simple calculation
      const platformFee = Math.round(baseCost * 0.25);
      setBookingData(prev => ({
        ...prev,
        totalCost: baseCost,
        platformFee: platformFee
      }));
    }
  }, [selectedService, bookingData.duration]);

  const steps = [
    { number: 1, title: 'Select Service', description: 'Choose your healthcare service' },
    { number: 2, title: 'Choose Provider', description: 'Select a qualified professional' },
    { number: 3, title: 'Schedule', description: 'Pick date and time' },
    { number: 4, title: 'Details', description: 'Provide service details' },
    { number: 5, title: 'Confirm', description: 'Review and confirm booking' }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = () => {
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    // In real app, submit to API and redirect
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return bookingData.serviceId;
      case 2: return bookingData.providerId;
      case 3: return bookingData.date && bookingData.time;
      case 4: return bookingData.address && bookingData.duration;
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Healthcare Service</h1>
            <p className="text-gray-600">Follow the steps below to book your preferred healthcare service</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex flex-col items-center min-w-0 ${index < steps.length - 1 ? 'mr-4' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                      ${currentStep >= step.number 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'}`}>
                      {step.number}
                    </div>
                    <div className="text-center mt-2 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{step.title}</p>
                      <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-px w-8 mx-4 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
                  <CardDescription>{steps[currentStep - 1].description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Select Service */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Choose Healthcare Service</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {services.map((service) => (
                          <Card 
                            key={service.id} 
                            className={`cursor-pointer transition-all ${
                              bookingData.serviceId === service.id 
                                ? 'ring-2 ring-blue-500 bg-blue-50' 
                                : 'hover:shadow-md'
                            }`}
                            onClick={() => setBookingData(prev => ({ ...prev, serviceId: service.id }))}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold">{service.name}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{service.shortDescription}</p>
                                  <Badge variant="outline" className="mt-2">
                                    {service.priceRange}
                                  </Badge>
                                </div>
                                <Badge variant={service.availability === '24/7' ? 'default' : 'secondary'}>
                                  {service.availability}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Choose Provider */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Select Healthcare Provider</h3>
                      {availableProviders.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {availableProviders.map((provider) => (
                            <Card 
                              key={provider.id}
                              className={`cursor-pointer transition-all ${
                                bookingData.providerId === provider.id 
                                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                                  : 'hover:shadow-md'
                              }`}
                              onClick={() => setBookingData(prev => ({ ...prev, providerId: provider.id }))}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-4">
                                  <img 
                                    src={provider.profileImage}
                                    alt={provider.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold">{provider.name}</h4>
                                    <p className="text-sm text-blue-600">{provider.profession}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                      <span className="text-sm text-gray-600">
                                        {provider.experience} years exp.
                                      </span>
                                      <span className="text-sm text-yellow-600">
                                        ★ {provider.rating} ({provider.totalReviews})
                                      </span>
                                      <Badge 
                                        variant={provider.availability === 'available' ? 'default' : 'secondary'}
                                        className="text-xs"
                                      >
                                        {provider.availability}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600">No providers available for this service.</p>
                          <Button variant="outline" onClick={() => setCurrentStep(1)}>
                            Choose Different Service
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Schedule */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="font-semibold">Select Date and Time</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium mb-3 block">Choose Date</Label>
                          <Calendar
                            mode="single"
                            selected={bookingData.date}
                            onSelect={(date) => setBookingData(prev => ({ ...prev, date }))}
                            disabled={(date) => date < new Date()}
                            className="rounded-md border"
                          />
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="time">Available Time Slots</Label>
                            <Select 
                              value={bookingData.time} 
                              onValueChange={(value) => setBookingData(prev => ({ ...prev, time: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Details */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h3 className="font-semibold">Service Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Service Duration</Label>
                          <Select 
                            value={bookingData.duration} 
                            onValueChange={(value) => setBookingData(prev => ({ ...prev, duration: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              {durationOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergency-contact">Emergency Contact</Label>
                          <Input
                            id="emergency-contact"
                            type="tel"
                            value={bookingData.emergencyContact}
                            onChange={(e) => setBookingData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                            placeholder="Emergency contact number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Service Address</Label>
                        <Textarea
                          id="address"
                          value={bookingData.address}
                          onChange={(e) => setBookingData(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Complete address where service is needed"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Special Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={bookingData.notes}
                          onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Any special requirements or medical conditions to note"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Confirmation */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <h3 className="font-semibold">Booking Summary</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Service</Label>
                            <p className="text-sm font-medium">{selectedService?.name}</p>
                          </div>
                          <div className="space-y-2">
                            <Label>Provider</Label>
                            <p className="text-sm font-medium">{selectedProvider?.name}</p>
                          </div>
                          <div className="space-y-2">
                            <Label>Date & Time</Label>
                            <p className="text-sm font-medium">
                              {bookingData.date ? bookingData.date.toLocaleDateString() : ''} at {bookingData.time}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label>Duration</Label>
                            <p className="text-sm font-medium">{bookingData.duration} hours</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Address</Label>
                          <p className="text-sm">{bookingData.address}</p>
                        </div>
                        
                        {bookingData.notes && (
                          <div className="space-y-2">
                            <Label>Special Notes</Label>
                            <p className="text-sm">{bookingData.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    
                    {currentStep < 5 ? (
                      <Button 
                        onClick={handleNext}
                        disabled={!canProceed()}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button onClick={handleBookingSubmit}>
                        Confirm Booking
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedService && (
                    <div>
                      <Label className="text-sm font-medium">Service</Label>
                      <p className="text-sm">{selectedService.name}</p>
                      <Badge variant="outline" className="mt-1">
                        {selectedService.availability}
                      </Badge>
                    </div>
                  )}

                  {selectedProvider && (
                    <div>
                      <Label className="text-sm font-medium">Provider</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <img 
                          src={selectedProvider.profileImage}
                          alt={selectedProvider.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium">{selectedProvider.name}</p>
                          <p className="text-xs text-gray-600">{selectedProvider.profession}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingData.date && bookingData.time && (
                    <div>
                      <Label className="text-sm font-medium">Schedule</Label>
                      <p className="text-sm">
                        {bookingData.date?.toLocaleDateString()}
                      </p>
                      <p className="text-sm">{bookingData.time}</p>
                    </div>
                  )}

                  {bookingData.duration && (
                    <div>
                      <Label className="text-sm font-medium">Duration</Label>
                      <p className="text-sm">{bookingData.duration} hours</p>
                    </div>
                  )}

                  {bookingData.totalCost > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Service Fee:</span>
                          <span>₹{bookingData.totalCost}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Platform Fee (25%):</span>
                          <span>₹{bookingData.platformFee}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>₹{bookingData.totalCost + bookingData.platformFee}</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="pt-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-700">
                        ✓ Qualified professionals
                      </p>
                      <p className="text-xs text-green-700">
                        ✓ 24/7 support available
                      </p>
                      <p className="text-xs text-green-700">
                        ✓ Transparent pricing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="mt-4 bg-red-50 border-red-200">
                <CardContent className="p-4 text-center">
                  <Badge variant="destructive" className="mb-2">Emergency</Badge>
                  <p className="text-sm text-red-700 mb-3">
                    Need immediate assistance?
                  </p>
                  <Button size="sm" variant="destructive" asChild>
                    <a href="tel:9999917016">Call: 9999917016</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}