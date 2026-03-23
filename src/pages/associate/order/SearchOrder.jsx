import React, { useState } from 'react';
import { Search, Loader2, Eye, AlertCircle } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const { data } = await api.get(`/orders/search/${orderId.trim()}`);
      setOrder(data);
    } catch (err) {
      console.error('Search Error:', err);
      setError(err.response?.status === 404 ? 'No data found' : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
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
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Search Input Section */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 uppercase tracking-wide">Search Order</h2>
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Search by Order No." 
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary pr-14 text-lg transition-all focus:ring-4 focus:ring-green-50"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-2.5 rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-300"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Search size={24} />}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full">
        {error && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-sm border border-red-100 max-w-4xl mx-auto">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <p className="text-gray-600 text-xl font-bold">{error}</p>
            <p className="text-gray-400 mt-2 text-sm">Please check the Order ID and try again.</p>
          </div>
        )}

        {order && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Order No.</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Order Name</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Order Detail</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider text-center">Current Status</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <span className="font-mono text-sm font-bold text-primary bg-blue-50 px-3 py-1.5 rounded-lg">
                        {order.orderId}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-5 font-semibold text-gray-800">{order.bagCategory}</td>
                    <td className="px-6 py-5">
                      <div className="text-sm space-y-1">
                        <p className="text-gray-800 font-bold">{order.bagName}</p>
                        <p className="text-gray-500 text-xs flex items-center gap-2">
                          <span>Size: {order.bagSize}</span>
                          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                          <span>Color: {order.bagColorType}</span>
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${getStatusColor(order.status)} shadow-sm`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button 
                        onClick={() => navigate(`/associate/order/detail/${order._id}`)}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                      >
                        <Eye size={16} />
                        Detail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOrder;
