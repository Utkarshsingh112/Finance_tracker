import React from 'react';
import { motion } from 'framer-motion';
import { useExpense } from '../contexts/ExpenseContext';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { expenses, getTotalExpenses, getExpensesByCategory, getExpensesByMonth } = useExpense();

  const totalExpenses = getTotalExpenses();
  const monthlyExpenses = getExpensesByMonth();
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const categoryData = getExpensesByCategory();

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
    }
  };

  const StatCard = ({ title, value, icon: Icon, change, changeType, isCurrency = true }) => (
    <motion.div
      variants={itemVariants}
      className="stat-card"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{title}</p>
          <p className="text-2xl font-bold text-primary-900 dark:text-primary-50">
            {isCurrency ? `₹${value.toFixed(2)}` : value}
          </p>
          {change && (
            <div className={`flex items-center mt-2 ${
              changeType === 'increase' ? 'text-danger-600' : 'text-accent-600'
            }`}>
              {changeType === 'increase' ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
              <span className="text-sm ml-1">{change}%</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-gradient-primary rounded-full shadow-lg">
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </motion.div>
  );

  const CategoryCard = ({ category, data }) => (
    <motion.div
      variants={itemVariants}
      className="category-card"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-primary-900 dark:text-primary-50">{category}</h3>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {data.count} transaction{data.count !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="text-right">
        <p className="text-lg font-bold text-primary-900 dark:text-primary-50">
  ₹{data.total.toFixed(2)}
</p>
        </div>
      </div>
    </motion.div>
  );

  const RecentExpenseCard = ({ expense }) => (
    <motion.div
      variants={itemVariants}
      className="flex items-center justify-between expense-card"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex-1">
        <h4 className="font-medium text-primary-900 dark:text-primary-50">
          {expense.description}
        </h4>
        <p className="text-sm text-primary-600 dark:text-primary-400">
          {expense.category} • {format(new Date(expense.date), 'MMM dd, yyyy')}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-primary-900 dark:text-primary-50">
          ₹{parseFloat(expense.amount).toFixed(2)}
        </p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-50 mb-2">
          Dashboard
        </h1>
        <p className="text-primary-600 dark:text-primary-400">
          Overview of your financial activity
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Expenses"
          value={totalExpenses}
          icon={DollarSign}
        />
        <StatCard
          title="This Month"
          value={monthlyTotal}
          icon={Calendar}
        />
        <StatCard
          title="Categories"
          value={Object.keys(categoryData).length}
          icon={PieChart}
          isCurrency={false}
        />
        <StatCard
          title="Total Transactions"
          value={expenses.length}
          icon={TrendingUp}
          isCurrency={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categories Overview */}
        <motion.div variants={itemVariants} className="card p-6">
          <h2 className="text-xl font-bold text-primary-900 dark:text-primary-50 mb-4">
            Expenses by Category
          </h2>
          <div className="space-y-4">
            {Object.entries(categoryData).map(([category, data]) => (
              <CategoryCard key={category} category={category} data={data} />
            ))}
            {Object.keys(categoryData).length === 0 && (
              <p className="text-primary-600 dark:text-primary-400 text-center py-8">
                No expense categories yet. Add your first expense to get started!
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Expenses */}
        <motion.div variants={itemVariants} className="card p-6">
          <h2 className="text-xl font-bold text-primary-900 dark:text-primary-50 mb-4">
            Recent Expenses
          </h2>
          <div className="space-y-3">
            {expenses.slice(0, 5).map((expense) => (
              <RecentExpenseCard key={expense.id} expense={expense} />
            ))}
            {expenses.length === 0 && (
              <p className="text-primary-600 dark:text-primary-400 text-center py-8">
                No recent expenses. Start tracking your expenses today!
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
