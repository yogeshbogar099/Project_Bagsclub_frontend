import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import { Loader2, Eye } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8">
      {/* Product Categories */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary font-heading mb-2">Add New Order</h2>
        <p className="text-gray-600">Select a product category to continue</p>
        <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto mb-16">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={!product.comingSoon ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" } : {}}
            whileTap={!product.comingSoon ? { scale: 0.98 } : {}}
            className={`bg-white rounded-xl shadow-md overflow-hidden border flex flex-col h-full group transition-all duration-300 ${product.comingSoon ? 'cursor-not-allowed border-dashed border-gray-200 bg-gray-50/50' : 'cursor-pointer border-gray-100 hover:border-primary/20'}`}
            onClick={() => handleProductSelect(product)}
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className={`w-full h-full object-contain p-4 transition-all duration-500 ${!product.comingSoon ? 'group-hover:scale-110' : 'grayscale opacity-40 scale-95'}`}
                loading="lazy"
              />
              {product.comingSoon && (
                <div className="absolute top-0 right-0 z-10">
                  <div className="bg-[#ff3d00] text-white text-[10px] font-black px-3 py-1.5 rounded-bl-xl uppercase tracking-tighter shadow-md border-l border-b border-white/20">
                    Coming Soon
                  </div>
                </div>
              )}
              {!product.comingSoon && <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-[0.02] transition-opacity duration-300"></div>}
            </div>
            <div className="p-4 text-center flex-grow flex items-center justify-center">
              <h3 className={`font-semibold text-base transition-colors ${product.comingSoon ? 'text-gray-400' : 'text-gray-800 group-hover:text-primary'}`}>
                {product.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
          <div className="w-32 h-1 bg-secondary rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading recent orders...</p>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No recent orders found</p>
              <p className="text-gray-400 text-sm">When you place orders, they will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Order No.</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Order Name</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Order Detail</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-center">Current Status</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-bold text-primary bg-blue-50 px-2 py-1 rounded">
                          {order.orderId}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{order.bagCategory}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm space-y-0.5">
                          <p className="text-gray-800 font-medium">{order.bagName}</p>
                          <p className="text-gray-500 text-xs flex items-center gap-2">
                            <span>Size: {order.bagSize}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>Color: {order.bagColorType}</span>
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => navigate(`/associate/order/detail/${order._id}`)}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
                        >
                          <Eye size={14} />
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
