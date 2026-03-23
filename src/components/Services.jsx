import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
  
 const Services = () => { 
   const navigate = useNavigate();
   const { user } = useAuth();

   // Service Data Configuration 
   const services = [ 
     { 
       id: 1, 
       title: "Printing Services", 
       company: "Bags Club Pvt. Ltd.", 
       description: "India's Biggest Printing Expo Series – Exploring New Technologies and the Future of the Printing Industry.", 
       icon: "images/Print_Pack_Digital_Signage_EXPO_New.png", 
       badge: null, 
       action: { 
         type: "link", 
         url: "#" 
       } 
     }, 
     { 
       id: 2, 
       title: "Free Design Services", 
       company: "Bags Club Today Pvt. Ltd.", 
       description: "Printers Club Today is not just a magazine, it is India's fastest growing printing industry platform.", 
       icon: "images/today_def.png", 
       badge: null, 
       action: { 
         type: "alert", 
         message: "Coming Soon !!" 
       } 
     }, 
     { 
       id: 3, 
       title: "Buy & Sell Machines", 
       company: null, 
       description: "Wide range of excellent printing services at low cost with committed turnout time. Like visting cards, pamphlets, posters, stationery etc...", 
       icon: "images/login_Printing_Services_Exclusive_For_PRinters.png", 
       badge: null, 
       action: { 
         type: "anchor", 
         url: "#" 
       } 
     }
   ]; 
  
   // Handle Click Actions 
   const handleServiceClick = (service) => { 
     const { action, title } = service;

     // Special redirection for Printing Services if user is logged in
     if (title === "Printing Services" && user) {
       navigate('/associate/add-order');
       return;
     }

     if (action.type === "link") { 
       window.open(action.url, '_blank'); 
     } else if (action.type === "alert") { 
       alert(action.message); 
     } else if (action.type === "anchor") { 
       const element = document.querySelector(action.url); 
       if (element) { 
         element.scrollIntoView({ behavior: 'smooth' }); 
       } 
     } else if (action.type === "internal") {
        navigate(action.url);
     }
   }; 
  
   return ( 
     <div id="services" className="py-20 bg-white"> 
       <div className="container mx-auto px-4 md:px-8"> 
          
         {/* Section Heading */} 
         <div className="text-center mb-16 mt-20"> 
           <h2 className="text-3xl font-semibold text-black underline decoration-2 underline-offset-4 uppercase tracking-wide"> 
             Our Services 
           </h2> 
         </div> 
  
         {/* Services Grid */} 
         <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 place-items-center md:grid-cols-2 lg:grid-cols-3"> 
           {services.map((service) => ( 
             <div 
               key={service.id} 
               onClick={() => handleServiceClick(service)} 
               className="service-item group relative w-full max-w-sm bg-white border border-gray-100 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 min-h-[350px] flex flex-col justify-between" 
               style={{ 
                 background: 'linear-gradient(180deg, rgba(255, 245, 245, 1) 0%, rgba(240, 249, 255, 1) 100%)' 
               }} 
             > 
               <div className="fbox-content flex flex-col h-full"> 
                 {/* Title */} 
                 <h3 className="text-lg font-bold text-gray-800 mb-6 text-center font-heading"> 
                   {service.title} 
                 </h3> 
  
                 {/* Icon/Image Container */} 
                 <div className="flex flex-col items-center justify-center mb-6 min-h-[160px]"> 
                   {service.badge && ( 
                     <div  
                       className="text-[10px] font-bold text-white text-center leading-tight mb-4 px-3 py-1.5 rounded-full shadow-sm" 
                       style={{ backgroundColor: service.badge.color }} 
                     > 
                       {service.badge.text} 
                     </div> 
                   )} 
                   <img  
                     src={service.icon}  
                     alt={service.title}  
                     className="max-h-[130px] w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                     onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150x130?text=${service.title.replace(' ', '+')}`;
                     }}
                   /> 
                 </div> 
  
                 {/* Company Name (if exists) */} 
                 {service.company && ( 
                   <p className="text-center text-xs font-bold text-primary uppercase mb-3 tracking-wider"> 
                     {service.company} 
                   </p> 
                 )} 
  
                 {/* Description */} 
                 <p className="text-gray-600 text-sm leading-relaxed text-center font-medium"> 
                   {service.description} 
                 </p> 
               </div> 
             </div> 
           ))} 
         </div> 
       </div> 
     </div> 
   ); 
 }; 
  
 export default Services;
