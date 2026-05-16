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
      name: 'D-CUT BAG', 
      image: D_cut
    },
    { 
      id: 'loop', 
      name: 'LOOP BAG', 
      image: Loop
    },
    { 
      id: 'box', 
      name: 'BOX BAG', 
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
    <div className="w-full bg-[#f9f9f9] min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#12286e] font-heading mb-2 uppercase tracking-tight">Non-Woven Bag Categories</h2>
          <div className="w-24 h-1 bg-[#12286e] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 max-w-6xl mx-auto">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleCategorySelect(category)}
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-white shadow-md border border-gray-100 relative mb-4 rounded-xl">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="text-center px-1">
                <h3 className="text-[14px] md:text-[18px] font-black tracking-normal uppercase text-[#12286e] group-hover:text-blue-900 transition-colors leading-tight">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-[#12286e] rounded-lg shadow-sm transition-all font-bold text-sm uppercase tracking-wider"
          >
            Back to Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonWovenBags;
