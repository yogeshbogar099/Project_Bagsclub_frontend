import React from 'react';

const OrderStage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Order Status</h2>
      
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
          <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white">
            <option value="">-- Select Product --</option>
            <option value="bag">Bag</option>
            <option value="shirt">Shirt</option>
            {/* Add more options */}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter Customer Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Customer Name" />
        </div>
        
        <button className="px-8 py-2 bg-primary text-white rounded-md hover:bg-green-700 transition-colors font-bold h-10">
          Search
        </button>
      </div>
    </div>
  );
};

export default OrderStage;
