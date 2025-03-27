import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import InputWithLabel from '@/components/ui/InputWithLabel';
import { Tag, Briefcase, Sparkles, Check, Loader2, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Industry options - same as in other components
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

// Tagline style options
const TAGLINE_STYLES = [
  { value: 'descriptive', label: 'Descriptive & Informative' },
  { value: 'emotional', label: 'Emotional & Inspiring' },
  { value: 'benefit', label: 'Benefit-Focused' },
  { value: 'playful', label: 'Playful & Humorous' },
  { value: 'challenging', label: 'Challenging & Provocative' },
  { value: 'question', label: 'Question-Based' },
  { value: 'simple', label: 'Simple & Direct' }
];

// Mock taglines for demonstration
const mockTaglines = [
  { tagline: "Innovation at Your Fingertips", style: "Benefit-Focused" },
  { tagline: "Reimagine What's Possible", style: "Emotional & Inspiring" },
  { tagline: "Technology That Works for You", style: "Descriptive & Informative" },
  { tagline: "The Future, Delivered Today", style: "Benefit-Focused" },
  { tagline: "Think Different. Work Smarter.", style: "Challenging & Provocative" },
  { tagline: "Where Ideas Become Reality", style: "Emotional & Inspiring" },
  { tagline: "Your Success, Our Mission", style: "Simple & Direct" },
  { tagline: "Ready to Transform Your Business?", style: "Question-Based" },
];

const TaglineGenerator = () => {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [industry, setIndustry] = useState('');
  const [taglineStyle, setTaglineStyle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [taglines, setTaglines] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessName || !businessType || !industry) {
      toast({
        title: "Information required",
        description: "Please enter your business name, type, and industry.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGenerating(true);
      
      // In a real application, this would call an API to generate actual taglines
      // For this demo, we'll simulate an API call with mock results
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly select 6-8 taglines from the mock list
      const numTaglines = Math.floor(Math.random() * 3) + 6; // 6-8 taglines
      const shuffled = [...mockTaglines].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, numTaglines);
      
      setTaglines(selected);
      
      toast({
        title: "Taglines generated!",
        description: `We've created ${selected.length} tagline ideas for ${businessName}.`,
      });
    } catch (error) {
      console.error('Error generating taglines:', error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your taglines. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyTagline = (tagline: string) => {
    navigator.clipboard.writeText(tagline);
    toast({
      title: "Tagline copied",
      description: "The tagline has been copied to your clipboard.",
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Tag size={14} className="mr-1" />
              <span>Tagline Generator</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Tagline Generator
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get matching tagline suggestions to complement your business name and strengthen your brand.
              Create a memorable slogan that communicates your value proposition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Brand-Aligned</h3>
                <p className="text-sm text-muted-foreground">Taglines that complement your business name</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Multiple Styles</h3>
                <p className="text-sm text-muted-foreground">Choose from various tagline approaches</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Memorable Impact</h3>
                <p className="text-sm text-muted-foreground">Catchy phrases that stick in customers' minds</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto glass-card rounded-2xl p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-6">Generate Your Tagline</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputWithLabel
                label="Business Name"
                description="Your chosen business name"
                placeholder="e.g., TechNova Solutions"
                icon={<Sparkles size={16} />}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
              
              <InputWithLabel
                label="Business Type"
                description="Describe your business in a few words"
                placeholder="e.g., Web Development Agency"
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
                <label className="text-sm font-medium">Tagline Style</label>
                <p className="text-xs text-muted-foreground">Choose your preferred tagline style</p>
                <Select value={taglineStyle} onValueChange={setTaglineStyle}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a style (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {TAGLINE_STYLES.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <InputWithLabel
                label="Keywords"
                description="Key terms to include (comma separated, optional)"
                placeholder="e.g., innovative, reliable, fast"
                icon={<Tag size={16} />}
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
                    Generating Taglines...
                  </>
                ) : (
                  <>
                    <Tag size={20} className="mr-2" />
                    Generate Taglines
                  </>
                )}
              </Button>
            </form>
          </div>

          {taglines.length > 0 && (
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-center mb-8">Your Tagline Suggestions</h2>
              <div className="grid gap-4">
                {taglines.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-semibold mb-2">{item.tagline}</p>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                          {item.style}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleCopyTagline(item.tagline)}
                      >
                        <Copy size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">What Makes a Great Tagline?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Effective Tagline Principles</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Keep It Simple</h4>
                      <p className="text-sm text-muted-foreground">
                        The best taglines are short, simple, and easy to remember. Aim for 3-7 words when possible.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Highlight Benefits</h4>
                      <p className="text-sm text-muted-foreground">
                        Focus on what your business does for customers, not just what you do.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Be Distinctive</h4>
                      <p className="text-sm text-muted-foreground">
                        Your tagline should differentiate you from competitors and reinforce your unique value.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Examples of Great Taglines</h3>
                <ul className="space-y-3">
                  <li className="space-y-1">
                    <p className="font-medium">Nike: "Just Do It"</p>
                    <p className="text-sm text-muted-foreground">
                      Simple, memorable, and empowering.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <p className="font-medium">Apple: "Think Different"</p>
                    <p className="text-sm text-muted-foreground">
                      Captures the brand's innovative philosophy in two words.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <p className="font-medium">Airbnb: "Belong Anywhere"</p>
                    <p className="text-sm text-muted-foreground">
                      Communicates the emotional benefit of their service.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <p className="font-medium">MasterCard: "There are some things money can't buy. For everything else, there's MasterCard."</p>
                    <p className="text-sm text-muted-foreground">
                      Longer but effectively communicates value beyond transactions.
                    </p>
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

export default TaglineGenerator;
