import React, { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import { useExpenses } from './ExpenseContext';
import './Dashboard.css';

export default function Budgets() {
  const { expenses } = useExpenses();

  // User-defined total budget (start empty)
  const [totalBudget, setTotalBudget] = useState('');

  // Calculate total spent
  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Calculate remaining
  const remaining = totalBudget ? totalBudget - totalSpent : 0;

  // Prevent negative budget input
  const handleBudgetChange = (e) => {
    const value = e.target.value;
    setTotalBudget(value === '' ? '' : Math.max(Number(value), 0));
  };

  // Compute spending percentage
  const percentage = totalBudget
    ? Math.min((totalSpent / totalBudget) * 100, 100)
    : 0;

  const overBudget = totalSpent > totalBudget;

  return (
    <div className="dashboard-wrapper">
      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <div className="top-bar">
            <div className="page-title">
              <h1>Budget</h1>
              <p>Set your total monthly spending goal and track progress</p>
            </div>
          </div>

          {/* Total Budget Input */}
          <div className="budget-input-section">
            <label htmlFor="totalBudget">Set Your Total Monthly Budget</label>
            <input
              id="totalBudget"
              type="number"
              value={totalBudget}
              onChange={handleBudgetChange}
              placeholder="Enter amount (e.g. 1000)"
              className="budget-input"
              min="0"
            />
          </div>

          {/* Only show stats once budget is set */}
          {totalBudget && (
            <>
              {/* Summary Cards */}
              <div className="stats-grid">
                <div className="stat-card primary">
                  <div className="stat-header">
                    <div className="stat-icon">💵</div>
                    <span className="stat-label">Total Budget</span>
                  </div>
                  <h2 className="stat-value">${Number(totalBudget).toFixed(2)}</h2>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <div
                      className="stat-icon"
                      style={{ background: '#D9FFE5', color: '#10B981' }}
                    >
                      💰
                    </div>
                    <span className="stat-label">Total Spent</span>
                  </div>
                  <h2 className="stat-value">${totalSpent.toFixed(2)}</h2>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <div
                      className="stat-icon"
                      style={{ background: '#FFD9D9', color: '#EF4444' }}
                    >
                      ⚠️
                    </div>
                    <span className="stat-label">Remaining</span>
                  </div>
                  <h2 className="stat-value">
                    ${remaining.toFixed(2)}
                  </h2>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="budget-progress-section">
                <h2>Budget Progress</h2>
                <div className="budget-bar-container">
                  <div
                    className="budget-bar-fill"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: overBudget ? '#EF4444' : '#FF6B35',
                      height: '12px',
                      borderRadius: '10px',
                      transition: 'width 0.4s ease',
                    }}
                  ></div>
                </div>

                <p
                  className="budget-status"
                  style={{
                    color: overBudget ? '#EF4444' : '#555',
                    marginTop: '0.6rem',
                    fontWeight: overBudget ? 'bold' : 'normal',
                  }}
                >
                  {overBudget
                    ? `Over budget by $${(totalSpent - totalBudget).toFixed(2)} 😬`
                    : `${percentage.toFixed(1)}% of your budget used`}
                </p>
              </div>
            </>
          )}

          {/* If no budget set */}
          {!totalBudget && (
            <div className="empty-state" style={{ marginTop: '2rem' }}>
              <div className="empty-state-icon">💡</div>
              <p>Set a total budget above to start tracking your spending!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
