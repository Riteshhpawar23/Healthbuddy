import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Stethoscope, Phone, MapPin, Star } from 'lucide-react';

const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Dr, Suite 200, New York, NY 10001",
    rating: 4.8,
    experience: "15 years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    phone: "+1 (555) 234-5678",
    address: "456 Children's Hospital Blvd, Boston, MA 02101",
    rating: 4.9,
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    phone: "+1 (555) 345-6789",
    address: "789 Skin Care Center, Los Angeles, CA 90210",
    rating: 4.7,
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1594824694996-8a63f7b4b0de?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Orthopedist",
    phone: "+1 (555) 456-7890",
    address: "321 Bone & Joint Clinic, Chicago, IL 60601",
    rating: 4.6,
    experience: "18 years",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Neurologist",
    phone: "+1 (555) 567-8901",
    address: "654 Brain Health Institute, Miami, FL 33101",
    rating: 4.9,
    experience: "20 years",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Dr. Robert Wilson",
    specialty: "General Practitioner",
    phone: "+1 (555) 678-9012",
    address: "987 Family Medicine Center, Seattle, WA 98101",
    rating: 4.5,
    experience: "25 years",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face"
  }
];

const DoctorConsultation = () => {
  const handleBookAppointment = (doctorName: string) => {
    alert(`Booking appointment with ${doctorName}`);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Stethoscope className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-foreground">Doctor Consultation</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Find and connect with qualified healthcare professionals in your area
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsData.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold">{doctor.name}</CardTitle>
                    <p className="text-primary font-medium">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground ml-1">
                        {doctor.rating} • {doctor.experience}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-foreground">Phone</p>
                      <p className="text-sm text-muted-foreground">{doctor.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-foreground">Address</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {doctor.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleBookAppointment(doctor.name)}
                  >
                    Book Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleCall(doctor.phone)}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation;
