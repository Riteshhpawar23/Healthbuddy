import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Heart, Shield, Lightbulb, Users, Mail, MessageCircle, Award, Star, Linkedin, Instagram, Github, ExternalLink } from 'lucide-react';

const teamMembers = [
  {
    name: "Ritesh Pawar",
    role: "Founder & Lead Developer",
    bio: "Ritesh combines his passion for technology with a deep commitment to mental health accessibility. He believes that innovative digital solutions can break down barriers and make wellness support available to everyone.",
    image: "👨‍💻",
    specialty: "Digital Wellness Solutions",
    socials: {
      linkedin: "https://www.linkedin.com/in/riteshhpawar23",
      instagram: "https://www.instagram.com/riteshhpawar23/?hl=en",
      github: "https://github.com/Riteshhpawar23"
    }
  },
  {
    name: "Dashrath Parekar",
    role: "Co-Founder & Wellness Strategist",
    bio: "Dashrath brings expertise in creating user-centered experiences that promote mental wellbeing. His focus is on designing intuitive, compassionate digital environments where healing can flourish.",
    image: "🎯",
    specialty: "User Experience & Strategy",
    socials: {
      linkedin: "https://www.linkedin.com/in/dashrath-parekar-7863a1266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/dashrath.parekar?utm_source=qr&igsh=MTJqZ2NvajJ0b3poYw==",
      github: "https://github.com/ErDashrath"
    }
  }
];

const coreValues = [
  {
    icon: <Heart className="w-8 h-8 text-pink-500" />,
    title: "Empathy First",
    description: "Every interaction is rooted in genuine understanding and compassion for your unique journey."
  },
  {
    icon: <Award className="w-8 h-8 text-blue-500" />,
    title: "Science-Backed Care",
    description: "Our approaches are grounded in research and evidence-based practices that actually work."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Creative Healing",
    description: "We believe in the power of art, music, writing, and movement to unlock emotional wellness."
  },
  {
    icon: <Shield className="w-8 h-8 text-green-500" />,
    title: "Privacy & Safety",
    description: "Your trust is sacred. We maintain the highest standards of confidentiality and emotional safety."
  },
  {
    icon: <Users className="w-8 h-8 text-purple-500" />,
    title: "Stigma-Free Zone",
    description: "Mental health is health. Period. No judgment, no shame, just support and understanding."
  }
];

export default function Team() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-background via-background/95 to-muted p-6">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        {/* Header & Mission */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            About Our Team
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to make mental health care accessible, creative, and completely stigma-free. 
              Because everyone deserves to feel heard, understood, and supported on their wellness journey.
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Meet Our Wellness Warriors
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-gray-900/60 border-border/30 hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-6xl">{member.image}</div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Social Media Links */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 px-3 py-1 h-8 text-xs hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                      onClick={() => window.open(member.socials.linkedin, '_blank')}
                    >
                      <Linkedin className="w-3 h-3" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 px-3 py-1 h-8 text-xs hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300"
                      onClick={() => window.open(member.socials.instagram, '_blank')}
                    >
                      <Instagram className="w-3 h-3" />
                      Instagram
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 px-3 py-1 h-8 text-xs hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300"
                      onClick={() => window.open(member.socials.github, '_blank')}
                    >
                      <Github className="w-3 h-3" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Our Core Values
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-gray-900/60 border-border/30 hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Ready to Start Your Wellness Journey?
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We're here to support you every step of the way. Whether you need someone to talk to, 
                creative tools to express yourself, or just a safe space to breathe—we've got you covered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 px-8">
                <Heart className="w-5 h-5 mr-2" />
                Join Our Community
              </Button>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <p className="text-sm text-muted-foreground">
                💙 Remember: Taking the first step takes courage, and we're incredibly proud of you for being here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
