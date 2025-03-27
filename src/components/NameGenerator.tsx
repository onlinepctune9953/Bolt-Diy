import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputWithLabel from '@/components/ui/InputWithLabel';
import { Sparkles, Loader2, MapPin, Briefcase, PenTool } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { generateBusinessNames } from '@/lib/nameGenerator';

// Industry options
const INDUSTRIES = [
  { value: 'restaurant', label: 'Restaurant & Food' },
  { value: 'technology', label: 'Technology & Software' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'beauty', label: 'Beauty & Cosmetics' },
  { value: 'fitness', label: 'Fitness & Sports' },
  { value: 'education', label: 'Education & Learning' },
  { value: 'construction', label: 'Construction & Home Services' },
  { value: 'finance', label: 'Finance & Accounting' },
  { value: 'legal', label: 'Legal Services' },
  { value: 'art', label: 'Art & Creative Services' },
  { value: 'pets', label: 'Pet Services' },
  { value: 'other', label: 'Other' }
];

// Name style options
const NAME_STYLES = [
  { value: 'modern', label: 'Modern & Clean' },
  { value: 'classic', label: 'Classic & Traditional' },
  { value: 'creative', label: 'Creative & Unique' },
  { value: 'luxury', label: 'Luxury & Premium' },
  { value: 'friendly', label: 'Friendly & Approachable' },
  { value: 'techy', label: 'Technical & Innovative' },
  { value: 'professional', label: 'Professional & Reliable' }
];

interface NameGeneratorProps {
  onNamesGenerated: (names: string[]) => void;
  className?: string;
}

const NameGenerator: React.FC<NameGeneratorProps> = ({ 
  onNamesGenerated,
  className
}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [businessType, setBusinessType] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [nameStyle, setNameStyle] = useState('');
  const [keywords, setKeywords] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessType) {
      toast({
        title: "Business type required",
        description: "Please describe your business to generate names.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGenerating(true);
      const names = await generateBusinessNames({
        businessType,
        industry,
        location,
        nameStyle,
        keywords
      });
      
      onNamesGenerated(names);
      
      toast({
        title: "Names generated!",
        description: `We've created ${names.length} unique business name ideas for you.`,
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
    <section 
      id="generator" 
      className={cn(
        "py-16 relative overflow-hidden", 
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
            <Sparkles size={14} className="mr-1" />
            <span>AI-Powered Business Name Generator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Generate Your Perfect Business Name
          </h2>
          <p className="text-lg text-muted-foreground">
            Tell us about your business and let our advanced AI create unique, memorable names tailored to your needs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="glass-card rounded-2xl p-6 md:p-8 animate-on-scroll"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <InputWithLabel
                label="Business Type"
                description="Describe your business in a few words"
                placeholder="e.g., Coffee Shop, Web Design Agency"
                icon={<Briefcase size={16} />}
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                wrapperClassName="sm:col-span-2"
                required
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((ind) => (
                      <SelectItem key={ind.value} value={ind.value}>
                        {ind.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <InputWithLabel
                label="Location"
                description="City, state, or country (optional)"
                placeholder="e.g., San Francisco, CA"
                icon={<MapPin size={16} />}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Name Style</label>
                <Select value={nameStyle} onValueChange={setNameStyle}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {NAME_STYLES.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <InputWithLabel
                label="Keywords"
                description="Words to include (comma separated, optional)"
                placeholder="e.g., eco, green, sustainable"
                icon={<PenTool size={16} />}
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                wrapperClassName="sm:col-span-2"
              />
            </div>

            <div className="mt-8">
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
                    <Sparkles size={20} className="mr-2" />
                    Generate Business Names
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NameGenerator;
