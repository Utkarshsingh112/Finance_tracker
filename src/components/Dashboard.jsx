import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpense } from '../contexts/ExpenseContext';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Search, Bell, User, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import CategoryDonutChart from './CategoryDonutChart';

const Dashboard = () => {
  const { expenses, getTotalExpenses, getExpensesByCategory, getExpensesByMonth } = useExpense();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const totalExpenses = getTotalExpenses();
  const monthlyExpenses = getExpensesByMonth();
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const categoryData = getExpensesByCategory();
  const user = { name: 'David', photoURL: '/iron man.jpg' };
  
  // Mock data to match the reference design
  const mockData = {
    currentBalance: 8200,
    totalIncome: 1550,
    totalExpenses: 5210,
    monthlyBudget: 20000
  };

  // Filter transactions based on search
  const filteredTransactions = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const StatCard = ({ title, value, icon: Icon, color, index }) => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow"
    >
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">${value}</p>
        <p className="text-xs text-green-500 flex items-center mt-1">
          <TrendingUp className="w-3 h-3 mr-1" />
          +2.1%
        </p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </motion.div>
  );

  const TransactionItem = ({ name, date, amount, status, avatar }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">{avatar}</span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900">${amount}</p>
        <p className={`text-xs ${status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </p>
      </div>
    </div>
  );

  // Close search when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && !event.target.closest('.search-container')) {
        setIsSearchOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex justify-between items-center p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Expense Tracking Software</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative search-container">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-8 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
                >
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    autoFocus
                  />
                  {searchTerm && (
                    <div className="mt-2 max-h-48 overflow-y-auto">
                      {filteredTransactions.slice(0, 5).map((expense) => (
                        <div key={expense.id} className="py-2 px-2 hover:bg-gray-50 rounded text-sm">
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-gray-500">${parseFloat(expense.amount).toFixed(2)} • {expense.category}</p>
                        </div>
                      ))}
                      {filteredTransactions.length === 0 && (
                        <p className="text-gray-500 text-sm py-2">No transactions found</p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-2">
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Overview Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Current Balance" 
            value={mockData.currentBalance} 
            icon={DollarSign} 
            color="bg-green-500"
            index={0}
          />
          <StatCard 
            title="Total Income" 
            value={mockData.totalIncome} 
            icon={TrendingUp} 
            color="bg-blue-500"
            index={1}
          />
          <StatCard 
            title="Total Expenses" 
            value={mockData.totalExpenses} 
            icon={TrendingDown} 
            color="bg-red-500"
            index={2}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Latest Transactions</h2>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                <option>Real</option>
              </select>
            </div>
            <CategoryDonutChart />
          </div>

          {/* Latest Transactions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Latest Transactions</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">Filters</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">Download</button>
              </div>
            </div>
            
            <div className="space-y-3">
              {expenses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">💳</span>
                  </div>
                  <p className="text-gray-500 font-medium">No transactions yet</p>
                  <p className="text-sm text-gray-400">Add your first expense to see transactions here</p>
                </div>
              ) : (
                expenses.slice(0, 5).map((expense, index) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold text-sm">
                          {expense.category.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{expense.description}</p>
                        <p className="text-sm text-gray-500">{expense.category}</p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(expense.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">-${parseFloat(expense.amount).toFixed(2)}</p>
                      <p className="text-xs text-green-500">Success</p>
                    </div>
                  </motion.div>
                ))
              )}
              {expenses.length > 5 && (
                <div className="text-center pt-4">
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">View all transactions</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Amount Transfer Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Amount Transfer</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">$</span>
              </div>
              <p className="font-bold text-gray-900">$1200</p>
              <p className="text-xs text-gray-500">Receive in Cash</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">$</span>
              </div>
              <p className="font-bold text-gray-900">$4500</p>
              <p className="text-xs text-gray-500">Transfer to Bank</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">$</span>
              </div>
              <p className="font-bold text-gray-900">$3200</p>
              <p className="text-xs text-gray-500">Transfer to Saving</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">$</span>
              </div>
              <p className="font-bold text-gray-900">$1150</p>
              <p className="text-xs text-gray-500">Transfer to Other Bank</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
