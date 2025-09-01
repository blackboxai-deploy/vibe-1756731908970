'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    userType: '',
    emergencyContact: '',
    medicalHistory: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      alert('Registration successful! Please check your email for verification.');
      setIsLoading(false);
      // In real app, redirect to login or dashboard
      window.location.href = '/auth/login';
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const userTypes = [
    { value: 'patient', label: 'Patient/Family' },
    { value: 'provider', label: 'Healthcare Provider' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">NCR</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join NCR Home Care for professional healthcare services in Faridabad
            </p>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Register for NCR Home Care</CardTitle>
              <CardDescription>
                Fill out the form below to create your account and access healthcare services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  
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
                        placeholder="Your mobile number"
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
                    <Label htmlFor="userType">Account Type *</Label>
                    <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        {userTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        placeholder="Create a strong password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        required
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                        placeholder="Your complete address in Faridabad"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        type="tel"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        placeholder="Emergency contact number"
                      />
                    </div>
                  </div>
                </div>

                {/* Medical History (for patients) */}
                {formData.userType === 'patient' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
                      <Textarea
                        id="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                        placeholder="Brief medical history, allergies, current medications..."
                        rows={3}
                      />
                      <p className="text-xs text-gray-500">
                        This information helps our providers give you better care
                      </p>
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-5">
                      I agree to the{' '}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>

          {/* Provider Registration Info */}
          {formData.userType === 'provider' && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Badge className="mb-3">Healthcare Provider</Badge>
                  <p className="text-sm text-blue-700 mb-3">
                    After registration, our team will verify your credentials and certifications. 
                    This process typically takes 24-48 hours.
                  </p>
                  <p className="text-xs text-blue-600">
                    You will receive an email with verification requirements and next steps.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Contact */}
          <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-center">
              <Badge variant="destructive" className="mb-2">24/7 Emergency</Badge>
              <p className="text-sm text-red-700 mb-2">
                Need immediate medical assistance?
              </p>
              <Button size="sm" variant="destructive" asChild>
                <a href="tel:9999917016">Call: 9999917016</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}