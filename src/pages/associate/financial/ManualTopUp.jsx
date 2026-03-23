import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const ManualTopUp = () => {
  const [amount, setAmount] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (showQr && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && showQr) {
      setIsExpired(true);
      setShowQr(false);
    }
    return () => clearInterval(interval);
  }, [showQr, timer]);

  const handleGenerateQr = () => {
    if (amount > 0) {
      // Replace with your actual UPI details
      const upiString = `upi://pay?pa=bagsclub@hdfcbank&pn=BAGSCLUB&am=${amount}&cu=INR`;
      setQrValue(upiString);
      setShowQr(true);
      setTimer(600); 
      setIsExpired(false);
    }
  };

  const handleChangeAmount = () => {
    setShowQr(false);
    setIsExpired(false);
    setTimer(600);
    setAmount('');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Manual Wallet Top-up</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: Amount input */}
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter Amount</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter amount to add"
            disabled={showQr && !isExpired}
          />
          
          {(!showQr || isExpired) ? (
            <button 
              onClick={handleGenerateQr}
              className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-green-700 transition-colors font-bold"
            >
              {isExpired ? 'Regenerate QR Code' : 'Generate QR Code'}
            </button>
          ) : (
            <button 
              onClick={handleChangeAmount}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors font-bold"
            >
              Change Amount
            </button>
          )}

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
            <h4 className="font-bold text-yellow-800 mb-1">Important Instructions:</h4>
            <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
              <li>Enter the amount and click Generate.</li>
              <li>Scan the QR code with any UPI app.</li>
              <li>QR is valid for 10 minutes.</li>
              <li>Send transaction screenshot to support for manual update.</li>
            </ol>
          </div>
        </div>

        {/* Right side: QR code display */}
        {showQr && !isExpired && (
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
              <QRCodeSVG value={qrValue} size={256} level="H" includeMargin={true} />
            </div>
            <p className="mt-2 text-lg font-bold text-blue-600">₹ {amount}</p>
            <p className="text-red-500 font-bold">Expires in: {formatTime(timer)}</p>
            
            <div className="flex items-center justify-center gap-4 mt-6 opacity-80 grayscale">
              <span className="font-bold text-sm">BHIM</span>
              <span className="font-bold text-sm">PhonePe</span>
              <span className="font-bold text-sm">GPay</span>
              <span className="font-bold text-sm">Paytm</span>
              <span className="font-bold text-sm">UPI</span>
            </div>
          </div>
        )}

        {/* Expiry Prompt */}
        {isExpired && !showQr && (
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-red-50 border border-red-100 rounded-xl">
             <p className="text-red-600 font-bold text-lg mb-2">QR Code Expired</p>
             <p className="text-gray-600 text-sm text-center">The 10-minute validity period has ended. Please regenerate the QR code to proceed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualTopUp;
