import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import AboutReach from '../components/AboutReach';
import DedicatedTo from '../components/DedicatedTo';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="font-body text-gray-800">
      <Header />
      <Hero />
      <Services />
      <AboutReach />
       <WhyChooseUs />
      <DedicatedTo />
     <Footer />
     
    </div>
  );
};

export default LandingPage;
