import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { ExpenseProvider } from './contexts/ExpenseContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import ExpensesList from './components/ExpensesList';
import Blog from './components/Blog';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <ExpensesList />;
      case 'add-expense':
        return <AddExpense />;
      case 'blog':
        return <Blog />;
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
      <ExpenseProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-primary-900 transition-all duration-300">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="pb-8">
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
    </ThemeProvider>
  );
}

export default App;
