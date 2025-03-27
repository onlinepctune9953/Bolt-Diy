import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import InputWithLabel from '@/components/ui/InputWithLabel';
import { Search, MapPin, Briefcase, Check, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

// Mock competitor analysis results
const mockCompetitors = [
  { 
    name: "Urban Espresso", 
    location: "Seattle, WA",
    nameStyle: "Modern & Clean",
    uniqueElements: ["Urban", "City-focused", "Contemporary"],
    strengthScore: 85
  },
  { 
    name: "Seattle Coffee Works", 
    location: "Seattle, WA",
    nameStyle: "Classic & Traditional",
    uniqueElements: ["Location-based", "Craft-focused", "Traditional"],
    strengthScore: 78
  },
  { 
    name: "Bean There Cafe", 
    location: "Seattle, WA",
    nameStyle: "Creative & Unique",
    uniqueElements: ["Playful pun", "Approachable", "Memorable"],
    strengthScore: 82
  }
];

const mockSuggestions = [
  "Pacific Brew Co.",
  "Emerald City Coffee",
  "Rain City Roasters",
  "Northwest Bean",
  "Evergreen Espresso",
  "Sound Coffee Collective"
];

const CompetitorAnalysis = () => {
  const { toast } = useToast();
  const [businessType, setBusinessType] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessType || !industry || !location) {
      toast({
        title: "Information required",
        description: "Please enter your business type, industry, and location.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      
      // In a real application, this would call an API to analyze local competitors
      // For this demo, we'll simulate an API call with mock results
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCompetitors(mockCompetitors);
      setSuggestions(mockSuggestions);
      
      toast({
        title: "Analysis complete",
        description: `We analyzed competitors in ${location} and generated name suggestions that help you stand out.`,
      });
    } catch (error) {
      console.error('Error analyzing competitors:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing competitors. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Search size={14} className="mr-1" />
              <span>Competitor Analysis</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Competitor Analysis & Differentiation
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI suggests names that help you stand out from competitors in your local area.
              Create a unique identity that differentiates your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Local Competitor Analysis</h3>
                <p className="text-sm text-muted-foreground">See what naming patterns exist in your area</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Differentiation Strategy</h3>
                <p className="text-sm text-muted-foreground">Get names that stand out from local competitors</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Strength Analysis</h3>
                <p className="text-sm text-muted-foreground">Evaluate competitor name effectiveness</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto glass-card rounded-2xl p-6 md:p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-6">Analyze Local Competitors</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputWithLabel
                label="Business Type"
                description="Describe your business in a few words"
                placeholder="e.g., Coffee Shop, Yoga Studio"
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

              <InputWithLabel
                label="Location"
                description="City, state, or region for competitor analysis"
                placeholder="e.g., Seattle, WA"
                icon={<MapPin size={16} />}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              
              <Button 
                type="submit" 
                className="w-full rounded-full py-6"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Analyzing Competitors...
                  </>
                ) : (
                  <>
                    <Search size={20} className="mr-2" />
                    Analyze Competitors & Get Suggestions
                  </>
                )}
              </Button>
            </form>
          </div>

          {competitors.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-center mb-8">Competitor Analysis Results</h2>
              
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Local Competitor Names</h3>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="grid grid-cols-12 bg-muted/50 p-4 font-medium">
                    <div className="col-span-4">Business Name</div>
                    <div className="col-span-2">Location</div>
                    <div className="col-span-3">Name Style</div>
                    <div className="col-span-3">Strength Score</div>
                  </div>
                  <div className="divide-y">
                    {competitors.map((competitor, index) => (
                      <div key={index} className="grid grid-cols-12 p-4 items-center">
                        <div className="col-span-4 font-medium">{competitor.name}</div>
                        <div className="col-span-2 text-sm text-muted-foreground">{competitor.location}</div>
                        <div className="col-span-3 text-sm text-muted-foreground">{competitor.nameStyle}</div>
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${competitor.strengthScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{competitor.strengthScore}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Common Patterns & Elements</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {competitors.map((competitor, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium mb-2">{competitor.name}</h4>
                      <div className="space-y-2">
                        {competitor.uniqueElements.map((element, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-sm text-muted-foreground">{element}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Differentiated Name Suggestions</h3>
                <p className="text-muted-foreground mb-6">
                  Based on our analysis, here are name suggestions that will help your {businessType} stand out from 
                  competitors in {location}:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center">
                      <span className="font-medium">{suggestion}</span>
                      <Button variant="outline" size="sm">Save</Button>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <a href="/tagline-generator" className="text-primary font-medium inline-flex items-center">
                    Generate Matching Taglines <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Why Differentiation Matters</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Stand Out From The Crowd</h3>
              <p className="text-muted-foreground mb-6">
                In competitive markets, a distinctive business name is crucial for success. Our AI analyzes your local 
                competitors and identifies patterns to help you create a name that stands apart while still resonating 
                with your target audience.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <Check size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Avoid Confusion</h4>
                      <p className="text-sm text-muted-foreground">
                        Prevent customer confusion with similar-sounding local businesses
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <Check size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Legal Protection</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduce risk of trademark issues with local competitors
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <Check size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Competitive Advantage</h4>
                      <p className="text-sm text-muted-foreground">
                        Create a name that highlights your unique value proposition
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <Check size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Memorability</h4>
                      <p className="text-sm text-muted-foreground">
                        Develop a name that customers will remember in a crowded market
                      </p>
                    </div>
                  </div>
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

export default CompetitorAnalysis;
