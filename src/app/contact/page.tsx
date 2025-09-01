'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 2 hours.');
  };

  const contactMethods = [
    {
      title: '24/7 Emergency Hotline',
      content: '9999917016',
      description: 'Available round the clock for urgent medical assistance',
      action: 'Call Now',
      href: 'tel:9999917016',
      variant: 'destructive' as const,
      urgent: true
    },
    {
      title: 'Email Support',
      content: 'ncrhomecareservice@gmail.com',
      description: 'Response within 2 hours during business hours',
      action: 'Send Email',
      href: 'mailto:ncrhomecareservice@gmail.com',
      variant: 'default' as const,
      urgent: false
    },
    {
      title: 'Service Location',
      content: 'Vashisht, Faridabad, Haryana',
      description: 'Serving all areas within Faridabad city limits',
      action: 'Get Directions',
      href: '#location-map',
      variant: 'outline' as const,
      urgent: false
    }
  ];

  const serviceOptions = [
    'Patient Care',
    'Elderly Care', 
    'Physiotherapy',
    'Medical Equipment Rental',
    'Pathlab Services',
    'Ambulance Service',
    'General Inquiry'
  ];

  const faqs = [
    {
      question: 'What areas do you serve in Faridabad?',
      answer: 'We provide services across all sectors of Faridabad including Old Faridabad, NIT, Ballabhgarh, Tigaon, and surrounding areas.'
    },
    {
      question: 'How quickly can you respond to emergency calls?',
      answer: 'Our emergency response team typically arrives within 15-30 minutes depending on your location and traffic conditions.'
    },
    {
      question: 'Are your healthcare providers licensed and certified?',
      answer: 'Yes, all our providers are licensed professionals with verified certifications and regular training updates.'
    },
    {
      question: 'What is included in the platform fee?',
      answer: 'The 25% platform fee covers booking management, insurance, quality assurance, customer support, and payment processing.'
    },
    {
      question: 'Can I cancel or reschedule my booking?',
      answer: 'Yes, you can cancel or reschedule bookings up to 4 hours before the scheduled time without any penalty.'
    },
    {
      question: 'Do you accept insurance or government schemes?',
      answer: 'We are working on insurance partnerships. Currently, payments are direct but we provide detailed receipts for reimbursement claims.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">Get In Touch</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Contact NCR Home Care
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Need help or have questions? Our support team is here to assist you 24/7. 
              Reach out for bookings, emergencies, or general inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="py-8 bg-red-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">24/7</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Emergency Services Available</h3>
                <p className="text-sm text-gray-600">Immediate response for urgent medical situations</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Emergency Hotline</p>
                <p className="text-2xl font-bold text-red-600">9999917016</p>
              </div>
              <Button size="lg" variant="destructive" asChild>
                <a href="tel:9999917016">Call Emergency</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-lg text-gray-600">
              Choose the most convenient method to get in touch with our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`text-center ${method.urgent ? 'ring-2 ring-red-200 bg-red-50' : ''}`}>
                <CardHeader>
                  {method.urgent && (
                    <Badge variant="destructive" className="mb-2 self-center">
                      Emergency
                    </Badge>
                  )}
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-bold text-lg text-gray-900">{method.content}</p>
                  </div>
                  <Button variant={method.variant} className="w-full" asChild>
                    <a href={method.href}>
                      {method.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you within 2 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest</Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      placeholder="Tell us how we can help you..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Emergency Services:</span>
                    <Badge variant="destructive">24/7 Available</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Scheduled Services:</span>
                    <span className="font-medium">6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Customer Support:</span>
                    <span className="font-medium">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email Response:</span>
                    <span className="font-medium">Within 2 hours</span>
                  </div>
                </CardContent>
              </Card>

              {/* Service Areas */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-3">
                      We provide healthcare services across these areas in Faridabad:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Sector 1-89
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Old Faridabad
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        NIT Faridabad
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Ballabhgarh
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Tigaon
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Vashisht
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/services">Browse Our Services</a>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/providers">Find Healthcare Providers</a>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/booking">Book a Service</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Still have questions? We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="tel:9999917016">Call Support: 9999917016</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:ncrhomecareservice@gmail.com">Email Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}