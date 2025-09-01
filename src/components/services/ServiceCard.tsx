import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
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

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
              {service.name}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="outline" 
                className={categoryColors[service.category]}
              >
                {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
              </Badge>
              <Badge 
                variant="secondary"
                className={availabilityColors[service.availability]}
              >
                {service.availability}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {service.shortDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pricing */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-lg text-gray-900">
              {service.priceRange}
            </span>
            {service.duration && (
              <span className="text-sm text-gray-600">
                {service.duration}
              </span>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-900">Key Features:</h4>
          <div className="grid grid-cols-1 gap-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center text-xs text-gray-600">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                {feature}
              </div>
            ))}
            {service.features.length > 3 && (
              <div className="text-xs text-blue-600 font-medium">
                +{service.features.length - 3} more features
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1">
            <Link href={`/booking?service=${service.id}`}>
              Book Now
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href={`/services/${service.id}`}>
              Learn More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}