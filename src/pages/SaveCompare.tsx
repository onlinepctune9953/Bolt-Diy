import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Save, Trash, Check, Star, Globe, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample saved names for demo purposes
const sampleNames = [
  { id: 1, name: 'UrbanByte', industry: 'Technology', rating: 4 },
  { id: 2, name: 'Zenith Wellness', industry: 'Health', rating: 5 },
  { id: 3, name: 'PrimeCraft', industry: 'Construction', rating: 3 },
  { id: 4, name: 'Glow Beauty', industry: 'Beauty', rating: 4 },
  { id: 5, name: 'EduSpark', industry: 'Education', rating: 5 },
];

const SaveCompare = () => {
  const { toast } = useToast();
  const [savedNames, setSavedNames] = useState<any[]>([]);
  const [selectedNames, setSelectedNames] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading saved names from storage
  useEffect(() => {
    const loadSavedNames = async () => {
      // In a real app, this would fetch from localStorage, database, etc.
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSavedNames(sampleNames);
      setLoading(false);
    };
    
    loadSavedNames();
  }, []);

  const handleToggleSelect = (id: number) => {
    setSelectedNames(prev => 
      prev.includes(id) 
        ? prev.filter(nameId => nameId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = (id: number) => {
    setSavedNames(prev => prev.filter(name => name.id !== id));
    setSelectedNames(prev => prev.filter(nameId => nameId !== id));
    
    toast({
      title: "Name deleted",
      description: "The name has been removed from your saved list.",
    });
  };

  const handleClearAll = () => {
    setSavedNames([]);
    setSelectedNames([]);
    
    toast({
      title: "All names cleared",
      description: "All saved names have been removed from your list.",
    });
  };

  const handleRate = (id: number, rating: number) => {
    setSavedNames(prev => 
      prev.map(name => 
        name.id === id ? { ...name, rating } : name
      )
    );
    
    toast({
      title: "Rating updated",
      description: "Your rating has been saved.",
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Heart size={14} className="mr-1" />
              <span>Saved Names</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Save & Compare Names
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Save your favorite name ideas and easily compare them to find the perfect match for your business.
              Keep track of options and make an informed decision.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Saved Names</h2>
              <div className="flex gap-2">
                {selectedNames.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => setSelectedNames([])}>
                    Deselect All
                  </Button>
                )}
                {savedNames.length > 0 && (
                  <Button variant="destructive" size="sm" onClick={handleClearAll}>
                    <Trash size={16} className="mr-1" /> Clear All
                  </Button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your saved names...</p>
              </div>
            ) : savedNames.length === 0 ? (
              <div className="text-center py-12 border border-dashed rounded-lg">
                <Save size={40} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Saved Names Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't saved any business names yet. Generate names and save your favorites to compare them here.
                </p>
                <Button asChild>
                  <a href="/name-generator">
                    Generate Names Now
                  </a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Selected names comparison */}
                {selectedNames.length > 1 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4">Comparing {selectedNames.length} Names</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedNames
                        .filter(name => selectedNames.includes(name.id))
                        .map(name => (
                          <div key={name.id} className="p-4 border rounded-lg">
                            <h4 className="text-xl font-bold mb-1">{name.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <span>{name.industry}</span>
                              <span>•</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star 
                                    key={star}
                                    size={14} 
                                    className={star <= name.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <a href="/domain-availability">
                                  <Globe size={14} className="mr-1" /> Check Domain
                                </a>
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <a href="/social-media-check">
                                  @ Check Social
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* All saved names */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="grid grid-cols-12 bg-muted/50 p-4 font-medium text-sm">
                    <div className="col-span-1">Compare</div>
                    <div className="col-span-4">Name</div>
                    <div className="col-span-2">Industry</div>
                    <div className="col-span-3">Rating</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  <div className="divide-y">
                    {savedNames.map(name => (
                      <div key={name.id} className="grid grid-cols-12 p-4 items-center">
                        <div className="col-span-1">
                          <input 
                            type="checkbox" 
                            checked={selectedNames.includes(name.id)} 
                            onChange={() => handleToggleSelect(name.id)}
                            className="h-4 w-4"
                          />
                        </div>
                        <div className="col-span-4 font-medium">{name.name}</div>
                        <div className="col-span-2 text-sm text-muted-foreground">{name.industry}</div>
                        <div className="col-span-3">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button 
                                key={star} 
                                onClick={() => handleRate(name.id, star)}
                                className="focus:outline-none"
                              >
                                <Star 
                                  size={16} 
                                  className={star <= name.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-2 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDelete(name.id)}
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">How to Choose the Right Business Name</h2>
            <div className="grid gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Evaluate Your Options</h3>
                <p className="text-muted-foreground mb-4">
                  When comparing business names, consider these key factors to help you make the best choice:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Memorability</h4>
                    <p className="text-sm text-muted-foreground">
                      Is the name easy to remember? Memorable names create stronger brand recall.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Pronunciation</h4>
                    <p className="text-sm text-muted-foreground">
                      Can people easily say and spell your name? This affects word-of-mouth marketing.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Domain Availability</h4>
                    <p className="text-sm text-muted-foreground">
                      Is the .com domain available? Consider alternative extensions if necessary.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Brand Potential</h4>
                    <p className="text-sm text-muted-foreground">
                      Does the name allow for brand growth and expansion into new markets?
                    </p>
                  </div>
                </div>
              </Card>

              <div className="text-center mt-8">
                <h3 className="text-xl font-semibold mb-4">Ready for the Final Touch?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Once you've narrowed down your favorite business name, complete your brand identity with a 
                  perfect tagline that captures your value proposition.
                </p>
                <Button asChild>
                  <a href="/tagline-generator">
                    Generate a Matching Tagline <ArrowRight size={16} className="ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SaveCompare;
