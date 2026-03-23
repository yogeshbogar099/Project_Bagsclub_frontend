import React from 'react';

const Staff = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Create / Manage Staff Login</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter Mobile No.</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="10-digit mobile number" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter password" />
        </div>
        
        <div className="flex justify-end mt-6">
          <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-green-700 transition-colors font-bold">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Staff;
