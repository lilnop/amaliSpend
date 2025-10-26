import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Sidebar from './Sidebar';
import StatsCard from './ExpenseStats';
import CategoryCard from './CategoryCard';
import TransactionItem from './TransactionItem';
import AddExpenseModal from './AddExpenseModal';
import './Dashboard.css';

const Dashboard2 = () => {
  // Main application state
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate statistics from expenses array
  const calculateStats = () => {
    // Calculate total spending
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Group expenses by category
    const categoryTotals = {};
    expenses.forEach(expense => {
      categoryTotals[expense.category] = 
        (categoryTotals[expense.category] || 0) + expense.amount;
    });

    // Find the category with highest spending
    const topCategory = Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b
        )
      : 'N/A';

    return {
      total,
      categoryTotals,
      topCategory,
      topCategoryAmount: categoryTotals[topCategory] || 0,
    };
  };

  const stats = calculateStats();

  // Prepare data for pie chart
  const preparePieChartData = () => {
    const categoryColors = {
      'Food': '#FF6B35',
      'Transportation': '#3B82F6',
      'Entertainment': '#9333EA',
      'Utilities': '#10B981',
      'Shopping': '#EC4899',
      'Healthcare': '#EF4444',
      'Other': '#6B7280'
    };

    return Object.entries(stats.categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: categoryColors[category] || '#6B7280'
    }));
  };

  const pieChartData = preparePieChartData();

  // Handler: Add new expense
  const handleAddExpense = (newExpense) => {
    console.log('Adding new expense:', newExpense);
    setExpenses(prev => {
      const updated = [newExpense, ...prev];
      console.log('Updated expenses array:', updated);
      return updated;
    });
    setIsModalOpen(false);
  };

  // Handler: Delete expense by ID
  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Handler: Logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
    }
  };

  // Custom label for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontWeight="bold"
        fontSize="12"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="dashboard-wrapper">
      <div className="app-container">
        {/* Sidebar Navigation */}
        <Sidebar onLogout={handleLogout} />

        {/* Main Content Area */}
        <main className="main-content">
          {/* Top Bar */}
          <div className="top-bar">
            <div className="page-title">
              <h1>Dashboard</h1>
              <p>Welcome back! Here's your expense overview</p>
            </div>
            <button 
              className="add-expense-btn" 
              onClick={() => setIsModalOpen(true)}
            >
              <span style={{ fontSize: '1.2rem' }}>+</span>
              Add Expense
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="stats-grid">
            <StatsCard
              icon="💰"
              label="Total Spent"
              value={`$${stats.total.toFixed(2)}`}
              subtitle={`${expenses.length} transactions`}
              isPrimary={true}
            />
            
            {/* Pie Chart Card */}
            <div className="stat-card chart-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: '#FFE5D9', color: '#FF6B35' }}>
                  📊
                </div>
                <span className="stat-label">Category Breakdown</span>
              </div>
              
              {pieChartData.length > 0 ? (
                <>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => `$${value.toFixed(2)}`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="chart-legend">
                    {pieChartData.map((entry) => {
                      const percentage = ((entry.value / stats.total) * 100).toFixed(1);
                      return (
                        <div key={entry.name} className="legend-item">
                          <span 
                            className="legend-color" 
                            style={{ backgroundColor: entry.color }}
                          ></span>
                          <span className="legend-text">
                            {entry.name}: ${entry.value.toFixed(2)} ({percentage}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="empty-chart">
                  <p>Add expenses to see breakdown</p>
                </div>
              )}
            </div>
          </div>

          {/* Category Breakdown Section */}
          <div className="category-section">
            <div className="section-header">
              <h2>Spending by Category</h2>
              <p>Your expense breakdown across different categories</p>
            </div>
            <div className="category-grid">
              {Object.entries(stats.categoryTotals).map(([category, amount]) => {
                const count = expenses.filter(e => e.category === category).length;
                return (
                  <CategoryCard
                    key={category}
                    category={category}
                    amount={amount}
                    transactionCount={count}
                  />
                );
              })}
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="transactions-section">
            <div className="section-header">
              <h2>Recent Transactions</h2>
              <p>Your latest expense entries</p>
            </div>
            <div>
              {expenses.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🛍️</div>
                  <p>No expenses yet. Click "Add Expense" to get started!</p>
                </div>
              ) : (
                expenses.map(expense => (
                  <TransactionItem
                    key={expense.id}
                    expense={expense}
                    onDelete={handleDeleteExpense}
                  />
                ))
              )}
            </div>
          </div>
        </main>

        {/* Add Expense Modal */}
        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddExpense}
        />
      </div>
    </div>
  );
};

export default Dashboard2;