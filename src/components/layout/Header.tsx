'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Providers', href: '/providers' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">NCR</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">NCR Home Care</h1>
              <p className="text-xs text-gray-600 -mt-1">Professional Healthcare</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Emergency Contact */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <Badge variant="destructive" className="mb-1">24/7 Emergency</Badge>
              <p className="text-sm font-bold text-gray-900">9999917016</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            <Badge variant="destructive" className="text-xs">Emergency: 9999917016</Badge>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg">NCR Home Care</h3>
                    <p className="text-sm text-gray-600">Professional Healthcare Services</p>
                  </div>
                  
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="border-t pt-4 space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <Badge variant="destructive" className="mb-2">24/7 Emergency</Badge>
                      <p className="font-bold text-lg">9999917016</p>
                      <p className="text-xs text-gray-600">Available round the clock</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/auth/login">Login</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/auth/register">Register</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}