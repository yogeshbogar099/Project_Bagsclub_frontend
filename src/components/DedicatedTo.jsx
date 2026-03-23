import React from 'react'; 
import premium from '../assets/Premium.jpg';
import express from '../assets/Express.jpg';
 
 const DedicatedTo = () => { 
   // Dedicated To Data 
   const dedicatedItems = [ 
     { 
       id: 1, 
       title: "Premium Quality", 
       subtitle: "World class", 
       image: premium, 
       delay: 100 
     }, 
     { 
       id: 3, 
       title: "Express Services", 
       subtitle: "Always on time", 
       image: express, 
       delay: 300 
     } 
   ]; 
 
   return ( 
     <section id="dedicated-to" className="py-20 bg-white"> 
       <div className="container mx-auto px-4 md:px-8"> 
         
         {/* Section Heading */} 
         <div className="text-center mb-16 mt-20"> 
           <h2 className="text-3xl font-semibold text-black underline decoration-2 underline-offset-4 uppercase tracking-wide"> 
             We are Dedicated To 
           </h2> 
         </div> 
 
         {/* Dedicated To Cards */} 
         <div className="flex flex-col md:flex-row gap-10 justify-center items-center max-w-5xl mx-auto"> 
           {dedicatedItems.map((item) => ( 
             <div 
               key={item.id} 
               className="w-full md:w-1/2 max-w-sm group" 
               style={{ animationDelay: `${item.delay}ms` }} 
             > 
               <div className="flex flex-col items-center"> 
                 <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2"> 
                   <img 
                     src={item.image} 
                     alt={item.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                     onError={(e) => {
                       e.target.src = `https://via.placeholder.com/600x450?text=${item.title.replace(' ', '+')}`;
                     }}
                   /> 
                   {/* Overlay Effect */} 
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <div className="text-white">
                        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-secondary">{item.subtitle}</p>
                        <h4 className="text-xl font-bold">{item.title}</h4>
                      </div>
                   </div> 
                 </div> 
                 
                 <div className="mt-8 text-center"> 
                   <h4 className="text-xl font-bold text-gray-800 mb-2 font-heading group-hover:text-primary transition-colors duration-300"> 
                     {item.title} 
                   </h4> 
                   <span className="text-sm text-gray-500 uppercase font-bold tracking-[0.2em]"> 
                     {item.subtitle} 
                   </span> 
                 </div> 
               </div> 
             </div> 
           ))} 
         </div> 
 
       </div> 
     </section> 
   ); 
 }; 
 
 export default DedicatedTo;
