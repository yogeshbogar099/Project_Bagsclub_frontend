import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"; // Adjust path if necessary
import AssociateNavbar from './AssociateNavbar';
import { useAuth } from '../context/AuthContext';

const AssociateLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  // Fallback values if user data is missing
  const userName = user?.name || "Member";
  
  // Calculate Member ID: last 4 digits of mobile number if available
  let memberId = "N/A";
  if (user?.mobileNumber) {
    memberId = user.mobileNumber.slice(-4);
  } else if (user?.memberId && user.memberId !== 'N/A') {
    memberId = user.memberId;
  }
  
  const balance = user?.walletBalance || "0.00";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Header Section */}
      <header className="bg-white w-full">
        <div className="container mx-auto px-4 py-4 flex justify-between items-start">
          {/* Logo Section (Left) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <img src={logo} alt="Logo" width="80" className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary tracking-tight">BAGSCLUB</span>
              <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">No.1 Bag Printing Service</span>
            </div>
          </div>

          {/* User Info Section (Right) */}
          <div className="flex flex-col items-end text-sm text-gray-700 space-y-1">
            <div className="font-semibold text-gray-900">Hi, Mr/Mrs {userName}</div>
            <div>Member ID: <span className="font-medium">{memberId}</span></div>
            <div>A/C Balance: <span className="font-bold text-green-600">₹ {balance}</span></div>
            <button 
              onClick={handleSignOut}
              className="mt-1 text-red-500 hover:text-red-700 font-medium text-xs uppercase tracking-wide border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Section with Horizontal Lines */}
        <div className="w-full">
          <div className="h-1 bg-red-600 w-full"></div>
          <div className="container mx-auto">
            <AssociateNavbar />
          </div>
          <div className="h-1 bg-red-600 w-full"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      {/* Optional: Footer could go here if needed, but requirements didn't specify one for Associate pages */}
    </div>
  );
};

export default AssociateLayout;
