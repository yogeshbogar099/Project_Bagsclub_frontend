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
     <footer className="bg-[linear-gradient(90deg,#071327,#0b1f44,#071327)] pt-[70px] border-t-4 border-[#f4c400] text-white"> 
 
       <div className="w-[90%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1.2fr] gap-[50px] lg:gap-[80px] pb-[60px]"> 
 
         {/* Left Section */} 
         <div> 
           <h2 className="relative text-[22px] font-bold mb-[35px] pl-[22px] before:content-[''] before:absolute before:left-0 before:top-[5px] before:w-[4px] before:h-[30px] before:bg-[#f4c400] before:rounded-full"> 
             Printers Club Group 
           </h2> 
 
           <p className="text-[#b6bfd3] leading-[2] text-[16px] mb-[35px] max-w-[580px]"> 
             Dedicated to the continuous development and modernization of the 
             printing industry in India. Providing quality services and a unified 
             platform for printers nationwide. 
           </p> 
 
           <ul className="space-y-[18px]"> 
             <li className="flex items-center gap-3 text-[17px] font-medium"> 
               <FaCircleCheck className="text-[#f4c400] text-[15px]" /> 
               Printers Club of India Limited 
             </li> 
 
             <li className="flex items-center gap-3 text-[17px] font-medium"> 
               <FaCircleCheck className="text-[#f4c400] text-[15px]" /> 
               Printers Club Expo Private Limited 
             </li> 
 
             <li className="flex items-center gap-3 text-[17px] font-medium"> 
               <FaCircleCheck className="text-[#f4c400] text-[15px]" /> 
               Printers Club Today Private Limited 
             </li> 
           </ul> 
         </div> 
 
         {/* Center Section */} 
         <div> 
           <h2 className="relative text-[22px] font-bold mb-[35px] pl-[22px] before:content-[''] before:absolute before:left-0 before:top-[5px] before:w-[4px] before:h-[30px] before:bg-[#f4c400] before:rounded-full"> 
             Quick Links 
           </h2> 
 
           <ul className="space-y-[24px]"> 
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
                   className="flex items-center gap-3 text-[17px] transition-all duration-300 hover:text-[#f4c400] hover:pl-[5px]" 
                 > 
                   <FaAngleRight className="text-[13px]" /> 
                   {item} 
                 </a> 
               </li> 
             ))} 
           </ul> 
         </div> 
 
         {/* Right Section */} 
         <div> 
           <h2 className="relative text-[22px] font-bold mb-[35px] pl-[22px] before:content-[''] before:absolute before:left-0 before:top-[5px] before:w-[4px] before:h-[30px] before:bg-[#f4c400] before:rounded-full"> 
             Contact Info 
           </h2> 
 
           <div className="flex items-start gap-[22px] mb-[35px]"> 
             <FaLocationDot className="text-[#f4c400] text-[26px] mt-[5px]" /> 
 
             <div> 
               <h4 className="text-[18px] mb-2">Head Office:</h4> 
 
               <p className="text-[#b6bfd3] leading-[1.8] text-[16px]"> 
                 Plot No. 57, Jhotwara Industrial Area, Near Shalimar Circle, 
                 Jaipur-302012, Rajasthan, India 
               </p> 
             </div> 
           </div> 
 
           <div className="flex items-start gap-[22px] mb-[35px]"> 
             <FaPhone className="text-[#f4c400] text-[26px] mt-[5px]" /> 
 
             <div> 
               <a 
                 href="tel:+9101413112244" 
                 className="text-white text-[22px] font-semibold" 
               > 
                 (+91) 0141-311-2244 
               </a> 
             </div> 
           </div> 
 
           {/* Social Icons */} 
           <div className="flex gap-[18px] mt-5"> 
             <a 
               href="#" 
               className="w-[62px] h-[62px] rounded-full bg-white/10 flex items-center justify-center text-[22px] transition-all duration-300 hover:bg-[#f4c400] hover:text-black hover:-translate-y-[5px]" 
             > 
               <FaInstagram /> 
             </a> 
 
             <a 
               href="#" 
               className="w-[62px] h-[62px] rounded-full bg-white/10 flex items-center justify-center text-[22px] transition-all duration-300 hover:bg-[#f4c400] hover:text-black hover:-translate-y-[5px]" 
             > 
               <FaYoutube /> 
             </a> 
           </div> 
         </div> 
       </div> 
 
       {/* Bottom Footer */} 
       <div className="border-t border-white/10 py-[28px]"> 
         <div className="w-[90%] max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-left"> 
 
           <p className="text-[#8f9ab2] text-[16px]"> 
             Copyrights © 2026 | All Rights Reserved by{" "} 
             <span className="text-white font-semibold"> 
               Printers Club of India Limited 
             </span> 
           </p> 
 
           <div className="flex items-center gap-5"> 
             <a 
               href="#" 
               className="text-[#8f9ab2] text-[16px] hover:text-white transition" 
             > 
               Policy & Terms 
             </a> 
 
             <span className="text-[#6f7b96]">|</span> 
 
             <a 
               href="#" 
               className="text-[#f4c400] font-semibold text-[16px]" 
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