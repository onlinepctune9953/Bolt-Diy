import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InputWithLabel from '@/components/ui/InputWithLabel';
import { Button } from '@/components/ui/button';
import { MapPin, Check, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { generateBusinessNames } from '@/lib/nameGenerator';
import GeneratedNames from '@/components/GeneratedNames';

const LocationOptimization = () => {
  const { toast } = useToast();
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessType || !location) {
      toast({
        title: "Information required",
        description: "Please enter your business type and location.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGenerating(true);
      const names = await generateBusinessNames({
        businessType,
        location,
      });
      
      setGeneratedNames(names);
      
      toast({
        title: "Names generated!",
        description: `We've created ${names.length} location-optimized name ideas for you.`,
      });
    } catch (error) {
      console.error('Error generating names:', error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your business names. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <MapPin size={14} className="mr-1" />
              <span>Location Optimization</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Location-Optimized Business Names
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get name suggestions optimized for your specific city, state, or country to connect with local customers.
              Stand out in your local market with a name that resonates with your community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Local SEO Boost</h3>
                <p className="text-sm text-muted-foreground">Improve local search visibility with location-relevant names</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Community Connection</h3>
                <p className="text-sm text-muted-foreground">Create an instant bond with local customers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Regional Relevance</h3>
                <p className="text-sm text-muted-foreground">Names that respect local culture and terminology</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto glass-card rounded-2xl p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-6">Get Location-Optimized Names</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputWithLabel
                label="Business Type"
                description="Describe your business in a few words"
                placeholder="e.g., Coffee Shop, Boutique Store"
                icon={<Sparkles size={16} />}
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
              />
              
              <InputWithLabel
                label="Location"
                description="City, state, country, or region"
                placeholder="e.g., Chicago, IL or Paris, France"
                icon={<MapPin size={16} />}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              
              <Button 
                type="submit" 
                className="w-full rounded-full py-6"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Generating Names...
                  </>
                ) : (
                  <>
                    <MapPin size={20} className="mr-2" />
                    Generate Location-Optimized Names
                  </>
                )}
              </Button>
            </form>
          </div>

          {generatedNames.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <GeneratedNames names={generatedNames} />
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">How Location Optimization Works</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Local Market Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI analyzes the local market trends, popular naming conventions, and cultural factors 
                  specific to your location to generate names that will resonate with local customers.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Regional terminology integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Local landmarks and geographical features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Cultural sensitivities consideration</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Local SEO Enhancement</h3>
                <p className="text-muted-foreground mb-4">
                  Location-optimized names are designed to perform better in local search results, 
                  helping customers in your area find your business more easily.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Local search term optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Google My Business compatibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Regional directory optimization</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <a href="/domain-availability" className="text-primary font-medium inline-flex items-center">
                    Check Domain Availability <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LocationOptimization;
