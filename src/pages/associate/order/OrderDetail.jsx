import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../../utils/api';
import { Loader2, ArrowLeft, Calendar, Tag, Package, Truck, Printer, Info } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Printing': return <Printer className="w-5 h-5" />;
      case 'Packaging': return <Package className="w-5 h-5" />;
      case 'Dispatched': return <Truck className="w-5 h-5" />;
      case 'Completed': return <Truck className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Printing': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Packaging': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'Dispatched': return 'text-green-600 bg-green-50 border-green-100';
      case 'Completed': return 'text-gray-600 bg-gray-50 border-gray-100';
      default: return 'text-orange-600 bg-orange-50 border-orange-100';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Order not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6 font-bold"
      >
        <ArrowLeft size={20} />
        Back to Orders
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Order #{order.orderId}
            </h2>
            <p className="text-green-100 text-sm mt-1 flex items-center gap-2">
              <Calendar size={14} />
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 bg-white ${getStatusColor(order.status)} shadow-sm`}>
            {getStatusIcon(order.status)}
            {order.status}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Product Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Tag size={16} />
                  Product Category
                </h3>
                <p className="text-xl font-bold text-gray-800">{order.bagCategory}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Package size={16} />
                  Bag Details
                </h3>
                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Name</span>
                    <span className="font-bold text-gray-800">{order.bagName}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Size</span>
                    <span className="font-bold text-gray-800">{order.bagSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Color Type</span>
                    <span className="font-bold text-gray-800">{order.bagColorType}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Status Tracker */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Order Status Tracking</h3>
              <div className="relative pl-8 space-y-12">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                {['Printing', 'Packaging', 'Dispatched'].map((step, index) => {
                  const isCompleted = ['Printing', 'Packaging', 'Dispatched', 'Completed'].indexOf(order.status) >= index;
                  const isCurrent = order.status === step;

                  return (
                    <div key={step} className="relative flex items-center gap-4">
                      {/* Circle */}
                      <div className={`absolute -left-[29px] w-6 h-6 rounded-full border-4 border-white z-10 ${
                        isCompleted ? 'bg-primary' : 'bg-gray-200'
                      } ${isCurrent ? 'ring-4 ring-green-50 animate-pulse' : ''}`}></div>
                      
                      <div className={`flex flex-col ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                        <span className={`font-bold ${isCurrent ? 'text-primary' : ''}`}>{step}</span>
                        <span className="text-xs">
                          {isCompleted ? `Completed ${step} phase` : `Waiting for ${step.toLowerCase()}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
             <div className="flex items-center gap-2 text-gray-400 text-sm">
               <Info size={16} />
               Need help with this order? Contact our support team.
             </div>
             <button className="px-8 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl w-full md:w-auto">
               Raise a Ticket
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
