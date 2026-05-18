import React, { useState, useEffect } from 'react';
import { Search, Loader2, Eye, AlertCircle, Mail } from 'lucide-react';
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

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-bold text-[#1e40af] uppercase tracking-wider mb-2">RECENT ORDERS</h2>
      </div>

      {/* Search Input Section */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Search Order Number..." 
                className="w-full pl-12 pr-4 py-3 bg-transparent text-base font-semibold text-gray-700 focus:outline-none"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#1f73ff] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-all disabled:bg-gray-200"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full overflow-hidden">
        {error && (
          <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <AlertCircle size={40} className="text-red-400 mb-4" />
            <p className="text-gray-600 text-lg font-bold">{error}</p>
          </div>
        )}

        {order && (
          <div className="border border-gray-300 shadow-lg bg-white overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider border-r border-gray-700">ORDER NO.</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider border-r border-gray-700">DATE</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider border-r border-gray-700">ORDER NAME</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider border-r border-gray-700">ORDER DETAIL</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider border-r border-gray-700">CURRENT STATUS</th>
                  <th className="px-2 py-4 border-r border-gray-700"></th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="px-4 py-5 border-r border-gray-200 font-medium">
                    {order.orderId}
                  </td>
                  <td className="px-4 py-5 border-r border-gray-200">
                    {new Date(order.createdAt).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    }).replace(',', '')}
                  </td>
                  <td className="px-4 py-5 border-r border-gray-200">
                    {order.orderName || 'ok'}
                  </td>
                  <td className="px-4 py-5 border-r border-gray-200">
                    <div className="max-w-[300px] mx-auto truncate">
                      {order.bagName}, {order.orderType}, {order.quantity}
                    </div>
                  </td>
                  <td className="px-4 py-5 border-r border-gray-200 font-medium">
                    {order.status}
                  </td>
                  <td className="px-2 py-5 border-r border-gray-200 text-center">
                    <div className="flex justify-center">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" 
                        alt="Gmail" 
                        className="w-6 h-6 opacity-80"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <button 
                      onClick={() => navigate(`/associate/order/detail/${order._id}`)}
                      className="px-5 py-1.5 bg-[#28a745] text-white rounded-md text-[13px] font-bold italic hover:bg-green-700 transition-all shadow-sm flex items-center justify-center gap-1 mx-auto"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOrder;
