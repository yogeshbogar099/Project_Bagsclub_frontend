import React, { useState, useEffect } from 'react'; 
import business from '../assets/business.jpg'
 
 const AboutReach = () => { 
   // Counter Data 
   const counters = [ 
     { 
       id: 1, 
       value: 25, 
       label: "Delivery Partners", 
       icon: "can_images/icons_home_pcil/pcil-distributors_n.png", 
       bgColor: "bg-[#8098dc]" 
     }, 
     { 
       id: 2, 
       value: 1000, 
       label: "Total Members", 
       icon: "can_images/icons_home_pcil/pcil-members_n.png", 
       bgColor: "bg-[#95a6ca]" 
     }, 
     { 
       id: 3, 
       value: 100, 
       label: "Dedicated Staffs", 
       icon: "can_images/icons_home_pcil/pcil-staff_n.png", 
       bgColor: "bg-[#6697B9]" 
     }
   ]; 
 
   // Counter Animation Logic 
   const [countersState, setCountersState] = useState(counters.map(c => ({ ...c, current: 0 }))); 
 
   useEffect(() => { 
     const timer = setTimeout(() => { 
       counters.forEach(counter => { 
         const duration = 2000; // 2 seconds 
         const steps = 60; 
         const stepTime = duration / steps; 
         const stepValue = counter.value / steps; 
         
         let current = 0; 
         const interval = setInterval(() => { 
           current += stepValue; 
           if (current >= counter.value) { 
             current = counter.value; 
             clearInterval(interval); 
           } 
           setCountersState(prev => prev.map(c => 
             c.id === counter.id ? { ...c, current: Math.floor(current) } : c 
           )); 
         }, stepTime); 
       }); 
     }, 500); // Start after 0.5s delay 
 
     return () => clearTimeout(timer); 
   }, []); 
 
   return ( 
     <section id="about-reach" className="py-20 bg-gray-50"> 
       <div className="container mx-auto px-4 md:px-8"> 
         
         {/* Section 1: Always Ready to Help */} 
         <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl mb-20 overflow-hidden"> 
           <div className="flex flex-col lg:flex-row items-center gap-12"> 
             
             {/* Left Text */} 
             <div className="w-full lg:w-5/12 text-center lg:text-left"> 
               <div className="mb-16 mt-8"> 
                 <h2 className="text-3xl font-semibold text-black underline decoration-2 underline-offset-4 leading-tight uppercase"> 
                   Always ready to Help<br /> 
                   <span className="text-primary">Printers & Advertisers</span> 
                 </h2> 
               </div> 
               <p className="text-gray-600 text-lg md:text-xl leading-relaxed"> 
                 Unity empowers us. We can work alone, but together we will win. Unity is strength, where there is team work and collaborations, wonderfull things can be achieved.
               </p> 
             </div> 
 
             {/* Right Image */} 
             <div className="w-full lg:w-7/12"> 
               <div className="relative overflow-hidden rounded-2xl shadow-2xl"> 
                 <img 
                   src= {business}
                   alt="Printers Club Support" 
                   className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
                   onError={(e) => {
                     e.target.src = "https://via.placeholder.com/800x500?text=Always+Ready+to+Help";
                   }}
                 /> 
               </div> 
             </div> 
 
           </div> 
         </div> 
 
         {/* Section 2: Our Reach & Network */} 
         <div className="flex flex-col lg:flex-row items-stretch mb-20 rounded-3xl overflow-hidden shadow-xl"> 
           {/* Left Background Image */} 
           <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-auto relative" 
                style={{ 
                  backgroundImage: "url('can_images/services/Our-Reach-New.jpg')", 
                  backgroundSize: "cover", 
                  backgroundPosition: "center" 
                }}> 
                <div className="absolute inset-0 bg-black/10"></div>
                {/* Fallback for bg image */}
                <div className="absolute inset-0 flex items-center justify-center lg:hidden bg-gray-200 -z-10">
                    <span className="text-gray-400">Our Reach & Network</span>
                </div>
           </div> 
 
           {/* Right Text Content */} 
           <div className="w-full lg:w-1/2 bg-white p-8 md:p-16 flex flex-col justify-center"> 
             <div className="mb-16 mt-8"> 
               <span className="text-secondary font-bold uppercase text-sm tracking-widest mb-4 block"> 
                 Speedily growing horizontally & vertically. 
               </span> 
               <h3 className="text-3xl font-semibold text-black underline decoration-2 underline-offset-4 uppercase"> 
                 Our current reach & Network 
               </h3> 
             </div> 
             
             <div className="space-y-6 text-gray-600 text-lg"> 
               <p> 
                 <strong className="text-primary">BagsClub of India Limited</strong> is widely popular all throughout North and Central India as we have features that are tailor made to satisfy Printers & advertising agency needs. 
               </p> 
               <p> 
                 With the valuable support of <strong className="text-primary">25+ Delivery Partners</strong> we deliver our services to across North India. As we are in continuous search of new Distributors and Partners PAN India. 
               </p> 
               <p> 
                 Currently we serve Rajasthan, Punjab, Haryana, Delhi, Uttar Pradesh, Uttrakhand, Jammu &amp; Kashmir, Bihar, West Bengal, Gujarat, Madhya Pradesh &amp; Himachal Pradesh 
               </p> 
               <p className="font-semibold text-gray-800 italic"> 
                 We are continuously &amp; Speedily growing our network reach. 
               </p> 
               <p className="text-secondary font-medium"> 
                 Our dedication, Quality &amp; welfare works, helped us to achieve this success. 
               </p> 
             </div> 
           </div> 
         </div> 
 
         {/* Section 3: Statistics Counters */} 
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 place-items-center sm:grid-cols-2 lg:grid-cols-3"> 
           {countersState.map((counter) => ( 
            <div key={counter.id} className="group w-full max-w-sm"> 
               <div className={`rounded-3xl p-8 ${counter.bgColor} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center h-full`}> 
                 <div className="bg-white/20 p-4 rounded-2xl mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                    <img 
                    src={counter.icon} 
                    alt={counter.label} 
                    className="w-16 h-16 object-contain filter brightness-0 invert" 
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                    /> 
                 </div>
                 <div className="text-4xl font-bold text-white mb-3 font-heading tabular-nums"> 
                   <span>{counter.current.toLocaleString()}</span> 
                   {(counter.id === 1 || counter.id === 2 || counter.id === 4) && <span>+</span>} 
                 </div> 
                 <h5 className="text-white/90 font-bold text-lg uppercase tracking-wider">{counter.label}</h5> 
               </div> 
             </div> 
           ))} 
         </div> 
 
       </div> 
     </section> 
   ); 
 }; 
 
 export default AboutReach;
