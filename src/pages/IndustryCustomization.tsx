import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputWithLabel from '@/components/ui/InputWithLabel';
import { Briefcase, PenTool, Check, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { generateBusinessNames } from '@/lib/nameGenerator';
import GeneratedNames from '@/components/GeneratedNames';

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

const IndustryCustomization = () => {
  const { toast } = useToast();
  const [businessType, setBusinessType] = useState('');
  const [industry, setIndustry] = useState('');
  const [nameStyle, setNameStyle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessType || !industry) {
      toast({
        title: "Information required",
        description: "Please enter your business type and select an industry.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGenerating(true);
      const names = await generateBusinessNames({
        businessType,
        industry,
        nameStyle,
        keywords
      });
      
      setGeneratedNames(names);
      
      toast({
        title: "Names generated!",
        description: `We've created ${names.length} industry-specific name ideas for you.`,
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
              <Briefcase size={14} className="mr-1" />
              <span>Industry Customization</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Industry-Tailored Business Names
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get names that match your specific industry with options for different styles and tones.
              Stand out in your sector with a name that speaks to your target audience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Industry Relevance</h3>
                <p className="text-sm text-muted-foreground">Names that resonate with your specific sector</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Style Flexibility</h3>
                <p className="text-sm text-muted-foreground">Choose from multiple naming styles and tones</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Keyword Integration</h3>
                <p className="text-sm text-muted-foreground">Incorporate important terms relevant to your business</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto glass-card rounded-2xl p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-6">Get Industry-Tailored Names</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputWithLabel
                label="Business Type"
                description="Describe your business in a few words"
                placeholder="e.g., Coffee Shop, Web Design Agency"
                icon={<Briefcase size={16} />}
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <p className="text-xs text-muted-foreground">Select your business industry</p>
                <Select value={industry} onValueChange={setIndustry} required>
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Name Style</label>
                <p className="text-xs text-muted-foreground">Choose your preferred naming style</p>
                <Select value={nameStyle} onValueChange={setNameStyle}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a style (optional)" />
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
                    <Sparkles size={20} className="mr-2" />
                    Generate Industry-Tailored Names
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
            <h2 className="text-2xl font-bold text-center mb-8">Industry-Specific Naming Insights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Why Industry Matters</h3>
                <p className="text-muted-foreground mb-4">
                  Different industries have unique naming conventions, terminology, and customer expectations. 
                  A name that works well for a tech startup might be inappropriate for a luxury spa.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Industry-specific terminology integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Competitor differentiation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Customer expectation alignment</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Style & Tone</h3>
                <p className="text-muted-foreground mb-4">
                  The style of your business name sets expectations about your brand personality and values.
                  Choose a style that reflects how you want customers to perceive your business.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Brand personality alignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Target audience resonance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">Value proposition communication</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <a href="/save-compare" className="text-primary font-medium inline-flex items-center">
                    Save & Compare Names <ArrowRight size={14} className="ml-1" />
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

export default IndustryCustomization;
