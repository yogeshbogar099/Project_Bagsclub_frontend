import React from 'react';
import ContactSection from '../../../components/Contact'; // Reusing existing Contact component

const Contact = () => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
      <ContactSection />
    </div>
  );
};

export default Contact;
