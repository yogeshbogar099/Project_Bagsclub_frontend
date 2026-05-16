import React, { useState, useEffect } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/bagsClubLogo.png";
import { useAuth } from '../context/AuthContext';

 const Header = () => { 
   const [isScrolled, setIsScrolled] = useState(false); 
   const [isAtTop, setIsAtTop] = useState(true);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
   const [activeDropdown, setActiveDropdown] = useState(null); 
   const { user, logout } = useAuth();
   const location = useLocation();
   const forceSolid = location.pathname === '/login' || location.pathname === '/signup';
   const isSolid = forceSolid || isScrolled;
  
   // Handle scroll effect (transparent to solid) 
   useEffect(() => { 
     const handleScroll = () => { 
       setIsAtTop(window.scrollY === 0);
       if (window.scrollY > 50) { 
         setIsScrolled(true); 
       } else { 
         setIsScrolled(false); 
       } 
     }; 
     window.addEventListener('scroll', handleScroll, { passive: true }); 
     handleScroll();
     return () => window.removeEventListener('scroll', handleScroll); 
   }, []); 
  
   // Toggle Mobile Menu 
   const toggleMobileMenu = () => { 
     setIsMobileMenuOpen(!isMobileMenuOpen); 
   }; 
  
   // Toggle Dropdowns 
   const toggleDropdown = (menuName) => { 
     setActiveDropdown(activeDropdown === menuName ? null : menuName); 
   }; 
  
   // Close dropdown when clicking outside (optional but good UX) 
   useEffect(() => { 
     const handleClickOutside = () => { 
       setActiveDropdown(null); 
     }; 
     document.addEventListener('click', handleClickOutside); 
     return () => document.removeEventListener('click', handleClickOutside); 
   }, []); 
  
   // Menu Data Structure 
   const menuItems = [ 
     { 
       name: 'Home', 
       link: '/', 
       subMenu: null 
     }, 
     { 
       name: 'Corporate', 
       link: '#corporate', 
       subMenu: [ 
         { name: 'About Us', link: '/AboutUs.aspx' }, 
         { name: 'Core Team', link: '/Team.aspx' } 
       ] 
     }, 
     { 
       name: 'Our Services', 
       link: '#services', 
       subMenu: null 
     }, 
     { 
       name: 'Join Us', 
       link: '#', 
       subMenu: [ 
         { name: 'Join as a Printer (Wholesale Prices)', link: '/AddFranchise.aspx' }, 
         { name: 'Join as a Company (Corporate Benefits)', link: '/Default.aspx' } 
       ] 
     }, 
     { 
       name: 'Contact', 
       link: '#contact', 
       subMenu: null 
     }, 
     { 
       name: 'Branches', 
       link: '#branches', 
       subMenu: null 
     } 
   ]; 
  
   return ( 
     <header  
       id="header"  
       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${ 
         isSolid ? 'bg-white shadow-md py-2' : 'bg-transparent py-4' 
       }`} 
     > 
       <div
         className={`pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-blue-600 origin-top-left transition-all duration-300 ${isAtTop ? 'opacity-100 scale-x-100 scale-y-[0.3]' : 'opacity-0 scale-x-0 scale-y-[0.3]'}`}
       />
       <div className="container mx-auto px-4 md:px-8"> 
         <div className="flex justify-between items-center"> 
            
           {/* 1. Logo Section (Left) */} 
           <div className="flex-shrink-0"> 
             <Link to="/" className="flex items-center gap-2"> 
               <img  
                 src={logo}  
                 alt="BAGSCLUB"  
                 className="h-12 md:h-16 w-auto object-contain" 
               /> 
               <div className="flex flex-col">
                   <span className={`text-xl font-bold font-heading transition-colors duration-300 ${isSolid ? 'text-[#0d47a1]' : 'text-white'}`}>BAGSCLUB</span>
                   <span className={`text-[10px] font-medium tracking-wider transition-colors duration-300 ${isSolid ? 'text-gray-600' : 'text-white/80'}`}>No.1 Bag Printing Service</span>
                 </div>
             </Link> 
           </div> 
  
           {/* Right side: Navigation and Login */}
           <div className="hidden lg:flex items-center gap-12">
             {/* 2. Desktop Navigation */} 
             <nav className="flex items-center space-x-8"> 
               {menuItems.map((item, index) => ( 
                 <div  
                   key={index}  
                   className="relative group" 
                   onMouseEnter={() => item.subMenu && toggleDropdown(item.name)} 
                   onMouseLeave={() => item.subMenu && toggleDropdown(null)} 
                 > 
                   <a  
                     href={item.link}  
                     className={`text-sm font-bold uppercase tracking-wide hover:text-secondary transition-colors ${ 
                       isSolid ? 'text-black' : 'text-white' 
                     }`} 
                   > 
                     {item.name} 
                   </a> 
  
                   {/* Dropdown Menu */} 
                   {item.subMenu && ( 
                     <div  
                       className={`absolute top-full left-0 w-64 border-t-2 border-secondary shadow-xl rounded-b-md overflow-hidden transform transition-all duration-300 origin-top-left ${ 
                         activeDropdown === item.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none' 
                       } ${isSolid ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white'}`} 
                     > 
                       {item.subMenu.map((subItem, subIndex) => ( 
                         <a  
                           key={subIndex}  
                           href={subItem.link} 
                           className={`block px-4 py-3 text-sm transition-colors border-b last:border-0 font-bold ${ 
                             isSolid  
                               ? 'text-gray-800 hover:bg-gray-100 hover:text-secondary border-gray-100'  
                               : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-secondary border-gray-800' 
                           }`} 
                         > 
                           {subItem.name} 
                         </a> 
                       ))} 
                     </div> 
                   )} 
                 </div> 
               ))} 
             </nav> 
  
             {/* 3. Header Misc (Login Button) */} 
             <div className="flex items-center"> 
               {user ? (
                 <button 
                   onClick={logout}
                   className="bg-primary hover:bg-green-800 text-white text-sm font-bold py-2 px-6 rounded-full transition-colors"
                 >
                   Logout
                 </button>
               ) : (
                 <Link  
                   to="/login"  
                   className="bg-primary hover:bg-green-800 text-white text-sm font-bold py-2 px-6 rounded-full transition-colors" 
                 > 
                   Login 
                 </Link> 
               )}
             </div> 
           </div>
  
           {/* 4. Mobile Menu Trigger */} 
           <div className="lg:hidden flex items-center"> 
             <button  
               onClick={toggleMobileMenu} 
               className={`${isSolid ? 'text-black' : 'text-white'} focus:outline-none`} 
             > 
               <i className={`fas text-2xl ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i> 
             </button> 
           </div> 
         </div> 
       </div> 
  
       {/* 5. Mobile Menu Overlay */} 
       <div  
         className={`lg:hidden fixed inset-0 bg-[#1a1a1a] z-40 transform transition-transform duration-300 ease-in-out ${ 
           isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full' 
         }`} 
       > 
         <div className="flex flex-col h-full pt-20 px-6"> 
           {menuItems.map((item, index) => ( 
             <div key={index} className="border-b border-gray-800 py-4"> 
               <div className="flex justify-between items-center"> 
                 <a  
                   href={item.link}  
                   className="text-white text-lg font-bold uppercase" 
                   onClick={() => setIsMobileMenuOpen(false)} 
                 > 
                   {item.name} 
                 </a> 
                  
                 {item.subMenu && ( 
                   <button  
                     onClick={(e) => {
                       e.stopPropagation();
                       toggleDropdown(item.name);
                     }} 
                     className="text-gray-400" 
                   > 
                     <i className={`fas ${activeDropdown === item.name ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i> 
                   </button> 
                 )} 
               </div> 
  
               {/* Mobile Dropdown */} 
               {item.subMenu && ( 
                 <div className={`mt-2 pl-4 space-y-2 overflow-hidden transition-all duration-300 ${ 
                   activeDropdown === item.name ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0' 
                 }`}> 
                   {item.subMenu.map((subItem, subIndex) => ( 
                     <a  
                       key={subIndex}  
                       href={subItem.link} 
                       className="block text-gray-400 hover:text-secondary text-sm" 
                       onClick={() => setIsMobileMenuOpen(false)} 
                     > 
                       {subItem.name} 
                     </a> 
                   ))} 
                 </div> 
               )} 
             </div> 
           ))} 
            
           <div className="mt-auto pb-8"> 
             {user ? (
               <button 
                 onClick={logout}
                 className="block w-full text-center bg-primary text-white font-bold py-3 rounded-full hover:bg-green-800 transition-colors"
               >
                 Logout
               </button>
             ) : (
               <Link  
                 to="/login"  
                 className="block w-full text-center bg-primary text-white font-bold py-3 rounded-full hover:bg-green-800 transition-colors" 
                 onClick={() => setIsMobileMenuOpen(false)}
               > 
                 Login 
               </Link> 
             )}
           </div> 
         </div> 
       </div> 
     </header> 
   ); 
 }; 
  
 export default Header;
