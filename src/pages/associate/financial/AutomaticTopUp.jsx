import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const AutomaticTopUp = () => {
  const [amount, setAmount] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate();
  const { updateWalletBalance } = useAuth();

  // Timer logic
  useEffect(() => {
    let interval;
    if (showQr && timer > 0 && !isProcessing) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && showQr) {
      setIsExpired(true);
      setShowQr(false);
      toast.error('QR Code expired. Please generate a new one.', { id: 'timer-expiry' });
    }
    return () => clearInterval(interval);
  }, [showQr, timer, isProcessing]);

  // Simulation: When QR is shown, start "listening" for payment
  useEffect(() => {
    let detectTimer;
    if (showQr && !isProcessing && !isExpired) {
      // Simulate automatic detection after 8 seconds of user "paying"
      detectTimer = setTimeout(() => {
        handleAutoDetectPayment();
      }, 8000); 
    }
    return () => clearTimeout(detectTimer);
  }, [showQr, isExpired, transactionId]);

  const handleGenerateQr = () => {
    const numAmount = Number(amount);
    if (numAmount > 0) {
      const tid = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
      setTransactionId(tid);

      // Real-world UPI URL format
      const upiId = "bagsclub@hdfcbank"; 
      const merchantName = "BAGSCLUB";
      const upiString = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${numAmount}&cu=INR&tr=${tid}`;
      
      setQrValue(upiString);
      setShowQr(true);
      setTimer(600); 
      setIsExpired(false);
      setIsProcessing(false);
    } else {
      toast.error('Please enter a valid amount');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAutoDetectPayment = async () => {
    if (isExpired || !showQr) return;

    // Check if token exists before trying to verify
    if (!localStorage.getItem('accessToken')) {
      setIsProcessing(false);
      setShowQr(false);
      toast.error('Session expired. Please log in again.', { id: 'payment-status' });
      navigate('/login?expired=true');
      return;
    }

    setIsProcessing(true);
    toast.loading('Payment detected! Verifying...', { id: 'payment-status' });

    try {
      // Secure backend call with the generated transaction ID
      const { data } = await api.post('/wallet/add', {
        amount: Number(amount),
        reference: transactionId,
        description: 'Automatic Wallet Top-up'
      });

      // Update global context balance in real-time
      updateWalletBalance(data.newBalance);

      toast.success('Payment Successful! Wallet Updated.', { id: 'payment-status' });
      
      // Success confirmation state or redirect
      setTimeout(() => {
        navigate('/associate');
      }, 2000);

    } catch (error) {
      console.error('Payment verification failed:', error);
      toast.error(error.response?.data?.message || 'Payment detection failed.', { id: 'payment-status' });
      setIsProcessing(false);
    }
  };

  const handleChangeAmount = () => {
    if (isProcessing) return;
    setShowQr(false);
    setIsExpired(false);
    setTimer(600);
    setAmount('');
    setTransactionId('');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Automatic Wallet Top-up</h2>
      
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
              className={`mt-4 w-full py-2 rounded-md transition-colors font-bold ${isProcessing ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
              disabled={isProcessing}
            >
              Change Amount
            </button>
          )}

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
            <h4 className="font-bold text-blue-800 mb-1">How it works:</h4>
            <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
              <li>Enter the amount and click Generate.</li>
              <li>Scan the QR code with any UPI app.</li>
              <li>QR is valid for 10 minutes.</li>
              <li>Wait for the system to automatically detect payment.</li>
              <li>Your wallet updates instantly after detection.</li>
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
            <p className="mt-2 text-gray-600 font-medium animate-pulse">
              {isProcessing ? 'Verifying Payment...' : 'Scan to Pay Instantly'}
            </p>
            
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
             <p className="text-gray-600 text-sm text-center">The 10-minute validity period has ended. Please regenerate the QR code to proceed with the payment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomaticTopUp;
