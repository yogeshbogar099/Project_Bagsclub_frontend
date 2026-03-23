import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Banknote } from 'lucide-react';

const AddMoney = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Select Payment Option</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Automatic Wallet Top-Up */}
        <div 
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden relative group cursor-pointer"
          onClick={() => navigate('/associate/financial/automatic-topup')}
        >
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            New Launch
          </div>
          <div className="p-8 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <QrCode size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Automatic Wallet Top-Up</h3>
            <p className="text-gray-600 mb-2">Generate and scan a QR code online.</p>
            <p className="text-green-600 font-medium">Payment is instantly updated in your wallet.</p>
          </div>
        </div>
        
        {/* Card 2: Manual Wallet Top-Up */}
        <div 
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden group cursor-pointer"
          onClick={() => navigate('/associate/financial/manual-topup')}
        >
          <div className="p-8 flex flex-col items-center text-center h-full">
             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Banknote size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Manual Wallet Top-Up</h3>
            <p className="text-gray-600 mb-2">Transfer to our bank account</p>
            <p className="text-gray-500 text-sm mt-4">Send Screenshot to our Accounts Department to update your Wallet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMoney;
