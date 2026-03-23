import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    
    // Password validation regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      toast.error("Password must be at least 8 characters long and contain at least 1 Alphabet, 1 Numeric and 1 Special Character");
      return;
    }

    setLoading(true);
    const success = await changePassword(formData.oldPassword, formData.newPassword);
    setLoading(false);

    if (success) {
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Change Your Password</h2>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
          <input 
            type="password" 
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            required
          />
          <p className="text-xs text-red-500 mt-1">
            Password must be at-least 8 characters long and contain at-least 1 Alphabet, 1 Numeric and 1 Special Character
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input 
            type="password" 
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            required
          />
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <button 
            type="button" 
            onClick={() => navigate('/associate')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={`px-6 py-2 bg-primary text-white rounded-md hover:bg-green-700 transition-colors font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Updating...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
