import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other'
];

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now().toString(),
      ...expense,
      createdAt: new Date().toISOString()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id 
          ? { ...expense, ...updatedExpense, updatedAt: new Date().toISOString() }
          : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
      const category = expense.category || 'Other';
      if (!acc[category]) {
        acc[category] = { total: 0, count: 0 };
      }
      acc[category].total += parseFloat(expense.amount);
      acc[category].count += 1;
      return acc;
    }, {});
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const getExpensesByMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      updateExpense,
      deleteExpense,
      getExpensesByCategory,
      getTotalExpenses,
      getExpensesByMonth,
      categories: EXPENSE_CATEGORIES
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};
