import React from 'react'; 
import { Link } from 'react-router-dom';
import one from '../assets/1.jpg' 
import two from '../assets/2.jpg' 
import three from '../assets/3.jpg' 
import four from '../assets/4.jpg' 
import five from '../assets/5.jpg' 
import six from '../assets/6.jpg' 
import seven from '../assets/7.jpg' 
import eight from '../assets/8.jpg' 
 const WhyChooseUs = () => { 
   // Vision, Policies, Mission Data 
   const portfolioItem = [ 
     { 
       id: 1, 
       title: "D Cut Bags", 
       description: "We are specialists in D Cut Non Woven Bags printing, which makes us India's No. 1 D Cut bag Manufacturer", 
       image: one
     }, 
     { 
       id: 2, 
       title: "Premium Loop Handle Bags", 
       description: "We Manufacture various range of Premium Bags like Loop Handle Stylish Bags, Single Colors, Two Colors etc", 
       image: two
     }, 
     { 
       id: 3, 
       title: "Digital Box Bag Printing", 
       description: "We deliver high end printing quality Bags by latest offset machine.", 
       image: three
     } 
   ];
   const visionPoliciesMission = [ 
     { 
       id: 1, 
       title: "Our Vision", 
       content: [ 
         "Our vision is to bring all printers Pan India to one platform and unite them to enhance the strength as union.", 
         "In addition to this we also look forward to extend our services to Printers for their welfare and development." 
       ], 
       icon: "fa-lightbulb", 
       bgColor: "bg-[#1abc9c]" 
     }, 
     { 
       id: 2, 
       title: "Our Policies", 
       content: [ 
         "To work as B2B and provide our Best in class services only to Printers & Advertising agencies at least margin and in fixed predefined timeframe.", 
         "We never compromise with quality and quantity of the product. In other words our customers (Printer & Advertisers) get best Value for money." 
       ], 
       icon: "fa-cog", 
       bgColor: "bg-[#34495e]" 
     }, 
     { 
       id: 3, 
       title: "Our Mission", 
       content: [ 
         "To make India self dependent and leader in printer technology.", 
         "To create innovative printing services & products to be available for Indian as well as International customers." 
       ], 
       icon: "fa-thumbs-up", 
       bgColor: "bg-[#e74c3c]" 
     } 
   ]; 
 
   // Portfolio Items Data 
   const portfolioItems = [ 
     { 
       id: 1, 
       title: "Dedicated Team", 
       description: "Highly Skilled & Always Prepared", 
       image: one
     }, 
     { 
       id: 2, 
       title: "Free Services", 
       description: "Order Management Software & Monthly Magazine", 
       image: two
     }, 
     { 
       id: 3, 
       title: "Lowest Price Guarantee", 
       description: "We are not in profit making. We Serve Printing Industry", 
       image: three
     }, 
     { 
       id: 4, 
       title: "Wide Services Range", 
       description: "Avail many service which are continuously increasing...", 
       image: four
     }, 
     { 
       id: 5, 
       title: "Ontime Services", 
       description: "We never leave till tomorrow, which we can do today", 
       image: five
     }, 
     { 
       id: 6, 
       title: "Unity is Strength", 
       description: "Coming together is Begining, Working together is Success", 
       image: six
     }, 
     { 
       id: 7, 
       title: "Join to Grow", 
       description: "We are dedicated for growth & development of every printer", 
       image: seven
     }, 
     { 
       id: 8, 
       title: "World Class Quality", 
       description: "Our quality is result of Intelligent efforts", 
       image: eight
     } 
   ]; 
 
   return ( 
     <section id="why-choose-us" className="py-20 bg-white"> 
       <div className="container mx-auto px-4 md:px-8"> 
         
        
 
        
 
         {/* Portfolio Grid Section */} 
         <div id="section-portfolio" className="mt-20"> 
           <div className="text-center mb-16 mt-20"> 
             <h2 className="text-3xl font-semibold text-black underline decoration-2 underline-offset-4 uppercase tracking-wide"> 
               Wide range of Printing Services 
             </h2> 
           </div>
           
           {/* Grid Layout for Benefits */}
           <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 place-items-center mb-20 sm:grid-cols-2 lg:grid-cols-3"> 
             {portfolioItem.map((item) => ( 
               <div key={item.id} className="group w-full max-w-sm h-full bg-gray-50 rounded-3xl p-8 border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2 flex flex-col"> 
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500"> 
                    <i className="fas fa-thumbs-up text-2xl"></i> 
                 </div> 
                 <h3 className="text-xl font-bold text-gray-800 mb-4 font-heading group-hover:text-primary transition-colors"> 
                   {item.title} 
                 </h3> 
                 <p className="text-gray-600 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: item.description }}></p> 
               </div> 
             ))} 
           </div> 
            {/* Vision, Policies, Mission Section */} 
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 justify-items-center items-stretch mb-24 md:grid-cols-3"> 
           {visionPoliciesMission.map((item) => ( 
            <div key={item.id} className="relative group w-full max-w-sm h-full"> 
              <div className={`h-full min-h-[420px] overflow-hidden rounded-3xl p-10 ${item.bgColor} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}> 
                <div className="relative z-10 text-white h-full flex flex-col"> 
                   <h3 className="text-2xl font-bold uppercase mb-8 tracking-wider font-heading"> 
                     {item.title} 
                   </h3> 
                  <div className="space-y-6 flex-1"> 
                     {item.content.map((paragraph, idx) => ( 
                       <p key={idx} className="text-white/90 leading-relaxed text-lg"> 
                         {paragraph} 
                       </p> 
                     ))} 
                   </div> 
                  <div className="mt-auto pt-10 text-white/20 text-7xl flex justify-end group-hover:text-white/40 transition-colors duration-500">
                     <i className={`fas ${item.icon}`}></i> 
                   </div>
                 </div> 
               </div> 
             </div> 
           ))} 
         </div> 
             {/* Section Heading */} 
         <div className="text-center mb-16 mt-20"> 
           <h2 className="text-3xl font-semibold text-black underline decoration-2 underline-offset-4 uppercase tracking-wide"> 
             Why do a Printer Choose Us? 
           </h2> 
         </div> 
 
           {/* Visual Grid Layout */} 
           <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 place-items-center mt-16 md:grid-cols-3 lg:grid-cols-4"> 
             {portfolioItems.map((item) => ( 
               <div key={item.id} className="group relative w-full aspect-square overflow-hidden rounded-3xl shadow-lg"> 
                 <img 
                   src={item.image} 
                   alt={item.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                   onError={(e) => {
                     e.target.src = `https://via.placeholder.com/400x400?text=${item.title.replace(' ', '+')}`;
                   }}
                 /> 
                 <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"> 
                    <h4 className="text-black font-bold text-lg mb-1 font-heading">{item.title}</h4>
                    <p className="text-gray-700 text-sm font-medium" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                    <div className="mt-4 flex gap-2">
                        <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>
                 </div> 
               </div> 
             ))} 
           </div> 
         </div> 
 
       </div> 
     </section> 
   ); 
 }; 
 
 export default WhyChooseUs;
