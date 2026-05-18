import React, { useState, useEffect } from 'react'; 
import Carousal_one from '../assets/Carousal_image.jpeg';
import Carousal_two from '../assets/Carousal_two.jpeg';
 
 const Hero = () => { 
   const [currentSlide, setCurrentSlide] = useState(0); 
   const [isAnimating, setIsAnimating] = useState(false); 
 
   // Slide Data 
   const slides = [ 
     { 
       id: 1, 
       bgImage: Carousal_one, 
       title: 'Bags Club', 
       subtitle: 'Group of Companies', 
       details: [ 
         'Bags Club of India Limited', 
         'Bags Club Expo Private Limited', 
         'Bags Club Today Private Limited' 
       ], 
       description: "We're dedicated for development of printing Industry." 
     }, 
     { 
       id: 2, 
       bgImage: Carousal_two, 
       title: '', 
       subtitle: '', 
       details: [], 
       description: '' 
     } 
   ]; 
 
   // Auto-play functionality 
   useEffect(() => { 
     const timer = setInterval(() => { 
       handleNext(); 
     }, 5000); // 5 seconds per slide 
 
     return () => clearInterval(timer); 
   }, [currentSlide]); 
 
   // Navigation Handlers 
   const handleNext = () => { 
     if (isAnimating) return; 
     setIsAnimating(true); 
     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1)); 
     setTimeout(() => setIsAnimating(false), 1000); // Wait for animation 
   }; 
 
   const handlePrev = () => { 
     if (isAnimating) return; 
     setIsAnimating(true); 
     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1)); 
     setTimeout(() => setIsAnimating(false), 1000); 
   }; 
 
   const goToSlide = (index) => { 
     if (isAnimating) return; 
     setIsAnimating(true); 
     setCurrentSlide(index); 
     setTimeout(() => setIsAnimating(false), 1000); 
   }; 
 
   // Accessibility: Keyboard Navigation
   useEffect(() => {
     const handleKeyDown = (e) => {
       if (e.key === 'ArrowLeft') handlePrev();
       if (e.key === 'ArrowRight') handleNext();
     };
     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
   }, [currentSlide, isAnimating]);
 
   // Scroll to content 
   const scrollToContent = () => { 
     const content = document.getElementById('services'); 
     if (content) { 
       const headerOffset = 80; 
       const elementPosition = content.getBoundingClientRect().top; 
       const offsetPosition = elementPosition + window.pageYOffset - headerOffset; 
 
       window.scrollTo({ 
         top: offsetPosition, 
         behavior: "smooth" 
       }); 
     } 
   }; 
 
   return ( 
     <section 
       id="slider" 
       className="relative w-full h-screen overflow-hidden bg-black" 
     > 
       {/* Slides Container */} 
       <div className="relative w-full h-full"> 
         {slides.map((slide, index) => ( 
           <div 
             key={slide.id} 
             className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${ 
               index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0' 
             }`} 
           > 
             {/* Parallax Background */} 
             <div 
               className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear" 
               style={{ 
                 backgroundImage: `url(${slide.bgImage})`, 
                 transform: index === currentSlide ? 'scale(1.15)' : 'scale(1)' // Ken Burns Effect
               }} 
             > 
               {/* Bright & Vibrant Overlay - adjusted for visual appeal */} 
               <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div> 
             </div> 
 
             {/* Content Container */} 
             <div className="relative z-10 h-full flex items-center justify-center text-center px-4"> 
               <div className="max-w-4xl mx-auto text-white"> 
                 
                 {/* Main Title */} 
                 <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}> 
                   {slide.title} 
                 </h2> 
 
                 {/* Subtitle */} 
                 {slide.subtitle && ( 
                   <h3 className="text-xl md:text-3xl uppercase tracking-widest mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}> 
                     {slide.subtitle} 
                   </h3> 
                 )} 
 
                 {/* Details List */} 
                 {slide.details.map((detail, idx) => ( 
                   <h4 
                     key={idx} 
                     className="text-lg md:text-xl mb-2 animate-fade-in-up" 
                     style={{ animationDelay: `${0.4 + (idx * 0.4)}s` }} 
                   > 
                     {detail} 
                   </h4> 
                 ))} 
 
                 {/* Description */} 
                 {slide.description && ( 
                   <p className="text-base md:text-lg mt-6 animate-fade-in-up" style={{ animationDelay: '1.5s' }}> 
                     {slide.description} 
                   </p> 
                 )} 
               </div> 
             </div> 
           </div> 
         ))} 
       </div> 
 
       {/* Navigation Arrows */} 
       <button 
         onClick={handlePrev} 
         className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-secondary transition-colors p-2 bg-black/20 rounded-full" 
         aria-label="Previous Slide" 
       > 
         <i className="fas fa-angle-left text-3xl"></i> 
       </button> 
 
       <button 
         onClick={handleNext} 
         className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-secondary transition-colors p-2 bg-black/20 rounded-full" 
         aria-label="Next Slide" 
       > 
         <i className="fas fa-angle-right text-3xl"></i> 
       </button> 
 
       {/* Slide Indicators */}
       <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
         {slides.map((_, index) => (
           <button
             key={index}
             onClick={() => goToSlide(index)}
             className={`w-3 h-3 rounded-full transition-all duration-300 ${
               index === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
             }`}
             aria-label={`Go to slide ${index + 1}`}
           />
         ))}
       </div>

       {/* Scroll Down Indicator */} 
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"> 
         <button 
           onClick={scrollToContent} 
           className="text-white hover:text-secondary transition-colors animate-bounce" 
           aria-label="Scroll Down" 
         > 
           <i className="fas fa-angle-down text-3xl"></i> 
         </button> 
       </div> 
 
       {/* Custom Animation Styles */} 
       <style>{` 
         @keyframes fadeInUp { 
           from { 
             opacity: 0; 
             transform: translateY(30px); 
           } 
           to { 
             opacity: 1; 
             transform: translateY(0); 
           } 
         } 
         .animate-fade-in-up { 
           animation: fadeInUp 1s ease-out forwards; 
           opacity: 0; /* Start hidden */ 
         } 
       `}</style> 
     </section> 
   ); 
 }; 
 
 export default Hero;