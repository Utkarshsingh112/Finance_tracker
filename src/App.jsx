import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { ExpenseProvider } from './contexts/ExpenseContext';
import { UserProvider } from './contexts/UserContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Cards from './components/Cards';
import BankAccounts from './components/BankAccounts';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'cards':
        return <Cards />;
      case 'bank-accounts':
        return <BankAccounts />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const pageTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <ThemeProvider>
      <UserProvider>
        <ExpenseProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300 flex">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="flex-1 overflow-y-auto ml-60 sm:ml-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  {renderActiveComponent()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </ExpenseProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
