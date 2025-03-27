import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProofBar from '@/components/SocialProofBar';
import NameGenerator from '@/components/NameGenerator';
import GeneratedNames from '@/components/GeneratedNames';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { initScrollAnimations } from '@/lib/animations';

const Index = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  
  // Initialize animations on component mount
  useEffect(() => {
    initScrollAnimations();
    
    // Add scroll event listener for smooth reveal animations
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
      elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (position < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleNamesGenerated = (names: string[]) => {
    setGeneratedNames(names);
    
    // Scroll to names section after generation
    setTimeout(() => {
      const namesSection = document.getElementById('generated-names');
      if (namesSection) {
        namesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SocialProofBar />
      <NameGenerator onNamesGenerated={handleNamesGenerated} />
      {generatedNames.length > 0 && (
        <div id="generated-names">
          <GeneratedNames names={generatedNames} />
        </div>
      )}
      <Features />
      <Footer />
    </main>
  );
};

export default Index;
