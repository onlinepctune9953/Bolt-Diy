import React from 'react';
import { Star } from 'lucide-react';

const SocialProofBar = () => {
  return (
    <section className="py-8 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center md:justify-between">
          {/* Trusted By Logos */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 md:gap-8">
            <p className="text-sm font-medium text-muted-foreground w-full md:w-auto text-center md:text-left">Featured in:</p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <img 
                src="https://api.dicebear.com/7.x/initials/svg?seed=Forbes&backgroundColor=0891b2&fontFamily=Arial&fontSize=36" 
                alt="Trusted by Forbes" 
                className="h-6 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
              <img 
                src="https://api.dicebear.com/7.x/initials/svg?seed=TC&backgroundColor=f97316&fontFamily=Arial&fontSize=36" 
                alt="Trusted by TechCrunch" 
                className="h-6 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
              <img 
                src="https://api.dicebear.com/7.x/initials/svg?seed=Shopify&backgroundColor=6366f1&fontFamily=Arial&fontSize=36" 
                alt="Trusted by Shopify" 
                className="h-6 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
              <img 
                src="https://api.dicebear.com/7.x/initials/svg?seed=INC&backgroundColor=a855f7&fontFamily=Arial&fontSize=36" 
                alt="Trusted by Inc" 
                className="h-6 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8 items-center">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900 dark:text-white">16,000+</span>
              <span className="text-sm text-muted-foreground">Satisfied Customers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900 dark:text-white">4.9/5</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-sm text-muted-foreground">Ratings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
