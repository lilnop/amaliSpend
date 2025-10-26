import React, { useState } from 'react';

const Test = () => {
  const [expenses, setExpenses] = useState([
    // { id: 1, description: 'Grocery Shopping', amount: 85.50, category: 'Food', date: '2025-10-12' },
    // { id: 2, description: 'Gas Station', amount: 45.00, category: 'Transportation', date: '2025-10-11' },
    // { id: 3, description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2025-10-10' },
    // { id: 4, description: 'Restaurant', amount: 62.30, category: 'Food', date: '2025-10-09' },
    // { id: 5, description: 'Electricity Bill', amount: 120.00, category: 'Utilities', date: '2025-10-08' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const getCategoryClass = (category) => {
    return `category-${category.toLowerCase()}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateStats = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categoryTotals = {};

    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const topCategory = Object.keys(categoryTotals).reduce((a, b) =>
      categoryTotals[a] > categoryTotals[b] ? a : b, 'N/A'
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthExpenses = expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      total,
      categoryTotals,
      topCategory,
      topCategoryAmount: categoryTotals[topCategory] || 0,
      monthExpenses
    };
  };

  const stats = calculateStats();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    };

    setExpenses(prev => [newExpense, ...prev]);
    setIsModalOpen(false);
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
    }
  };

  return (
    <div className="test-dashboard">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .test-dashboard {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f5f5f5;
          color: #333;
          min-height: 100vh;
        }

        /* Sidebar Layout */
        .app-container {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: white;
          box-shadow: 2px 0 10px rgba(0,0,0,0.05);
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          z-index: 1000;
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          color: #FF6B35;
          margin-bottom: 0.5rem;
        }

        .logo-subtitle {
          font-size: 0.85rem;
          color: #999;
        }

        .sidebar-menu {
          padding: 1.5rem 0;
        }

        .menu-item {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #666;
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
          border-left: 3px solid transparent;
        }

        .menu-item:hover {
          background: #FFF9F6;
          color: #FF6B35;
          border-left-color: #FF6B35;
        }

        .menu-item.active {
          background: #FFF9F6;
          color: #FF6B35;
          border-left-color: #FF6B35;
          font-weight: 600;
        }

        .menu-icon {
          font-size: 1.3rem;
          width: 24px;
          text-align: center;
        }

        .sidebar-footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 1.5rem;
          border-top: 1px solid #f0f0f0;
          background: white;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .user-avatar {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #FF6B35 0%, #FF8F5E 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .user-details h4 {
          color: #333;
          font-size: 1rem;
          margin-bottom: 0.2rem;
        }

        .user-details p {
          color: #999;
          font-size: 0.85rem;
        }

        .logout-btn {
          width: 100%;
          background: #FF6B35;
          color: white;
          border: none;
          padding: 0.8rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .logout-btn:hover {
          background: #E55A2B;
          transform: translateY(-2px);
        }

        /* Main Content */
        .main-content {
          margin-left: 280px;
          flex: 1;
          padding: 2rem;
          width: calc(100% - 280px);
        }

        /* Top Bar */
        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          background: white;
          padding: 1.5rem 2rem;
          border-radius: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .page-title h1 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 0.3rem;
        }

        .page-title p {
          color: #999;
          font-size: 0.95rem;
        }

        .add-expense-btn {
          background: #FF6B35;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .add-expense-btn:hover {
          background: #E55A2B;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
        }

        /* Stats Cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 15px;
          padding: 1.8rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #999;
          font-weight: 500;
        }

        .stat-value {
          font-size: 2.2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .stat-subtitle {
          font-size: 0.85rem;
          color: #999;
        }

        .stat-card.primary {
          background: linear-gradient(135deg, #FF6B35 0%, #FF8F5E 100%);
          color: white;
        }

        .stat-card.primary .stat-value,
        .stat-card.primary .stat-label,
        .stat-card.primary .stat-subtitle {
          color: white;
        }

        /* Category Grid */
        .category-section {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 0.3rem;
        }

        .section-header p {
          color: #999;
          font-size: 0.9rem;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.2rem;
        }

        .category-card {
          padding: 1.5rem;
          background: #FAFAFA;
          border-radius: 12px;
          transition: all 0.3s;
        }

        .category-card:hover {
          background: #FFF9F6;
          transform: translateY(-3px);
        }

        .category-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .category-food { background: #FFE5D9; color: #FF6B35; }
        .category-transportation { background: #D9E5FF; color: #3B82F6; }
        .category-entertainment { background: #E5D9FF; color: #9333EA; }
        .category-utilities { background: #D9FFE5; color: #10B981; }
        .category-shopping { background: #FFD9E5; color: #EC4899; }
        .category-healthcare { background: #FFD9D9; color: #EF4444; }
        .category-other { background: #E5E5E5; color: #6B7280; }

        .category-amount {
          font-size: 1.8rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.3rem;
        }

        .category-count {
          font-size: 0.85rem;
          color: #999;
        }

        /* Transactions Section */
        .transactions-section {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem;
          background: #FAFAFA;
          border-radius: 12px;
          margin-bottom: 0.8rem;
          transition: all 0.3s;
        }

        .transaction-item:hover {
          background: #FFF9F6;
          transform: translateX(5px);
        }

        .transaction-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .transaction-details h3 {
          font-size: 1rem;
          color: #333;
          margin-bottom: 0.3rem;
        }

        .transaction-meta {
          font-size: 0.85rem;
          color: #999;
        }

        .transaction-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .transaction-amount {
          font-size: 1.3rem;
          font-weight: bold;
          color: #333;
        }

        .delete-btn {
          background: transparent;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.3s;
          font-size: 1.3rem;
        }

        .delete-btn:hover {
          color: #EF4444;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #999;
        }

        .empty-state-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.3;
        }

        /* Modal */
        .modal-overlay {
          display: ${isModalOpen ? 'flex' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 2000;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .modal-header h2 {
          font-size: 1.8rem;
          color: #333;
        }

        .close-btn {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          color: #999;
          cursor: pointer;
          padding: 0;
          transition: color 0.3s;
        }

        .close-btn:hover {
          color: #333;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.9rem 1.2rem;
          border: 2px solid #E5E5E5;
          border-radius: 12px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #FF6B35;
        }

        .modal-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-secondary {
          background: #F5F5F5;
          color: #333;
        }

        .btn-secondary:hover {
          background: #E5E5E5;
        }

        .btn-primary {
          background: #FF6B35;
          color: white;
        }

        .btn-primary:hover {
          background: #E55A2B;
        }

        /* Responsive */
        @media (max-width: 968px) {
          .sidebar {
            transform: translateX(-280px);
            transition: transform 0.3s;
          }

          .sidebar.active {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0;
            width: 100%;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .top-bar {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .transaction-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .transaction-right {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo">AmaliSpend</div>
            <div className="logo-subtitle">Smart Expense Tracking</div>
          </div>

          <nav className="sidebar-menu">
            <a href="#" className="menu-item active">
              <span className="menu-icon">📊</span>
              <span>Dashboard</span>
            </a>
            <a href="#" className="menu-item">
              <span className="menu-icon">💰</span>
              <span>Transactions</span>
            </a>
            <a href="#" className="menu-item">
              <span className="menu-icon">📈</span>
              <span>Analytics</span>
            </a>
            <a href="#" className="menu-item">
              <span className="menu-icon">🎯</span>
              <span>Budgets</span>
            </a>
            {/* <a href="#" className="menu-item">
              <span className="menu-icon">⚙️</span>
              <span>Settings</span>
            </a> */}
          </nav>

          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">JD</div>
              <div className="user-details">
                <h4>Robert Delali</h4>
                <p>dela@gmail.com</p>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Top Bar */}
          <div className="top-bar">
            <div className="page-title">
              <h1>Dashboard</h1>
              <p>Welcome back! Here's your expense overview</p>
            </div>
            <button className="add-expense-btn" onClick={() => setIsModalOpen(true)}>
              <span style={{ fontSize: '1.2rem' }}>+</span>
              Add Expense
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: 'rgba(255,255,255,0.2)' }}>💰</div>
                <span className="stat-label">Total Spent</span>
              </div>
              <div className="stat-value">${stats.total.toFixed(2)}</div>
              <div className="stat-subtitle">{expenses.length} transactions</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: '#FFE5D9', color: '#FF6B35' }}>📊</div>
                <span className="stat-label">Top Category</span>
              </div>
              <div className="stat-value" style={{ fontSize: '1.6rem' }}>{stats.topCategory}</div>
              <div className="stat-subtitle">${stats.topCategoryAmount.toFixed(2)}</div>
            </div>

            {/* <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{background: '#D9FFE5', color: '#10B981'}}>📅</div>
                <span className="stat-label">This Month</span>
              </div>
              <div className="stat-value">${stats.monthExpenses.toFixed(2)}</div>
              <div className="stat-subtitle">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
            </div> */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: '#D9FFE5', color: '#10B981' }}>📅</div>
                <span className="stat-label">This Month</span>
              </div>
              <div className="stat-value">          PIE CHART PLACEHOLDER</div>
              <div className="stat-subtitle">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
            </div>
          </div>


          {/* Category Breakdown */}
          <div className="category-section">
            <div className="section-header">
              <h2>Spending by Category</h2>
              <p>Your expense breakdown across different categories</p>
            </div>
            <div className="category-grid">
              {Object.entries(stats.categoryTotals).map(([category, amount]) => {
                const transactionCount = expenses.filter(expense => expense.category === category).length;
                return (
                  <div key={category} className="category-card">
                    <span className={`category-badge ${getCategoryClass(category)}`}>{category}</span>
                    <div className="category-amount">${amount.toFixed(2)}</div>
                    <div className="category-count">{transactionCount} transactions</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Transactions */}
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
                  <div key={expense.id} className="transaction-item">
                    <div className="transaction-left">
                      <span className={`category-badge ${getCategoryClass(expense.category)}`}>{expense.category}</span>
                      <div className="transaction-details">
                        <h3>{expense.description}</h3>
                        <div className="transaction-meta">{formatDate(expense.date)}</div>
                      </div>
                    </div>
                    <div className="transaction-right">
                      <div className="transaction-amount">${expense.amount.toFixed(2)}</div>
                      <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>×</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Expense</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="e.g., Grocery shopping"
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;