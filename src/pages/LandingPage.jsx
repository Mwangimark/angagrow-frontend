import React from 'react';
import Navbar from '../components/landing-sections/Navbar'; 
import Footer from '../components/landing-sections/Footer'; 
import HeroSection from '../components/landing-sections/HeroSection';
import FeaturesSection from '../components/landing-sections/FeaturesSection';
import HowItWorksSection from '../components/landing-sections/HowItWorksSection';
import TestimonialsSection from '../components/landing-sections/TestimonialsSection';
import StatsSection from '../components/landing-sections/StatsSection';
import CTASection from '../components/landing-sections/CTASection';
import StatsImpact from '../components/landing-sections/StatsImpact';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar - Create this component separately */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Stats Impact Section */}
      <StatsImpact />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer - Create this component separately */}
      <Footer />
    </div>
  );
};

export default LandingPage;