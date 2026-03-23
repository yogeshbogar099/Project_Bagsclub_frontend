import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    whatsapp: '',
    country: '',
    address: '',
    pinCode: '',
    password: '',
    email: '',
    gst: '',
    reference: '',
    services: {
      printing: false,
      exhibition: false,
      magazine: false,
      magazineAd: false,
    },
    termsAccepted: false,
    captcha: '',
  });

  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const countries = [
    "India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "China", "Brazil"
  ];

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      services: { ...formData.services, [name]: checked },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
        alert("Please accept the terms and conditions.");
        return;
    }
    
    setLoading(true);
    // Use email from form for Firebase Auth
    // Use other fields for additional data
    const additionalData = {
        name: formData.name,
        businessName: formData.businessName,
        mobile: formData.whatsapp, // Mapping whatsapp to mobile
        country: formData.country,
        address: formData.address,
        pinCode: formData.pinCode,
        gst: formData.gst,
        reference: formData.reference,
        services: formData.services
    };

    console.log('Frontend Signup Payload:', { email: formData.email, ...additionalData });

    const success = await register(formData.email, formData.password, additionalData);
    setLoading(false);
    
    if (success) {
        navigate('/associate');
    }
  };

  return (
    <div className="font-body text-gray-800 min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12">
          
          {/* Intro Note */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 text-sm text-blue-800">
            <p className="font-bold mb-1">Note:</p>
            <p>
              You are applying for a Printer ID, which gives you access to exclusive wholesale benefits. To ensure eligibility, we must verify whether you are a registered printer or a direct customer. Your request will be approved after successful internal verification — this may take 1–2 working days. We appreciate your patience.
            </p>
          </div>

          <h1 className="text-2xl font-bold font-heading text-primary mb-8 text-center">Create Account</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Business Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">Your Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* WhatsApp No */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">
                WhatsApp No (Used for login) <span className="block text-xs font-normal text-gray-500">(Do not include starting 0 or country code)</span>
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Country */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                required
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">
                Address <span className="block text-xs font-normal text-gray-500">(No need to write city/state name here)</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Pin Code */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Create New Password */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">Create New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* E-mail */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* GST / Tax Number */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">GST / Tax Number (Optional)</label>
              <input
                type="text"
                name="gst"
                value={formData.gst}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Reference by */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-base font-bold text-gray-700 md:w-1/3">Reference by (Optional)</label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Service Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="printing"
                  checked={formData.services.printing}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-base text-gray-700">Printing Services - Become a member of our 40,000+ printers network across India</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="exhibition"
                  checked={formData.services.exhibition}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-base text-gray-700">Exhibition Services - Interested in participating in printing industry expo</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="magazine"
                  checked={formData.services.magazine}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-base text-gray-700">Magazine Services - Interested in our free monthly magazine with latest printing trends and insights</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="magazineAd"
                  checked={formData.services.magazineAd}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-base text-gray-700">Magazine Advertisement Services - Interested in advertising my brand in Printers Club Today magazine</span>
              </label>
            </div>

            {/* Compliance Section */}
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  required
                />
                <span className="text-base font-bold text-gray-800">
                  I ACCEPT ALL THE COMPANY TERMS AND CONDITIONS. <a href="#" className="text-blue-600 hover:underline">[Click here to see all Terms]</a>
                </span>
              </label>

              <div className="flex items-center gap-4">
                <div className="bg-gray-200 px-4 py-2 rounded text-gray-500 font-mono tracking-widest select-none">
                  X7Y2Z
                </div>
                <input
                  type="text"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleInputChange}
                  placeholder="Enter Captcha"
                  className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-primary hover:bg-green-800 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 text-lg uppercase tracking-wide ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Apply For'}
            </button>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
