import React from "react"; 
 import { 
   FaCircleCheck, 
   FaAngleRight, 
   FaLocationDot, 
   FaPhone, 
   FaInstagram, 
   FaYoutube, 
 } from "react-icons/fa6"; 
 
 const AssociateFooter = () => { 
   return ( 
     <footer className="bg-[linear-gradient(90deg,#071327,#0b1f44,#071327)] pt-[40px] border-t-4 border-[#f4c400] text-white"> 
 
       <div className="w-[90%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1.2fr] gap-[30px] lg:gap-[60px] pb-[40px]"> 
 
         {/* Left Section */} 
         <div> 
           <h2 className="relative text-[20px] font-bold mb-[25px] pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[4px] before:w-[3px] before:h-[22px] before:bg-[#f4c400] before:rounded-full"> 
             Printers Club Group 
           </h2> 
 
           <p className="text-[#b6bfd3] leading-[1.8] text-[14px] mb-[25px] max-w-[580px]"> 
             Dedicated to the continuous development and modernization of the 
             printing industry in India. Providing quality services and a unified 
             platform for printers nationwide. 
           </p> 
 
           <ul className="space-y-[12px]"> 
             <li className="flex items-center gap-2 text-[14px] font-medium"> 
               <FaCircleCheck className="text-[#f4c400] text-[13px]" /> 
               Printers Club of India Limited 
             </li> 
 
             <li className="flex items-center gap-2 text-[14px] font-medium"> 
               <FaCircleCheck className="text-[#f4c400] text-[13px]" /> 
               Printers Club Expo Private Limited 
             </li> 
 
             <li className="flex items-center gap-2 text-[14px] font-medium"> 
               <FaCircleCheck className="text-[#f4c400] text-[13px]" /> 
               Printers Club Today Private Limited 
             </li> 
           </ul> 
         </div> 
 
         {/* Center Section */} 
         <div> 
           <h2 className="relative text-[20px] font-bold mb-[25px] pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[4px] before:w-[3px] before:h-[22px] before:bg-[#f4c400] before:rounded-full"> 
             Quick Links 
           </h2> 
 
           <ul className="space-y-[15px]"> 
             {[ 
               "About Us", 
               "Services", 
               "Portfolio", 
               "Contact Us", 
               "Terms & Conditions", 
             ].map((item, index) => ( 
               <li key={index}> 
                 <a 
                   href="#" 
                   className="flex items-center gap-2 text-[14px] transition-all duration-300 hover:text-[#f4c400] hover:pl-[5px]" 
                 > 
                   <FaAngleRight className="text-[12px]" /> 
                   {item} 
                 </a> 
               </li> 
             ))} 
           </ul> 
         </div> 
 
         {/* Right Section */} 
         <div> 
           <h2 className="relative text-[20px] font-bold mb-[25px] pl-[18px] before:content-[''] before:absolute before:left-0 before:top-[4px] before:w-[3px] before:h-[22px] before:bg-[#f4c400] before:rounded-full"> 
             Contact Info 
           </h2> 
 
           <div className="flex items-start gap-[15px] mb-[20px]"> 
             <FaLocationDot className="text-[#f4c400] text-[20px] mt-[4px]" /> 
 
             <div> 
               <h4 className="text-[16px] mb-1 font-semibold">Head Office:</h4> 
 
               <p className="text-[#b6bfd3] leading-[1.6] text-[14px]"> 
                 Plot No. 57, Jhotwara Industrial Area, Near Shalimar Circle, 
                 Jaipur-302012, Rajasthan, India 
               </p> 
             </div> 
           </div> 
 
           <div className="flex items-start gap-[15px] mb-[20px]"> 
             <FaPhone className="text-[#f4c400] text-[20px] mt-[4px]" /> 
 
             <div> 
               <a 
                 href="tel:+9101413112244" 
                 className="text-white text-[18px] font-semibold" 
               > 
                 (+91) 0141-311-2244 
               </a> 
             </div> 
           </div> 
 
           {/* Social Icons */} 
           <div className="flex gap-[12px] mt-4"> 
             <a 
               href="#" 
               className="w-[45px] h-[45px] rounded-full bg-white/10 flex items-center justify-center text-[18px] transition-all duration-300 hover:bg-[#f4c400] hover:text-black hover:-translate-y-[3px]" 
             > 
               <FaInstagram /> 
             </a> 
 
             <a 
               href="#" 
               className="w-[45px] h-[45px] rounded-full bg-white/10 flex items-center justify-center text-[18px] transition-all duration-300 hover:bg-[#f4c400] hover:text-black hover:-translate-y-[3px]" 
             > 
               <FaYoutube /> 
             </a> 
           </div> 
         </div> 
       </div> 
 
       {/* Bottom Footer */} 
       <div className="border-t border-white/10 py-[20px]"> 
         <div className="w-[90%] max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"> 
 
           <p className="text-[#8f9ab2] text-[14px]"> 
             Copyrights © 2026 | All Rights Reserved by{" "} 
             <span className="text-white font-semibold"> 
               Printers Club of India Limited 
             </span> 
           </p> 
 
           <div className="flex items-center gap-4"> 
             <a 
               href="#" 
               className="text-[#8f9ab2] text-[14px] hover:text-white transition" 
             > 
               Policy & Terms 
             </a> 
 
             <span className="text-[#6f7b96]">|</span> 
 
             <a 
               href="#" 
               className="text-[#f4c400] font-semibold text-[14px]" 
             > 
               Portal Login 
             </a> 
           </div> 
         </div> 
       </div> 
     </footer> 
   ); 
 }; 
 
 export default AssociateFooter;