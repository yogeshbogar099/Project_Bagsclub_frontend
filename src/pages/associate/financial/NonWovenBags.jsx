import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import D_cut from '../../../assets/d_Cut.jpg'
import Loop from '../../../assets/loop.jpg'
import Box from '../../../assets/boxBagjpg.jpg'

const NonWovenBags = () => {
  const navigate = useNavigate();

  const categories = [
    { 
      id: 'd-cut', 
      name: 'D-Cut Bag', 
      image: D_cut
    },
    { 
      id: 'loop', 
      name: 'Loop Bag', 
      image: Loop
    },
    { 
      id: 'box', 
      name: 'Box Bag', 
      image: Box
    },
  ];

  const handleCategorySelect = (category) => {
    if (category.id === 'd-cut') {
      navigate('/associate/add-order/d-cut-bag');
    } else if (category.id === 'loop') {
      navigate('/associate/add-order/loop-bag');
    } else if (category.id === 'box') {
      navigate('/associate/add-order/box-bag');
    } else {
      console.log('Selected category:', category.name);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary font-heading mb-2">Non-Woven Bag Categories</h2>
        <p className="text-gray-600">Select a specific bag type to continue</p>
        <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border border-gray-100 flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-sm group"
            onClick={() => handleCategorySelect(category)}
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-[0.02] transition-opacity duration-300"></div>
            </div>
            <div className="p-5 text-center flex-grow flex items-center justify-center">
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors font-semibold"
        >
          Back to Categories
        </button>
      </div>
    </div>
  );
};

export default NonWovenBags;
