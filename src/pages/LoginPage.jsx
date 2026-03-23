import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tag, Truck, MapPin, Headphones } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Dummy list of countries
  const countries = [
    "India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "China", "Brazil"
  ];

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    const success = await login(mobile, password); 
    setLoading(false);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="font-body text-gray-800 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[600px]">
          <div className="flex flex-col md:flex-row flex-1">
          
          {/* Left Portion - Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-heading text-primary mb-2">Welcome</h1>
              <p className="text-gray-500">Login to access your dashboard.</p>
            </div>
            
            <form id="login-form" onSubmit={handleLogin} className="space-y-6">
              {/* Country Select */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  SELECT COUNTRY
                </label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none text-gray-700"
                    required
                  >
                    <option value="" disabled>Select a country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  MOBILE NUMBER
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-700"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              
              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    PASSWORD
                  </label>
                  <Link to="/forgot-password" className="text-xs text-secondary hover:text-orange-600 font-semibold">
                    Forgot?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-700"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </form>
          </div>
          
          {/* Right Portion - Features */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-red-500 to-blue-600 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold font-heading mb-8">NEW USER?</h2>
              
              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Tag size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Wholesale rates</h3>
                    <p className="text-white/80 text-sm">Get the best prices in the industry directly.</p>
                  </div>
                </div>
                
                {/* Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Truck size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Live Tracking</h3>
                    <p className="text-white/80 text-sm">Real-time updates on all your print jobs.</p>
                  </div>
                </div>
                
                {/* Feature 3 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Pan-India Reach</h3>
                    <p className="text-white/80 text-sm">Service available in all major cities.</p>
                  </div>
                </div>
                
                {/* Feature 4 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Headphones size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Expert Support</h3>
                    <p className="text-white/80 text-sm">Dedicated team for all your printing needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          </div>

          <div className="w-full border-t border-gray-200 bg-white p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="submit"
                form="login-form"
                disabled={loading}
                className={`h-12 w-full bg-primary hover:bg-green-800 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 text-xs sm:text-sm whitespace-nowrap ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>

              <Link
                to="/signup"
                className="h-12 w-full border border-gray-300 bg-white text-gray-900 font-bold rounded-lg text-center transition-colors hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 flex items-center justify-center text-xs sm:text-sm whitespace-nowrap"
              >
                CREATE ACCOUNT
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
