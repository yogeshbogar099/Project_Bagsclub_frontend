import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Loader2, ArrowLeft, Clock, User, 
  CheckCircle2, Package, Truck, ClipboardList, Settings 
} from 'lucide-react';
import api from '../../../utils/api';

const ProductionLog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderTracking = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching tracking log:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderTracking();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed': return <ClipboardList className="w-5 h-5" />;
      case 'Printing': return <Settings className="w-5 h-5 animate-spin-slow" />;
      case 'Packaging': return <Package className="w-5 h-5" />;
      case 'Dispatched': return <Truck className="w-5 h-5" />;
      case 'Completed': return <CheckCircle2 className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-blue-500 border-blue-500 bg-blue-50';
      case 'Printing': return 'text-orange-500 border-orange-500 bg-orange-50';
      case 'Packaging': return 'text-purple-500 border-purple-500 bg-purple-50';
      case 'Dispatched': return 'text-green-500 border-green-500 bg-green-50';
      case 'Completed': return 'text-emerald-500 border-emerald-500 bg-emerald-50';
      default: return 'text-gray-500 border-gray-500 bg-gray-50';
    }
  };

  const getDotColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-600';
      case 'Printing': return 'bg-orange-600';
      case 'Packaging': return 'bg-purple-600';
      case 'Dispatched': return 'bg-green-600';
      case 'Completed': return 'bg-emerald-600';
      default: return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium text-lg">Loading tracking information...</p>
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
          Back to Order Details
        </button>

        <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-10 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-xl font-black text-[#1e40af] uppercase tracking-[0.2em]">TRACKING LOG</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300 font-bold text-lg uppercase tracking-widest">ORDER #</span>
              <span className="text-3xl font-black text-[#12286e] tracking-tight">{order.orderId}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-16">
            <div className="relative pl-12 space-y-10">
              {/* Vertical Line */}
              <div className="absolute left-[15px] top-6 bottom-6 w-[2px] bg-gray-100"></div>

              {order.trackingLog && order.trackingLog.length > 0 ? (
                order.trackingLog.map((log, index) => (
                  <div key={index} className="relative animate-in slide-in-from-left-6 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[45px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full border-[4px] border-white shadow-md z-10 ${getDotColor(log.status)} ring-4 ring-white`}></div>
                    
                    {/* Log Card */}
                    <div className={`flex flex-col lg:flex-row items-stretch lg:items-center p-1.5 rounded-[24px] border-l-[6px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 group ${getStatusColor(log.status)}`}>
                      
                      {/* Status & Icon */}
                      <div className="flex items-center gap-6 px-8 py-6 min-w-[280px]">
                        <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-500">
                          {getStatusIcon(log.status)}
                        </div>
                        <span className="font-black text-base uppercase tracking-widest text-[#12286e]">
                          {log.message || log.status}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="hidden lg:block w-[1px] h-12 bg-gray-100"></div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-3 px-10 py-6 text-gray-400 font-bold text-sm whitespace-nowrap bg-gray-50/30 lg:bg-transparent">
                        <Clock size={16} className="text-gray-300" />
                        {new Date(log.timestamp).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true
                        }).replace(',', '')}
                      </div>

                      {/* Divider */}
                      <div className="hidden lg:block w-[1px] h-12 bg-gray-100"></div>

                      {/* Message & Operator */}
                      <div className="flex-1 px-10 py-6 bg-gray-50/50 rounded-r-[20px] lg:border-l border-gray-100 flex items-center justify-between gap-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-[#12286e] font-bold text-sm opacity-60">
                            System Log Entry — <span className="text-[#12286e] font-black opacity-100">{log.operator || 'System'}</span>
                          </span>
                          {log.status === 'Printing' && (
                            <button className="text-red-500 font-black text-[11px] uppercase tracking-[0.2em] mt-1 hover:underline text-left">
                              Show Detailed Status
                            </button>
                          )}
                        </div>
                        <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                          <User size={18} className="text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-32 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <ClipboardList size={40} className="text-gray-200" />
                  </div>
                  <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-sm">No tracking records found</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="px-8 py-10 bg-gray-50/30 border-t border-gray-50 text-center">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
              This is an automated production log. For queries, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionLog;