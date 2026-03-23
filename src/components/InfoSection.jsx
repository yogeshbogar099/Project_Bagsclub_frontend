import Business from '../assets/business.jpg'
const InfoSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative">
              <img 
                src= {Business}
                alt="Printed Bag" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-6">
             Always ready to Help Printers & Advertisers
              </h2>
            <p className="text-gray-600 mb-6 text-lg">
      Unity empowers us. We can work alone, but together we will win. Unity is strength, where there is team work and collaborations, wonderfull things can be achieved.
      Speedly growing horizontally & vertically.

Our current reach & Network BagsClub of India Limited is widely popular all throughout North and Central India as we have features that are tailor made to satisfy Printers & advertising agency needs.

With the valuable support of 25+ Delivery Partners we deliver our services to across North India. As we are in continious search of new Distributors and Partners PAN India.

Currently we serve Rajasthan, Punjab, Haryana, Delhi, Uttar Pradesh, Uttrakhand, Jammu & Kashmeer, Bihar, West Bengal, Gujrat, Madhya Pradesh & Himachal Pradesh

We are continuously & Speedly growing our network reach.

Our dedication, Quality & welfare works, helped us to achieve this success.
            </p>
            
            
            
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;