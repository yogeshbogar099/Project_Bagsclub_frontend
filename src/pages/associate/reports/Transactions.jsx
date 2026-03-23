import React from 'react';

const Transactions = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Account Statement (Current Month/Year)</h2>
      
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input type="date" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input type="date" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        
        <button className="px-8 py-2 bg-primary text-white rounded-md hover:bg-green-700 transition-colors font-bold h-10">
          Show
        </button>
      </div>
    </div>
  );
};

export default Transactions;
