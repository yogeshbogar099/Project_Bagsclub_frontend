import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/bagsClubLogo.png";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Corporate', href: '#corporate' },
    { name: 'Our Services', href: '#services' },
    { name: 'Branches', href: '#branches' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
            {/* Placeholder Logo */}
          <div className="rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" width="90"  />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold font-heading ${isScrolled ? 'text-primary' : 'text-white'}`}>BAGSCLUB</span>
            <span className={`text-[10px] font-medium tracking-wider ${isScrolled ? 'text-gray-500' : 'text-white/80'}`}>No.1 Bag Printing Service</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={`font-bold transition-colors ${isScrolled ? 'text-gray-700 hover:text-secondary' : 'text-white hover:text-secondary'}`}>
              {link.name}
            </a>
          ))}
          
          <div className="h-6 w-px bg-gray-300"></div>

          {user ? (
             <button onClick={handleLogout} className={`${isScrolled ? 'bg-primary hover:bg-green-800 text-white' : 'border border-white text-white hover:bg-white/10'} px-5 py-2 rounded-full font-bold transition-colors`}>
              Logout
            </button>
          ) : (
            <Link to="/login" className={`${isScrolled ? 'bg-primary hover:bg-green-800 text-white' : 'border border-white text-white hover:bg-white/10'} px-5 py-2 rounded-full font-bold transition-colors`}>
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className={`md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-700 font-bold hover:text-secondary" onClick={() => setIsOpen(false)}>
                  {link.name}
                </a>
              ))}
              {user ? (
                <button onClick={handleLogout} className="bg-primary hover:bg-orange-800 text-white px-5 py-2 rounded-full font-bold transition-colors w-full text-center">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="bg-primary hover:bg-orange-800 text-white px-5 py-2 rounded-full font-bold transition-colors w-full text-center" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
