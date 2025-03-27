import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, StarOff, Globe, ArrowRight, Copy, Check, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface GeneratedNamesProps {
  names: string[];
  className?: string;
}

const GeneratedNames: React.FC<GeneratedNamesProps> = ({ 
  names, 
  className 
}) => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const toggleFavorite = (name: string) => {
    setFavorites(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    
    toast({
      title: "Copied to clipboard",
      description: `"${name}" has been copied to your clipboard.`,
    });
    
    setTimeout(() => {
      setCopiedName(null);
    }, 2000);
  };

  if (!names.length) {
    return null;
  }

  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Your Business Name Ideas
              </h2>
              <p className="text-muted-foreground">
                We've generated {names.length} unique business names for you. Click on your favorites to save them.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs py-1 px-2 rounded-full bg-white dark:bg-gray-800">
                {Object.values(favorites).filter(Boolean).length} Favorites
              </Badge>
              <Button variant="outline" size="sm" className="rounded-full">
                Export Names
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {names.map((name, index) => (
              <Card 
                key={`${name}-${index}`} 
                className={cn(
                  "overflow-hidden transition-all duration-300 card-hover animate-fade-in", 
                  favorites[name] && "ring-2 ring-primary/20 bg-primary/5"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Globe size={18} className="text-primary" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-full", 
                        favorites[name] ? "text-red-500" : "text-gray-400"
                      )}
                      onClick={() => toggleFavorite(name)}
                    >
                      {favorites[name] ? <Heart fill="currentColor" size={18} /> : <Heart size={18} />}
                    </Button>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-1">{name}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs rounded-full">
                      Strong Brand
                    </Badge>
                    <Badge variant="secondary" className="text-xs rounded-full">
                      Memorable
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full text-xs h-8 gap-1"
                      onClick={() => copyToClipboard(name)}
                    >
                      {copiedName === name ? (
                        <>
                          <Check size={14} /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full text-xs h-8 gap-1"
                    >
                      <Globe size={14} /> Check Domain
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button className="rounded-full">
              Generate More Names <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratedNames;
