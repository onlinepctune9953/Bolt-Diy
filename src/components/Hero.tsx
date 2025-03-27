import React, { useEffect, useRef } from 'react';
import { ArrowRight, Check, Globe, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerRef.current?.unobserve(entry.target);
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
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl animate-on-scroll">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6">
              <Star size={14} className="mr-1" />
              <span>AI-Powered Business Name Generator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Find Your Perfect Business Name in Seconds
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Generate creative, memorable, and domain-available business names tailored to your industry and location with our advanced AI technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="rounded-full px-8 py-6 text-base">
                Generate Names <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base">
                See Examples
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check size={18} className="text-primary" />
                <span>Domain Availability Check</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check size={18} className="text-primary" />
                <span>Location-Optimized Names</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check size={18} className="text-primary" />
                <span>Industry-Specific Ideas</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Floating Card */}
          <div className="flex-1 w-full max-w-md animate-on-scroll">
            <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden card-hover animate-float">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Recently Generated</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Globe size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">GlowSpa Oasis</h4>
                      <p className="text-xs text-gray-500">Beauty Salon • Los Angeles</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Globe size={16} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Urban Byte Cafe</h4>
                      <p className="text-xs text-gray-500">Coffee Shop • New York</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Globe size={16} className="text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Precision Mechanics</h4>
                      <p className="text-xs text-gray-500">Auto Repair • Chicago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="ghost" size="sm" className="text-primary text-sm">
                  See more examples
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
