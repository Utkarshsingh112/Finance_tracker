import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, MoreVertical, Eye, EyeOff } from 'lucide-react';

const Cards = () => {
  const [showBalance, setShowBalance] = React.useState(true);

  const cards = [
    {
      id: 1,
      type: 'Mastercard',
      number: '**** **** **** 4532',
      balance: 2450.75,
      holder: 'David Johnson',
      expiry: '12/26',
      color: 'bg-gradient-to-r from-purple-600 to-blue-600'
    },
    {
      id: 2,
      type: 'Visa',
      number: '**** **** **** 8901',
      balance: 1875.20,
      holder: 'David Johnson',
      expiry: '08/25',
      color: 'bg-gradient-to-r from-green-600 to-teal-600'
    }
  ];

  const CreditCardComponent = ({ card, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${card.color} rounded-xl p-6 text-white relative overflow-hidden h-48`}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-white/80 text-sm">Balance</p>
          <p className="text-2xl font-bold">
            {showBalance ? `$${card.balance.toFixed(2)}` : '****'}
          </p>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-white/80 hover:text-white transition-colors"
        >
          {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
      </div>
      
      <div className="space-y-2">
        <p className="text-lg font-mono tracking-wider">{card.number}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/80 text-xs">Card Holder</p>
            <p className="text-sm font-medium">{card.holder}</p>
          </div>
          <div>
            <p className="text-white/80 text-xs">Expires</p>
            <p className="text-sm font-medium">{card.expiry}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{card.type}</p>
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Cards</h1>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add Card</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <CreditCardComponent key={card.id} card={card} index={index} />
          ))}
          
          {/* Add New Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: cards.length * 0.1 }}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 h-48 flex flex-col items-center justify-center hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer"
          >
            <Plus className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">Add New Card</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Connect your bank account</p>
          </motion.div>
        </div>

        {/* Card Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-green-600">
              ${showBalance ? (cards.reduce((sum, card) => sum + card.balance, 0)).toFixed(2) : '****'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Across all cards</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Active Cards</h3>
            <p className="text-3xl font-bold text-blue-600">{cards.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Currently linked</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Monthly Spending</h3>
            <p className="text-3xl font-bold text-orange-600">
              ${showBalance ? '2,847.50' : '****'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
