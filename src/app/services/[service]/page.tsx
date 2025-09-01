'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { services } from '@/data/services';
import { providers } from '@/data/providers';

interface ServicePageProps {
  params: { service: string };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find(s => s.id === params.service);
  
  if (!service) {
    notFound();
  }

  // Get related providers for this service (simplified matching)
  const relatedProviders = providers.filter(provider => {
    const serviceKeywords = service.name.toLowerCase().split(' ');
    return serviceKeywords.some(keyword => 
      provider.specializations.some(spec => 
        spec.toLowerCase().includes(keyword) || keyword.includes(spec.toLowerCase())
      ) || provider.profession.toLowerCase().includes(keyword)
    );
  }).slice(0, 3);

  const categoryColors = {
    medical: 'bg-blue-100 text-blue-800 border-blue-200',
    care: 'bg-green-100 text-green-800 border-green-200',
    emergency: 'bg-red-100 text-red-800 border-red-200',
    diagnostic: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const availabilityColors = {
    '24/7': 'bg-emerald-100 text-emerald-800',
    'scheduled': 'bg-amber-100 text-amber-800'
  };

  const platformFee = Math.round(service.priceMax * 0.25);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-blue-600">Services</Link>
            <span>/</span>
            <span className="text-gray-900">{service.name}</span>
          </nav>
        </div>
      </section>

      {/* Service Header */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="outline" 
                    className={categoryColors[service.category]}
                  >
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)} Service
                  </Badge>
                  <Badge 
                    variant="secondary"
                    className={availabilityColors[service.availability]}
                  >
                    {service.availability} Available
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  {service.name}
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Pricing Information */}
              <div className="p-6 bg-white rounded-xl shadow-sm border">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Pricing Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Fee Range:</span>
                    <span className="font-bold text-lg text-gray-900">{service.priceRange}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Platform Fee (25%):</span>
                    <span className="font-medium text-gray-700">₹{platformFee}+</span>
                  </div>
                  {service.duration && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-700">{service.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button size="lg" asChild className="flex-1">
                  <Link href={`/booking?service=${service.id}`}>
                    Book This Service
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Get Information
                  </Link>
                </Button>
              </div>
            </div>

            {/* Service Image */}
            <div className="relative">
              <img 
                src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/381831db-6383-496a-b730-6e29555f34d7.png + ' professional healthcare service in modern home setting')}`}
                alt={`${service.name} professional healthcare service`}
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              
              {/* Floating Features */}
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{service.availability}</div>
                  <div className="text-xs text-gray-600">Availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What&apos;s Included in This Service
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">{index + 1}</span>
                  </div>
                  <CardTitle className="text-lg">{feature}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Professional {feature.toLowerCase()} provided by our qualified healthcare team.
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Providers */}
      {relatedProviders.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Available Providers
              </h2>
              <p className="text-lg text-gray-600">
                Qualified professionals ready to provide {service.name.toLowerCase()} services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <img 
                      src={provider.profileImage}
                      alt={`${provider.name} - ${provider.profession}`}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <CardDescription>{provider.profession}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Experience:</span>
                      <span className="font-medium">{provider.experience} years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <span className="font-medium">{provider.rating}</span>
                        <span className="text-yellow-500 ml-1">★</span>
                        <span className="text-xs text-gray-500 ml-1">({provider.totalReviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="font-medium text-sm">{provider.location}</span>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.specializations.slice(0, 2).map((spec, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/booking?service=${service.id}&provider=${provider.id}`}>
                        Book with {provider.name.split(' ')[0]}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/providers">
                  View All Providers
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Emergency Note */}
      {service.category === 'emergency' && (
        <section className="py-12 bg-red-50">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="destructive" className="mb-4">Emergency Service</Badge>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Immediate {service.name}?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              For urgent situations, call our emergency hotline for immediate assistance. 
              Our team is available 24/7 for critical healthcare needs.
            </p>
            <Button size="lg" variant="destructive" asChild>
              <a href="tel:9999917016">Emergency Call: 9999917016</a>
            </Button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}