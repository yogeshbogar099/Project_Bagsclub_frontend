import React from 'react';

const RegisterComplaint = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Register Complaint</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Brief description of the issue" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" rows="5" placeholder="Detailed explanation..."></textarea>
        </div>
        
        <div className="flex justify-end mt-4">
          <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-green-700 transition-colors font-bold">Submit Complaint</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterComplaint;
