import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpense } from '../contexts/ExpenseContext';
import { 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Calendar,
  DollarSign,
  Tag,
  FileText,
  Save,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import CategoryDonutChart from './CategoryDonutChart';

const ExpensesList = () => {
  const { expenses, updateExpense, deleteExpense, categories } = useExpense();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      amount: expense.amount.toString(),
      category: expense.category,
      description: expense.description,
      date: expense.date
    });
  };

  const handleSaveEdit = () => {
    updateExpense(editingId, {
      amount: parseFloat(editForm.amount),
      category: editForm.category,
      description: editForm.description,
      date: editForm.date
    });
    setEditingId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const ExpenseCard = ({ expense }) => {
    const isEditing = editingId === expense.id;

    return (
      <motion.div
        layout
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="card p-6"
        whileHover={{ scale: 1.01 }}
      >
        {isEditing ? (
          <div className="space-y-4">
            {/* Editing Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editForm.amount}
                  onChange={(e) => setEditForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                  className="select-field"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <input
                type="text"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={editForm.date}
                onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                className="input-field"
              />
            </div>
            <div className="flex space-x-2">
              <motion.button
                onClick={handleSaveEdit}
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save size={16} />
                <span>Save</span>
              </motion.button>
              <motion.button
                onClick={handleCancelEdit}
                className="btn-secondary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
                <span>Cancel</span>
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {expense.description}
                </h3>
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                  {expense.category}
                </span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <DollarSign size={14} />
                  <span className="font-medium">₹{parseFloat(expense.amount).toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => handleEdit(expense)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit size={18} />
              </motion.button>
              <motion.button
                onClick={() => handleDelete(expense.id)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={18} />
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8">
        <CategoryDonutChart />
      </div>
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Expenses
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View, edit, and manage your expenses
        </p>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div variants={itemVariants} className="card p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="select-field pl-10 pr-8"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Expenses List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="card p-12 text-center"
            >
              <div className="text-gray-400 mb-4">
                <FileText size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No expenses found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || filterCategory
                  ? 'No expenses match your search criteria.'
                  : 'Start by adding your first expense!'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary */}
      {filteredExpenses.length > 0 && (
        <motion.div variants={itemVariants} className="mt-8 card p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Summary
            </h3>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExpensesList;
