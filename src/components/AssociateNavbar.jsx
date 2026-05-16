import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Home, 
  Settings, 
  Wallet, 
  List, 
  PlusCircle, 
  PackageSearch, 
  BarChart3, 
  LifeBuoy,
  Search 
} from 'lucide-react';

const AssociateNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [navSearch, setNavSearch] = useState('');

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (!navSearch.trim()) return;
    navigate(`/associate/order/search-number?id=${navSearch.trim()}`);
    setNavSearch('');
  };

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    {
      name: 'Settings/Setup',
      icon: Settings,
      dropdown: [
        { name: 'Change Password', path: '/associate/settings/change-password' },
        { name: 'Edit My Profile', path: '/associate/settings/profile' },
        { name: 'Create/Manage Staff Login', path: '/associate/settings/staff' },
      ],
    },
    { name: 'Add Money', path: '/associate/add-money', icon: Wallet },
    { name: 'Rate List', path: '/associate/rate-list', icon: List },
    { name: 'Add Order', path: '/associate/add-order', icon: PlusCircle },
    {
      name: 'Order Status',
      icon: PackageSearch,
      dropdown: [
        { name: 'Search by Order Number', path: '/associate/order/search-number' },
        { name: 'Search by Order Stage', path: '/associate/order/search-stage' },
        { name: 'Search by Date', path: '/associate/order/search-date' },
      ],
    },
    {
      name: 'Reports',
      icon: BarChart3,
      dropdown: [
        { name: 'My Sales Performance', path: '/associate/reports/sales' },
        { name: 'Notes Report', path: '/associate/reports/notes' },
        { name: 'Account Transactions Report', path: '/associate/reports/transactions' },
        { name: 'Invoice Report', path: '/associate/reports/invoice' },
      ],
    },
    {
      name: 'Support',
      icon: LifeBuoy,
      dropdown: [
        { name: 'Register Complaint', path: '/associate/support/register-complaint' },
        { name: 'Complaint Status', path: '/associate/support/complaint-status' },
        { name: 'Contact Us', path: '/associate/support/contact' },
        { name: 'Terms & Conditions', path: '/associate/support/terms' },
        { name: 'Instructions & Training Videos', path: '/associate/support/training' },
      ],
    },
  ];

  return (
    <nav className="w-full bg-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <ul className="flex items-center gap-6 text-sm font-medium text-gray-700 relative">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
              onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
            >
              {item.dropdown ? (
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600">
                  <item.icon size={18} className="text-red-500" />
                  {item.name}
                  <ChevronDown size={14} />
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-1.5 hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600 ${
                    location.pathname === item.path ? 'text-red-600 border-red-600 font-bold' : ''
                  }`}
                >
                  <item.icon size={18} className="text-red-500" />
                  {item.name}
                </Link>
              )}

              {/* Dropdown Menu */}
              {item.dropdown && activeDropdown === index && (
                <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 rounded-md py-2 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {item.dropdown.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Quick Search Order Bar */}
        <form onSubmit={handleNavSearch} className="relative hidden md:block">
          <input 
            type="text" 
            value={navSearch}
            onChange={(e) => setNavSearch(e.target.value)}
            placeholder="Quick Order Search..." 
            className="pl-4 pr-10 py-2 border border-gray-200 rounded-full text-xs focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-50 w-40 lg:w-56 transition-all"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
            <Search size={14} />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default AssociateNavbar;
