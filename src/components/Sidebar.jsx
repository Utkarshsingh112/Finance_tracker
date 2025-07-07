import React from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart3, CreditCard, Banknote, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: Home },
    { id: 'transactions', label: 'TRANSACTIONS', icon: BarChart3 },
    { id: 'cards', label: 'CARDS', icon: CreditCard },
    { id: 'bank-accounts', label: 'BANK ACCOUNTS', icon: Banknote },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <div className="bg-primary-800 text-primary-50 flex flex-col min-h-screen w-64 p-6">
      {/* Logo */}
      <div className="flex items-center mb-10">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
          <span className="text-primary-800 font-bold text-lg">E</span>
        </div>
        <span className="text-xl font-bold">TrackiFy</span>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-primary-700 text-white'
                  : 'text-primary-200 hover:bg-primary-700 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

