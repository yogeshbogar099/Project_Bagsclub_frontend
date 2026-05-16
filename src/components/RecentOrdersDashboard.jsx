import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

const RecentOrdersDashboard = ({ orders = [], loading = false }) => {
  const navigate = useNavigate();

  // If no orders are provided and not loading, show dummy data to match the PNG reference
  const dummyOrders = [
    {
      orderNo: '101639',
      date: 'May 1 2026 7:07PM',
      orderName: 'ok',
      orderDetail: 'Matt Lamination Tags, 1, 4000',
      status: 'Dispatched'
    },
    {
      orderNo: '76315',
      date: 'Apr 22 2026 5:51PM',
      orderName: 'ok',
      orderDetail: '500 GSM + Velvet + UV + Foil, 500, Gold',
      status: 'Dispatched'
    },
    {
      orderNo: '23075',
      date: 'Apr 6 2026 1:24PM',
      orderName: 'ok',
      orderDetail: 'Laser Printed Pens , 1, 1',
      status: 'Cancelled'
    },
    {
      orderNo: '23073',
      date: 'Apr 6 2026 1:24PM',
      orderName: 'ok',
      orderDetail: 'Laser Printed Pens , 1, 1',
      status: 'Cancelled'
    },
    {
      orderNo: '23063',
      date: 'Apr 6 2026 1:23PM',
      orderName: 'ok',
      orderDetail: 'Laser Printed Pens , 1, 1',
      status: 'Cancelled'
    },
    {
      orderNo: '23060',
      date: 'Apr 6 2026 1:22PM',
      orderName: 'ok',
      orderDetail: 'Laser Printed Pens , 1, 1',
      status: 'Cancelled'
    }
  ];

  const data = orders.length > 0 ? orders : dummyOrders;

  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Centered Heading */}
        <h2 className="text-center text-[#1e40af] text-3xl font-bold uppercase mb-8 tracking-wide">
          RECENT ORDERS
        </h2>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-gray-400 px-4 py-3 text-sm font-bold uppercase text-center whitespace-nowrap">
                  ORDER NO.
                </th>
                <th className="border border-gray-400 px-4 py-3 text-sm font-bold uppercase text-center whitespace-nowrap">
                  DATE
                </th>
                <th className="border border-gray-400 px-4 py-3 text-sm font-bold uppercase text-center whitespace-nowrap">
                  ORDER NAME
                </th>
                <th className="border border-gray-400 px-4 py-3 text-sm font-bold uppercase text-center whitespace-nowrap">
                  ORDER DETAIL
                </th>
                <th className="border border-gray-400 px-4 py-3 text-sm font-bold uppercase text-center whitespace-nowrap">
                  CURRENT STATUS
                </th>
                <th className="border border-gray-400 px-2 py-3 w-16"></th>
                <th className="border border-gray-400 px-4 py-3 w-28"></th>
              </tr>
            </thead>
            <tbody className="bg-[#f2f2f2]">
              {data.map((order, index) => (
                <tr 
                  key={order._id || index} 
                  className="hover:bg-gray-200 transition-colors duration-200"
                >
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-800 font-medium">
                    {order.orderId || order.orderNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">
                    {order.date || new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">
                    {order.bagCategory || order.orderName}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-600 italic">
                    {order.bagName || order.orderDetail}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-800 font-semibold">
                    {order.status}
                  </td>
                  <td className="border border-gray-300 px-2 py-3 text-center">
                    <div className="flex justify-center">
                      <Mail 
                        size={22} 
                        className="text-red-500 fill-red-500/10 cursor-pointer hover:scale-110 transition-transform" 
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <button 
                      onClick={() => order._id && navigate(`/associate/order/detail/${order._id}`)}
                      className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-xs font-bold italic px-3 py-1.5 rounded-[4px] shadow-sm transition-all active:scale-95"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersDashboard;
