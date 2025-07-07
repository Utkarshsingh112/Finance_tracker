import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Plus, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';

const BankAccounts = () => {
  const accounts = [
    {
      id: 1,
      name: 'Chase Checking',
      bank: 'JPMorgan Chase',
      type: 'Checking',
      balance: 12450.75,
      accountNumber: '****2847',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'Savings Account',
      bank: 'Bank of America',
      type: 'Savings',
      balance: 25000.00,
      accountNumber: '****1234',
      color: 'bg-green-600'
    },
    {
      id: 3,
      name: 'Business Account',
      bank: 'Wells Fargo',
      type: 'Business',
      balance: 8750.30,
      accountNumber: '****5678',
      color: 'bg-purple-600'
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'deposit', amount: 2500, description: 'Salary Deposit', date: '2024-01-15' },
    { id: 2, type: 'withdrawal', amount: 150, description: 'ATM Withdrawal', date: '2024-01-14' },
    { id: 3, type: 'deposit', amount: 500, description: 'Freelance Payment', date: '2024-01-13' },
  ];

  const AccountCard = ({ account, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${account.color} rounded-lg flex items-center justify-center`}>
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{account.name}</h3>
            <p className="text-sm text-gray-500">{account.bank}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Balance</span>
          <span className="text-sm text-gray-500">{account.accountNumber}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">${account.balance.toLocaleString()}</p>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
          account.type === 'Checking' ? 'bg-blue-100 text-blue-800' :
          account.type === 'Savings' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {account.type}
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Bank Accounts</h1>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm">Link Account</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-green-600">
              ${accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">Across all accounts</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Accounts</h3>
            <p className="text-3xl font-bold text-blue-600">{accounts.length}</p>
            <p className="text-sm text-gray-500 mt-1">Connected banks</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">This Month</h3>
            <p className="text-3xl font-bold text-purple-600">+$3,250</p>
            <p className="text-sm text-gray-500 mt-1">Net flow</p>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {accounts.map((account, index) => (
            <AccountCard key={account.id} account={account} index={index} />
          ))}
          
          {/* Add New Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: accounts.length * 0.1 }}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-primary-400 transition-colors cursor-pointer min-h-[200px]"
          >
            <Plus className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-gray-500 font-medium">Add New Account</p>
            <p className="text-sm text-gray-400 text-center">Connect your bank account securely</p>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'deposit' ? 
                      <ArrowDownRight className="w-5 h-5 text-green-600" /> :
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;
