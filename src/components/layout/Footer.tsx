import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function Footer() {
  const quickLinks = [
    { name: 'Patient Care', href: '/services/patient-care' },
    { name: 'Elderly Care', href: '/services/elderly-care' },
    { name: 'Physiotherapy', href: '/services/physiotherapy' },
    { name: 'Medical Equipment', href: '/services/medical-equipment' },
    { name: 'Pathlab Services', href: '/services/pathlab-services' },
    { name: 'Ambulance Service', href: '/services/ambulance-service' }
  ];

  const supportLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Find Providers', href: '/providers' },
    { name: 'Book Service', href: '/booking' },
    { name: 'Track Service', href: '/booking/track' },
    { name: 'Help & Support', href: '/contact' }
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">NCR</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">NCR Home Care</h3>
                <p className="text-sm text-gray-600">Professional Healthcare</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Professional home healthcare services in Faridabad with qualified providers, 
              modern medical equipment, and 24/7 support for your family's health needs.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Qualified Professionals</Badge>
              <Badge variant="secondary">24/7 Available</Badge>
              <Badge variant="secondary">Transparent Pricing</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Our Services</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Contact Us</h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <Badge variant="destructive" className="mb-2">24/7 Emergency</Badge>
                <p className="font-bold text-lg text-red-700">9999917016</p>
                <p className="text-xs text-red-600">Available round the clock</p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Email:</span><br/>
                  ncrhomecareservice@gmail.com
                </p>
                <p>
                  <span className="font-medium">Location:</span><br/>
                  Vashisht, Faridabad, Haryana
                </p>
                <p>
                  <span className="font-medium">Response Time:</span><br/>
                  Within 2 hours
                </p>
              </div>
              
              <Button className="w-full mt-4" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              <p>&copy; 2024 NCR Home Care Service. All rights reserved.</p>
              <p className="mt-1">Serving Faridabad with professional healthcare services.</p>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
              <span>•</span>
              <span>Platform Fee: 25%</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}