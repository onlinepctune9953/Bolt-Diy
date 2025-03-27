import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Loader2, ArrowRight, Instagram, Twitter, Facebook, Youtube, Linkedin, TikTok } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SocialMediaCheck = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{platform: string, icon: React.ReactNode, available: boolean}[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      toast({
        title: "Username required",
        description: "Please enter a username to check availability.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsChecking(true);
      
      // In a real application, this would call an API to check actual username availability
      // For this demo, we'll simulate an API call with random results
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const platforms = [
        { name: 'Instagram', icon: <Instagram size={20} /> },
        { name: 'Twitter', icon: <Twitter size={20} /> },
        { name: 'Facebook', icon: <Facebook size={20} /> },
        { name: 'YouTube', icon: <Youtube size={20} /> },
        { name: 'LinkedIn', icon: <Linkedin size={20} /> },
        { name: 'TikTok', icon: <TikTok size={20} /> },
      ];
      
      const mockResults = platforms.map(platform => ({
        platform: platform.name,
        icon: platform.icon,
        available: Math.random() > 0.5
      }));
      
      setResults(mockResults);
      
      const availableCount = mockResults.filter(r => r.available).length;
      
      if (availableCount > 0) {
        toast({
          title: "Username check complete",
          description: `We found ${availableCount} available usernames for "${username}".`,
        });
      } else {
        toast({
          title: "No usernames available",
          description: `Unfortunately, "${username}" is not available on common social platforms.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error checking usernames:', error);
      toast({
        title: "Check failed",
        description: "There was an error checking username availability. Please try again.",
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
              <CheckCircle size={14} className="mr-1" />
              <span>Social Media Check</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Social Media Username Checker
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Ensure your brand name is available across major social media platforms for consistent branding.
              Secure your online presence before someone else does.
            </p>
          </div>

          <div className="max-w-xl mx-auto glass-card rounded-2xl p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-6">Check Social Media Availability</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Username</label>
                <p className="text-xs text-muted-foreground">Enter your desired username without the @ symbol</p>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    @
                  </div>
                  <Input
                    id="username"
                    placeholder="yourbrandname"
                    className="pl-8"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    <CheckCircle size={20} className="mr-2" />
                    Check Username Availability
                  </>
                )}
              </Button>
            </form>
          </div>

          {results.length > 0 && (
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-center mb-6">Social Media Availability Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                        {result.icon}
                      </div>
                      <div>
                        <div className="font-medium">{result.platform}</div>
                        <div className="text-sm text-muted-foreground">@{username}</div>
                      </div>
                    </div>
                    <div>
                      {result.available ? (
                        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Available</div>
                      ) : (
                        <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Taken</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <a href="/industry-customization" className="text-primary font-medium inline-flex items-center">
                  Try Industry Customization <ArrowRight size={14} className="ml-1" />
                </a>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Why Consistent Social Media Branding Matters</h2>
            <div className="grid gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Brand Recognition</h3>
                <p className="text-muted-foreground mb-4">
                  Consistent usernames across platforms make it easier for customers to find and recognize your brand. 
                  It creates a seamless experience as users move between different social networks.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Professional Image</h4>
                    <p className="text-sm text-muted-foreground">
                      Having consistent usernames across platforms creates a professional image and builds trust with your audience.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Cross-Platform Marketing</h4>
                    <p className="text-sm text-muted-foreground">
                      Consistent handles make it simpler to market your brand across multiple platforms and direct users to your other profiles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4">Secure Your Brand Identity</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Even if you don't plan to use all social platforms immediately, securing your username across all major networks 
                protects your brand from impersonation and ensures you have access when you need it.
              </p>
              <Button asChild>
                <a href="/save-compare">
                  Save & Compare Your Options <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SocialMediaCheck;
