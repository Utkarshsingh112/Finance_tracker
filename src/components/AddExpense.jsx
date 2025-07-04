import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useExpense } from '../contexts/ExpenseContext';
import { Plus, DollarSign, Calendar, Tag, FileText } from 'lucide-react';

const AddExpense = () => {
  const { addExpense, categories } = useExpense();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addExpense({
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description.trim(),
        date: formData.date
      });

      // Reset form
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});

      // Show success animation
      setTimeout(() => setIsSubmitting(false), 1000);
    } catch (error) {
      console.error('Error adding expense:', error);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Expense
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your spending by adding a new expense
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <DollarSign size={16} className="inline mr-2" />
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className={`input-field ${errors.amount ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="0.00"
            />
            {errors.amount && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.amount}
              </motion.p>
            )}
          </motion.div>

          {/* Category Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag size={16} className="inline mr-2" />
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`select-field ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.category}
              </motion.p>
            )}
          </motion.div>

          {/* Description Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText size={16} className="inline mr-2" />
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`input-field ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="What did you spend on?"
              maxLength={100}
            />
            {errors.description && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.description}
              </motion.p>
            )}
          </motion.div>

          {/* Date Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`input-field ${errors.date ? 'border-red-500 focus:ring-red-500' : ''}`}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.date && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.date}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Plus size={20} />
                  <span>Add Expense</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </form>

        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center"
          >
            <p className="text-green-800 dark:text-green-200 font-medium">
              ✅ Expense added successfully!
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AddExpense;
