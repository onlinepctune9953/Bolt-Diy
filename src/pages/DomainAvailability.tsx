import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Check, X, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DomainAvailability = () => {
  const { toast } = useToast();
  const [domain, setDomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{tld: string, available: boolean}[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain) {
      toast({
        title: "Domain name required",
        description: "Please enter a domain name to check availability.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsChecking(true);
      
      // In a real application, this would call an API to check actual domain availability
      // For this demo, we'll simulate an API call with random results
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const tlds = ['.com', '.net', '.org', '.io', '.co', '.app', '.store', '.shop'];
      const mockResults = tlds.map(tld => ({
        tld,
        available: Math.random() > 0.5
      }));
      
      setResults(mockResults);
      
      const availableCount = mockResults.filter(r => r.available).length;
      
      if (availableCount > 0) {
        toast({
          title: "Domain check complete",
          description: `We found ${availableCount} available domain options for "${domain}".`,
        });
      } else {
        toast({
          title: "No domains available",
          description: `Unfortunately, "${domain}" is not available with common TLDs.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error checking domain:', error);
      toast({
        title: "Check failed",
        description: "There was an error checking domain availability. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Globe size={14} className="mr-1" />
              <span>Domain Checker</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Domain Availability Checker
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Instantly check if the matching domain is available for your business name to secure your online presence.
              Find the perfect domain that matches your brand identity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Multiple TLDs</h3>
                <p className="text-sm text-muted-foreground">Check availability across popular domain extensions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Instant Results</h3>
                <p className="text-sm text-muted-foreground">Get domain availability information in seconds</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Alternative Suggestions</h3>
                <p className="text-sm text-muted-foreground">Get similar domain suggestions if your first choice is taken</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto glass-card rounded-2xl p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-6">Check Domain Availability</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="domain" className="text-sm font-medium">Domain Name</label>
                <p className="text-xs text-muted-foreground">Enter your desired domain name without extensions</p>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Globe size={16} />
                  </div>
                  <Input
                    id="domain"
                    placeholder="yourbusinessname"
                    className="pl-10"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-full py-6"
                disabled={isChecking}
              >
                {isChecking ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Checking Availability...
                  </>
                ) : (
                  <>
                    <Globe size={20} className="mr-2" />
                    Check Domain Availability
                  </>
                )}
              </Button>
            </form>
          </div>

          {results.length > 0 && (
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-center mb-6">Domain Availability Results</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="grid grid-cols-3 bg-muted/50 p-4 font-medium">
                  <div>Domain</div>
                  <div>Status</div>
                  <div>Action</div>
                </div>
                <div className="divide-y">
                  {results.map((result, index) => (
                    <div key={index} className="grid grid-cols-3 p-4 items-center">
                      <div className="font-medium">{domain}{result.tld}</div>
                      <div>
                        {result.available ? (
                          <span className="inline-flex items-center text-green-600">
                            <Check size={16} className="mr-1" /> Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-red-500">
                            <X size={16} className="mr-1" /> Taken
                          </span>
                        )}
                      </div>
                      <div>
                        {result.available && (
                          <Button size="sm" variant="outline">
                            Register
                          </Button>
                        )}
                        {!result.available && (
                          <Button size="sm" variant="outline" disabled>
                            Unavailable
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center mt-6">
                <a href="/social-media-check" className="text-primary font-medium inline-flex items-center">
                  Check Social Media Availability <ArrowRight size={14} className="ml-1" />
                </a>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Why Domain Names Matter</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Brand Credibility</h3>
                <p className="text-muted-foreground mb-4">
                  A professional domain name builds trust and credibility for your brand. It's the foundation of your online presence
                  and often the first impression customers have of your business.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Establishes professional image</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Creates memorability for customers</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">SEO & Marketing</h3>
                <p className="text-muted-foreground mb-4">
                  Your domain name is crucial for search engine optimization and digital marketing. 
                  It can include keywords relevant to your business and help customers find you online.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Improves searchability and discoverability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Creates cohesive marketing campaigns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DomainAvailability;
