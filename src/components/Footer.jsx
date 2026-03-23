import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
  
 const Footer = () => { 
   const [email, setEmail] = useState(''); 
   const [subscribed, setSubscribed] = useState(false); 
  
   // Handle Newsletter Subscription 
   const handleSubscribe = (e) => { 
     e.preventDefault(); 
     if (email) { 
       // Simulate subscription 
       setSubscribed(true); 
       setTimeout(() => { 
         setSubscribed(false); 
         setEmail(''); 
       }, 3000); 
     } 
   }; 
  
   // Footer Data 
   const footerLinks = [ 
     { name: "About Us", url: "#about-reach" }, 
     { name: "Services", url: "#services" }, 
     { name: "Why Choose Us", url: "#why-choose-us" }, 
     { name: "Contact Us", url: "#contact" }, 
     { name: "Terms & Conditions", url: "/support/terms" }, 
     { name: "Sign In", url: "/login" } 
   ]; 
  
   const socialLinks = [ 
     { 
       name: "Instagram", 
       url: "", 
       icon: "fa-instagram" 
     }, 
     { 
       name: "YouTube", 
       url: "", 
       icon: "fa-youtube" 
     } 
   ]; 
  
   return ( 
     <footer id="footer" className="bg-[#1a1a1a] text-white"> 
       <div className="container mx-auto px-4 md:px-8 py-20"> 
          
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12"> 
            
           {/* Left Column - Company Info */} 
           <div className="lg:col-span-8"> 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12"> 
                
               {/* Company Details */} 
               <div> 
                 <h2 className="text-xl font-bold mb-6 font-heading text-primary"> 
                   Bags Club Group of Companies 
                 </h2> 
                 <ul className="text-lg space-y-3 mb-8 text-gray-300"> 
                   <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Bags Club of India Limited</li> 
                   <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div>Bags Club Expo Private Limited</li> 
                   <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Bags Club Today</li> 
                 </ul> 
                 <p className="mb-8 text-gray-400 italic">Dedicated for development of printing industry</p> 
  
                 <div className="relative rounded-2xl overflow-hidden shadow-2xl group"> 
                   <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-20"  
                        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')" }}></div>
                   <div className="relative p-8 bg-black/70 backdrop-blur-[2px]"> 
                     <strong className="block text-lg mb-4 text-secondary">Head Office:</strong> 
                     <p className="mb-4 text-gray-200 leading-relaxed">
                      Near Godavari Bekari, Ausa Road <br/>
                     Latur-411023,<br /> 
                     Maharashra, India</p> 
                      
                  
                     
                      
                     <div className="flex items-center gap-3 text-gray-200">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <div>
                            <strong className="block text-xs uppercase tracking-widest text-gray-400">Phone</strong>
                            <p className="font-bold">(+91) 9975813249</p>
                        </div>
                     </div>
                   </div> 
                 </div> 
               </div> 
  
               {/* Useful Links */} 
               <div> 
                 <h4 className="text-lg font-bold mb-8 font-heading relative inline-block">
                    Useful Links
                    <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></div>
                 </h4> 
                 <ul className="space-y-4"> 
                   {footerLinks.map((link, index) => ( 
                     <li key={index}> 
                       <a  
                         href={link.url}  
                         className="text-gray-400 hover:text-primary transition-all duration-300 flex items-center gap-2 group" 
                       > 
                         <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-300"></span>
                         {link.name} 
                       </a> 
                     </li> 
                   ))} 
                 </ul> 
               </div> 
  
             </div> 
           </div> 
  
           {/* Right Column - Subscribe & Social */} 
           <div className="lg:col-span-4 space-y-12"> 
              
             {/* Today's Visit Counter */} 
             <div className="bg-white/5 rounded-3xl p-8 border border-white/10 text-center"> 
               <div className="text-4xl font-bold text-white mb-2 font-heading tabular-nums">148,557</div> 
               <h5 className="text-gray-400 uppercase tracking-widest text-xs font-bold">Total Todays Visit</h5> 
             </div> 
  
             {/* Newsletter Subscription */} 
             <div className="bg-primary/10 rounded-3xl p-8 border border-primary/20"> 
               <h5 className="text-lg font-bold mb-6 font-heading"> 
                 Subscribe to Our Newsletter 
               </h5> 
               <p className="text-sm text-gray-400 mb-6 leading-relaxed">Get Important News, Amazing Offers & Inside Scoops directly in your inbox.</p>
               
               <form onSubmit={handleSubscribe} className="space-y-4"> 
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                        <i className="fas fa-envelope"></i>
                    </div>
                    <input  
                        type="email"  
                        className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-500"  
                        placeholder="Enter your Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    /> 
                 </div>
                 <button  
                    type="submit"  
                    className="w-full bg-primary hover:bg-green-800 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-primary/20" 
                 > 
                    Subscribe Now
                 </button> 
                 {subscribed && ( 
                    <div className="text-green-400 text-center text-sm font-medium animate-pulse"> 
                        Thank you for subscribing! 
                    </div> 
                 )} 
               </form> 
             </div> 
  
             {/* Social Media Links */} 
             <div className="flex justify-center lg:justify-start gap-6"> 
               {socialLinks.map((social, index) => ( 
                 <a  
                   key={index}
                   href={social.url}  
                   target="_blank"  
                   rel="noopener noreferrer" 
                   className="group flex flex-col items-center gap-2" 
                 > 
                    <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:-translate-y-1 shadow-lg">
                        <i className={`fab ${social.icon}`}></i> 
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-primary transition-colors">{social.name}</span>
                 </a> 
               ))} 
             </div> 
  
           </div> 
         </div> 
  
         {/* Copyrights */} 
         <div className="border-t border-white/10 mt-20 pt-10"> 
           <div className="flex flex-col md:flex-row justify-between items-center gap-6"> 
             <div className="text-center md:text-left"> 
               <p className="text-gray-400 text-sm"> 
                 Copyrights &copy; 2026 All Rights Reserved by <span className="text-white font-bold">Bags Club of India Limited</span>. 
               </p> 
             </div> 
             <div className="flex gap-8"> 
               <Link  
                 to="/support/terms"  
                 className="text-gray-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest" 
               > 
                 Refund Policy
               </Link> 
               <Link  
                 to="/support/terms"  
                 className="text-gray-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest" 
               > 
                 Terms of Use 
               </Link> 
             </div> 
           </div> 
         </div> 
  
       </div> 
     </footer> 
   ); 
 }; 
  
 export default Footer;