import { useState } from 'react';
import api from '../utils/api';
import { Facebook, Instagram, Youtube, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-6">GET IN TOUCH</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Have a question or need a quote? Fill out the form or reach us directly.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Call Us</p>
                <p className="text-2xl font-bold text-primary">+91 9975813249</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Email Us</p>
                <p className="text-xl font-bold text-primary">bagsclub.direct@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"><Facebook /></a>
              <a href="#" className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"><Instagram /></a>
              <a href="#" className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"><Youtube /></a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  placeholder="I need a quote for..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-primary hover:bg-orange-800 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {status === 'sending' ? 'Sending...' : <>Send Message <Send size={20} /></>}
              </button>
              
              {status === 'success' && <p className="text-green-600 text-center font-medium">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-600 text-center font-medium">Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
