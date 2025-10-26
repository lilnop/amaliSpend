import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import Sidebar from './Sidebar';
import './Dashboard.css';

export default function Analytics() {
  const [expenses] = useState([
    { id: 1, category: 'Food', amount: 45, date: '2025-10-01' },
    { id: 2, category: 'Transportation', amount: 20, date: '2025-10-03' },
    { id: 3, category: 'Entertainment', amount: 60, date: '2025-10-04' },
    { id: 4, category: 'Food', amount: 35, date: '2025-10-08' },
    { id: 5, category: 'Shopping', amount: 80, date: '2025-10-10' },
    { id: 6, category: 'Utilities', amount: 50, date: '2025-10-12' },
    { id: 7, category: 'Transportation', amount: 25, date: '2025-10-14' },
  ]);

  // Aggregate spending by category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryTotals).map(cat => ({
    category: cat,
    amount: categoryTotals[cat],
  }));

  // Aggregate by date for trend line
  const dailyTotals = expenses.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.amount;
    return acc;
  }, {});

  const trendData = Object.keys(dailyTotals).map(date => ({
    date,
    total: dailyTotals[date],
  }));

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const highestExpense = Math.max(...expenses.map(e => e.amount));
  const averageExpense = (totalSpent / expenses.length).toFixed(2);

  return (
    <div className="dashboard-wrapper">
      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <div className="top-bar">
            <div className="page-title">
              <h1>Analytics</h1>
              <p>Visual insights into your spending habits</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-header">
                <div className="stat-icon">💰</div>
                <span className="stat-label">Total Spent</span>
              </div>
              <h2 className="stat-value">${totalSpent.toFixed(2)}</h2>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: '#D9E5FF', color: '#3B82F6' }}>📅</div>
                <span className="stat-label">Average per Transaction</span>
              </div>
              <h2 className="stat-value">${averageExpense}</h2>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: '#FFD9D9', color: '#EF4444' }}>🔥</div>
                <span className="stat-label">Highest Expense</span>
              </div>
              <h2 className="stat-value">${highestExpense}</h2>
            </div>
          </div>

          {/* Spending Trend */}
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: '#D9FFE5', color: '#10B981' }}>📈</div>
              <span className="stat-label">Spending Trend (by Date)</span>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#FF6B35" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ background: '#FFE5D9', color: '#FF6B35' }}>📊</div>
              <span className="stat-label">Spending by Category</span>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#FF6B35" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
