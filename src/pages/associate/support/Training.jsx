import React from 'react';

const Training = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Instructions & Training Videos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
           <span className="text-gray-500">Video Placeholder</span>
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
           <span className="text-gray-500">Video Placeholder</span>
        </div>
      </div>
    </div>
  );
};

export default Training;
