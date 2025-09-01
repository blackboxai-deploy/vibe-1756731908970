'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceCard } from '@/components/services/ServiceCard';
import { services } from '@/data/services';

export default function HomePage() {
  const heroFeatures = [
    'Qualified Healthcare Professionals',
    'Transparent Pricing with 25% Platform Fee',
    '24/7 Emergency Response Available',
    'Digital Platform for Easy Booking'
  ];

  const howItWorksSteps = [
    {
      step: '1',
      title: 'Register Account',
      description: 'Create your account to access our healthcare services'
    },
    {
      step: '2',
      title: 'Browse Providers',
      description: 'Find qualified providers with ratings and credentials'
    },
    {
      step: '3',
      title: 'Book Service',
      description: 'Schedule your preferred service at convenient time'
    },
    {
      step: '4',
      title: 'Track Progress',
      description: 'Monitor service status with real-time updates'
    }
  ];

  const trustIndicators = [
    { label: 'Licensed Nurses', value: '50+' },
    { label: 'Trained Caregivers', value: '100+' },
    { label: 'Happy Families', value: '1000+' },
    { label: 'Emergency Response', value: '24/7' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  Professional Home Care Services in Faridabad
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Comprehensive Healthcare 
                  <span className="text-blue-600"> at Your Doorstep</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  Access qualified healthcare professionals and modern medical equipment 
                  delivered right to your home. From patient care to emergency services, 
                  we provide complete healthcare solutions in Faridabad.
                </p>
              </div>

              {/* Hero Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/services">
                    Explore Services
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">
                    Emergency: 9999917016
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/110a8487-2763-4181-8201-33c82fc353e5.png"
                  alt="Professional home healthcare team providing care to elderly patient at home"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">24/7</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Emergency Available</p>
                      <p className="text-xs text-gray-600">Always ready to help</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Background Elements */}
              <div className="absolute top-8 -right-8 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 right-12 w-16 h-16 bg-green-200 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600">{indicator.value}</div>
                <div className="text-sm text-gray-600 mt-1">{indicator.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Our Healthcare Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Healthcare Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From professional nursing to emergency ambulance services, we provide 
              comprehensive healthcare support for your family's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting professional healthcare services at home is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={step.step} className="text-center">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold">{step.step}</span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge variant="destructive" className="mb-4">24/7 Emergency Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our emergency response team is available round the clock for urgent medical 
              assistance, ambulance services, and critical care support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="p-6 bg-white rounded-xl shadow-md">
                <p className="text-sm text-gray-600 mb-1">Emergency Hotline</p>
                <p className="text-2xl font-bold text-red-600">9999917016</p>
                <p className="text-xs text-gray-500">Available 24/7</p>
              </div>
              
              <div className="flex gap-3">
                <Button size="lg" variant="destructive" asChild>
                  <Link href="tel:9999917016">
                    Call Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services/ambulance-service">
                    Book Ambulance
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}