import React from 'react';
import Hero from '../../components/Hero';
import Services from '../../components/Services';
import InfoSection from '../../components/InfoSection';
import Branches from '../../components/Branches';
import Stats from '../../components/Stats';
import WhyChooseUs from '../../components/WhyChooseUs';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';

const AssociateHome = () => {
  return (
    <div className="font-body text-gray-800">
      <Hero />
      <Services />
      <InfoSection />
      <Branches />
      <Stats />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default AssociateHome;
