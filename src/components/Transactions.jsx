import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, MoreVertical } from 'lucide-react';
import { useExpense } from '../contexts/ExpenseContext';
import { format } from 'date-fns';

const Transactions = () => {
  const { expenses } = useExpense();

  const TransactionCard = ({ expense, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
          <span className="text-primary-600 dark:text-primary-300 font-semibold text-sm">
            {expense.category.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{expense.description}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{expense.category}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {format(new Date(expense.date), 'MMM dd, yyyy • hh:mm a')}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900 dark:text-gray-100">-${parseFloat(expense.amount).toFixed(2)}</p>
        <p className="text-xs text-green-500 dark:text-green-400">Completed</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Transactions</h1>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-6">
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">💳</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Add your first expense to see transactions here</p>
            </div>
          ) : (
            expenses.map((expense, index) => (
              <TransactionCard key={expense.id} expense={expense} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
