import React, { useState, useEffect } from 'react';
import { Search, Loader2, Eye, AlertCircle, Package, Calendar, User, Info } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchOrder = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const performSearch = async (id) => {
    if (!id.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const { data } = await api.get(`/orders/search/${id.trim()}`);
      setOrder(data);
    } catch (err) {
      console.error('Search Error:', err);
      setError(err.response?.status === 404 ? 'No data found' : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setOrderId(id);
      performSearch(id);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Printing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Packaging': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Dispatched': return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-[#12286e] uppercase tracking-wider mb-2">Order Tracking</h1>
        <p className="text-gray-500 font-medium tracking-wide">Search and track your order status in real-time</p>
      </div>

      {/* Search Input Section */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="bg-white p-2 rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="flex-1 relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={22} />
              </div>
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your Order Number (e.g. ORD-12345)" 
                className="w-full pl-14 pr-6 py-5 bg-transparent text-lg font-bold text-[#12286e] placeholder:text-gray-300 focus:outline-none transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#1f73ff] hover:bg-blue-700 text-white px-10 py-5 rounded-[18px] font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-200 disabled:bg-gray-200 active:scale-95 flex items-center gap-2"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full">
        {error && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] shadow-sm border border-red-50 max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
            <div className="bg-red-50 p-6 rounded-full mb-6">
              <AlertCircle size={48} className="text-red-500" />
            </div>
            <p className="text-[#12286e] text-2xl font-black mb-2">{error}</p>
            <p className="text-gray-400 font-medium">Please verify the Order ID and try again.</p>
          </div>
        )}

        {order && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Details</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Date</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Status</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-8">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-50 p-3 rounded-2xl text-[#1f73ff]">
                            <Package size={24} />
                          </div>
                          <div>
                            <span className="block font-black text-[#12286e] text-lg mb-1">
                              #{order.orderId}
                            </span>
                            <span className="text-gray-400 font-bold text-sm">
                              {order.orderName || 'Guest Order'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-2 text-gray-600 font-bold">
                          <Calendar size={16} className="text-gray-400" />
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="space-y-1">
                          <span className="block text-[#12286e] font-black">{order.bagCategory}</span>
                          <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">{order.bagName}</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Dispatched' ? 'bg-green-500' : 'bg-current'} animate-pulse`}></div>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <button 
                          onClick={() => navigate(`/associate/order/detail/${order._id}`)}
                          className="inline-flex items-center gap-2 px-8 py-3 bg-[#12286e] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black hover:shadow-xl hover:shadow-blue-900/10 transition-all active:scale-95 group"
                        >
                          <Eye size={16} className="group-hover:scale-110 transition-transform" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Quick Info Tip */}
            <div className="mt-8 flex items-center justify-center gap-3 text-gray-400 text-sm font-medium">
              <div className="bg-gray-100 p-1.5 rounded-full">
                <Info size={14} />
              </div>
              Tip: Click "View Details" to see the production log and download attached assets.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOrder;
