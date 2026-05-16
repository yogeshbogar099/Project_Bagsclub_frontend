import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import { Loader2 } from 'lucide-react';
import OrderCarousel from '../../../components/OrderCarousel';
import RecentOrdersDashboard from '../../../components/RecentOrdersDashboard';
import nonWovenBag from '../../../assets/nonWovenBag.jpg';
import paperBag from '../../../assets/paperBag.jpg';
import plasticBag from '../../../assets/plasticBag_.jpg';
import hdpe from '../../../assets/hdpe.jpg';
import canvas from '../../../assets/canvas.jpg';

const AddOrder = () => {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const { data } = await api.get('/orders/recent');
        setRecentOrders(data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  const products = [
    { 
      id: 'non-woven', 
      name: 'Non-woven bags', 
      image: nonWovenBag
    },
    { 
      id: 'paper', 
      name: 'Paper bags', 
      image: paperBag,
      comingSoon: true
    },
    { 
      id: 'plastic', 
      name: 'Plastic bags', 
      image: plasticBag,
      comingSoon: true
    },
    { 
      id: 'hdpe', 
      name: 'HDPE bags', 
      image: hdpe,
      comingSoon: true
    },
    { 
      id: 'canvas', 
      name: 'Canvas bags', 
      image: canvas,
      comingSoon: true
    },
  ];

  const handleProductSelect = (product) => {
    if (product.comingSoon) return;
    if (product.id === 'non-woven') {
      navigate('/associate/financial/non-woven');
    } else {
      console.log('Selected product:', product.name);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Printing': return 'bg-blue-100 text-blue-800';
      case 'Packaging': return 'bg-yellow-100 text-yellow-800';
      case 'Dispatched': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="w-full bg-[#f9f9f9] min-h-screen pb-20">
      {/* Carousel below Navbar */}
      <OrderCarousel />

      <div className="container mx-auto px-4 py-10">
        {/* Product Categories */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#12286e] font-heading mb-3 uppercase tracking-wider">Add New Order</h2>
          <div className="w-24 h-1 bg-[#12286e] mx-auto rounded-full"></div>
        </div>
      
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 max-w-6xl mx-auto mb-24">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={!product.comingSoon ? { y: -8 } : {}}
              whileTap={!product.comingSoon ? { scale: 0.98 } : {}}
              className={`flex flex-col items-center transition-all duration-300 ${product.comingSoon ? 'cursor-not-allowed' : 'cursor-pointer group'}`}
              onClick={() => handleProductSelect(product)}
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-white shadow-md border border-gray-100 relative mb-4 rounded-xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${!product.comingSoon ? 'group-hover:scale-110' : 'opacity-90 grayscale-[0.3]'}`}
                  loading="lazy"
                />
                
                {/* Coming Soon Overlay */}
                {product.comingSoon && (
                  <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                    <div className="bg-[#ff0000] text-white text-[12px] md:text-[14px] font-black w-20 h-20 md:w-[90px] md:h-[90px] rounded-full flex flex-col items-center justify-center text-center shadow-2xl border-2 border-white leading-tight uppercase">
                      <span>Coming</span>
                      <span>Soon</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Container */}
              <div className="text-center w-full px-1">
                <h3 className={`text-[14px] md:text-[18px] font-black tracking-normal uppercase transition-colors leading-tight ${product.comingSoon ? 'text-gray-400' : 'text-[#12286e] group-hover:text-blue-900'}`}>
                  {product.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders Dashboard */}
        <RecentOrdersDashboard orders={recentOrders} loading={loading} />
      </div>
    </div>
  );
};

export default AddOrder;
