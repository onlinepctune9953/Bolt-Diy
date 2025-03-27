import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NameGeneratorTool from '@/components/NameGenerator';
import { Globe, Check, ArrowRight } from 'lucide-react';

const NameGeneratorPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Globe size={14} className="mr-1" />
              <span>AI Name Generator</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              AI-Generated Business Names
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Our advanced AI creates unique, creative, and SEO-friendly business names tailored to your industry.
              Discover the perfect name that resonates with your brand identity and target audience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Industry-Specific</h3>
                <p className="text-sm text-muted-foreground">Tailored suggestions optimized for your business niche</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">SEO-Friendly</h3>
                <p className="text-sm text-muted-foreground">Names that perform well in search engines</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Check size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Brand-Ready</h3>
                <p className="text-sm text-muted-foreground">Memorable names that connect with customers</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">1</div>
                <h3 className="font-medium mb-2">Enter Business Details</h3>
                <p className="text-sm text-muted-foreground">Describe your business type, industry, and preferences</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">2</div>
                <h3 className="font-medium mb-2">AI Generation</h3>
                <p className="text-sm text-muted-foreground">Our AI creates unique name suggestions in seconds</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">3</div>
                <h3 className="font-medium mb-2">Review & Save</h3>
                <p className="text-sm text-muted-foreground">Browse suggestions and save your favorites</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NameGeneratorTool onNamesGenerated={() => {}} />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Why Choose Our AI Name Generator?</h2>
            <p className="text-muted-foreground mb-8">
              Unlike standard name generators, our AI-powered technology analyzes market trends, industry-specific terminology, 
              and consumer psychology to generate names that truly resonate with your target audience.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white shadow-sm rounded-lg text-left">
                <h3 className="font-medium mb-2">For New Businesses</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find the perfect name that sets the foundation for your brand identity, helping you launch with confidence.
                </p>
                <a href="/location-optimization" className="text-primary font-medium text-sm inline-flex items-center">
                  Try Location Optimization <ArrowRight size={14} className="ml-1" />
                </a>
              </div>
              <div className="p-6 bg-white shadow-sm rounded-lg text-left">
                <h3 className="font-medium mb-2">For Rebranding</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover fresh name ideas that retain your brand essence while giving your business a modern update.
                </p>
                <a href="/industry-customization" className="text-primary font-medium text-sm inline-flex items-center">
                  Try Industry Customization <ArrowRight size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NameGeneratorPage;
