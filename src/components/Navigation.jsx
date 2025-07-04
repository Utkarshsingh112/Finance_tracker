import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Home, 
  PlusCircle, 
  BarChart3, 
  Newspaper, 
  Sun, 
  Moon, 
  Menu, 
  X 
} from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'expenses', label: 'Expenses', icon: BarChart3 },
    { id: 'add-expense', label: 'Add Expense', icon: PlusCircle },
    { id: 'blog', label: 'Financial News', icon: Newspaper },
  ];

  return (
    <nav className="bg-white dark:bg-primary-800 shadow-lg border-b border-primary-200 dark:border-primary-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-primary-900 dark:text-primary-50">
              Trackify
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                      : 'text-primary-600 dark:text-primary-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-primary-100 dark:hover:bg-primary-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-accent-500 hover:bg-accent-600 dark:bg-accent-600 dark:hover:bg-accent-700 text-white shadow-md transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? (
                <Sun size={20} className="text-white" />
              ) : (
                <Moon size={20} className="text-white" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white shadow-md transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-white" />
                ) : (
                  <Menu size={20} className="text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
