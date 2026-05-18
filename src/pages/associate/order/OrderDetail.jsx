import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import { 
  Loader2, ArrowLeft, Tag, Folder, List, 
  History, FileText, CheckCircle2
} from 'lucide-react';

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium text-lg">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm m-4">
        <p className="text-gray-500 text-lg mb-6">Order not found</p>
        <button 
          onClick={() => navigate(-1)} 
          className="text-primary font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 font-bold group"
        >
          <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft size={18} />
          </div>
          Back to Orders
        </button>

        <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden p-8 sm:p-12">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">ORDER</span>
                <h2 className="text-4xl font-black text-[#12286e] tracking-tight">
                  #{order.orderId || '101639'}
                </h2>
              </div>
              <p className="text-[#12286e] font-bold text-lg opacity-80">
                {order.orderName || 'ok'}
              </p>
            </div>
            <div className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-blue-100 bg-blue-50/50 text-[#1f73ff] text-xs font-black uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-[#1f73ff] animate-pulse"></div>
              {order.status || 'DISPATCHED'}
            </div>
          </div>

          {/* Product & Details Bar */}
          <div className="bg-[#fff5f6] border border-[#ffe4e6] rounded-[20px] p-5 sm:p-6 mb-12 flex items-start sm:items-center gap-5 group hover:bg-[#fff1f2] transition-colors duration-300">
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-red-50 text-red-500">
              <Tag size={24} className="fill-current opacity-20" />
              <Tag size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <span className="text-[#e11d48] font-black uppercase tracking-[0.2em] text-[10px] block mb-1">
                PRODUCT & DETAILS
              </span>
              <p className="text-[#881337] font-bold text-base sm:text-lg leading-snug">
                {order.bagCategory || 'GARMENTS TAGS'}, {order.bagName || 'MATT'}, {order.orderType || 'N/A'}, 
                Size:{order.bagSize || 'N/A'}; 
                Bag Color:{order.bagColor || 'N/A'}; 
                Text Color Type:{order.colorType || 'N/A'}; 
                Text Colors:{order.textColors?.join(', ') || 'N/A'}; 
                Qty.:{order.quantity || '0'}; 
                Privacy Packing:{order.privacy ? 'Required' : 'Not Required'};
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Attached Assets */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-500">
                  <Folder size={20} />
                </div>
                <h3 className="text-lg font-black text-[#12286e] uppercase tracking-wider">
                  ATTACHED ASSETS
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {order.fileUrl ? (
                  <div className="group relative bg-gray-50 rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 aspect-square">
                    <img 
                      src={`${import.meta.env.VITE_API_BASE_URL}${order.fileUrl}`} 
                      alt="Asset" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <a 
                        href={`${import.meta.env.VITE_API_BASE_URL}${order.fileUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white p-3 rounded-full text-gray-900 hover:scale-110 transition-transform shadow-lg"
                      >
                        <FileText size={20} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-full py-16 px-8 rounded-[24px] border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center text-center">
                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                      <FileText size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-bold">No assets attached to this order</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Specifications */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-purple-50 p-2 rounded-lg text-purple-500">
                  <List size={20} />
                </div>
                <h3 className="text-lg font-black text-[#12286e] uppercase tracking-wider">
                  ORDER SPECIFICATIONS
                </h3>
              </div>

              <div className="bg-gray-50/50 rounded-[28px] p-2 border border-gray-100">
                <div className="space-y-1">
                  {[
                    { label: 'Ordered By', value: order.orderedBy || 'Sandeep Printers (MID - 9305)', color: 'text-purple-600' },
                    { label: 'Order For', value: order.orderFor || 'For Self' },
                    { label: 'Delivery', value: order.deliveryOption || 'Dispatch By Transport' },
                    { label: 'File Option', value: order.fileOption || 'N/A' },
                    { label: 'Valid PDF Discount', value: order.pdfDiscount || '0.00' },
                    { label: 'Order Date', value: new Date(order.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) },
                    { label: 'Payable Amount', value: `Rs. ${order.totalAmount?.toFixed(2) || '0.00'}/-`, color: 'text-emerald-500' },
                    { label: 'Selling Price', value: `Rs. ${order.sellingPrice?.toFixed(2) || '0.00'}/-` },
                    { label: 'Invoice', value: order.invoiceNo || order.orderId?.split('-')[1] || 'N/A', color: 'text-indigo-500' },
                  ].map((item, idx, arr) => (
                    <div 
                      key={idx} 
                      className={`flex justify-between items-center px-6 py-4 rounded-2xl transition-colors hover:bg-white hover:shadow-sm ${idx !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <span className="text-gray-400 font-bold text-sm tracking-wide">{item.label}</span>
                      <span className={`font-black text-sm text-right ${item.color || 'text-[#12286e]'}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-16 flex flex-wrap justify-end gap-4">
            <button 
              onClick={() => navigate(`/associate/order/tracking/${id}`)}
              className="flex items-center gap-3 px-8 py-3.5 bg-indigo-500 text-white font-black text-sm rounded-2xl hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95 uppercase tracking-widest"
            >
              <History size={18} />
              Production Log
            </button>
            <button className="flex items-center gap-3 px-8 py-3.5 bg-[#12286e] text-white font-black text-sm rounded-2xl hover:bg-black hover:shadow-xl hover:shadow-blue-900/20 transition-all active:scale-95 uppercase tracking-widest">
              <FileText size={18} />
              File History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

