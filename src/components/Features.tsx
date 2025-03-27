import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { 
  Globe, 
  Search, 
  MapPin, 
  CheckCircle, 
  Briefcase, 
  Heart, 
  Save, 
  Sparkles, 
  Tag,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <Sparkles size={24} className="text-blue-500" />,
    title: "AI-Generated Names",
    description: "Our advanced AI creates unique, creative, and SEO-friendly business names tailored to your industry.",
    link: "/name-generator"
  },
  {
    icon: <MapPin size={24} className="text-green-500" />,
    title: "Location Optimization",
    description: "Get name suggestions optimized for your specific city, state, or country to connect with local customers.",
    link: "/location-optimization"
  },
  {
    icon: <Globe size={24} className="text-purple-500" />,
    title: "Domain Availability",
    description: "Instantly check if the matching domain is available for your business name to secure your online presence.",
    link: "/domain-availability"
  },
  {
    icon: <CheckCircle size={24} className="text-amber-500" />,
    title: "Social Media Check",
    description: "Ensure your brand name is available across major social media platforms for consistent branding.",
    link: "/social-media-check"
  },
  {
    icon: <Briefcase size={24} className="text-red-500" />,
    title: "Industry Customization",
    description: "Get names that match your specific industry with options for different styles and tones.",
    link: "/industry-customization"
  },
  {
    icon: <Heart size={24} className="text-pink-500" />,
    title: "Save & Compare",
    description: "Save your favorite name ideas and easily compare them to find the perfect match for your business.",
    link: "/save-compare"
  },
  {
    icon: <Search size={24} className="text-indigo-500" />,
    title: "Competitor Analysis",
    description: "Our AI suggests names that help you stand out from competitors in your local area.",
    link: "/competitor-analysis"
  },
  {
    icon: <Tag size={24} className="text-teal-500" />,
    title: "Tagline Generator",
    description: "Get matching tagline suggestions to complement your business name and strengthen your brand.",
    link: "/tagline-generator"
  }
];

const Features = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
            <CheckCircle size={14} className="mr-1" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything You Need to Name Your Business
          </h2>
          <p className="text-lg text-muted-foreground">
            Our powerful AI-driven tools help you create, validate, and secure the perfect name for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={cn(
                "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-6 rounded-2xl card-hover animate-on-scroll", 
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button variant="ghost" size="sm" className="text-primary p-0 h-auto" asChild>
                <a href={feature.link} className="inline-flex items-center">
                  Explore <ArrowRight size={14} className="ml-1" />
                </a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
