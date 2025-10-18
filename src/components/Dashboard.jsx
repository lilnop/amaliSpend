import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddExpense from "./AddExpense";
import Balance from "./Balance";
import ExpenseHistory from "./ExpenseHistory";
import Graph from "./Graph";

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    // ADD EXPENSE HANDLER
    const handleExpense = (newExpense) => {
        setExpenses((prev) => [newExpense, ...prev]);
    };

    // DELETE EXPENSE HANDLER
    const handleDelete = (id) => {
        setExpenses((prev) => prev.filter((item) => item.id !== id));
    };

    // LOGOUT HANDLER
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            navigate('/');
        }
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                {/* Header with Logout */}
                <header className="dashboard-header">
                    <div className="dashboard-header-content">
                        <div className="dashboard-branding">
                            <h1 className="dashboard-title">AmaliSpend</h1>
                            <p className="dashboard-subtitle">Expense Tracker Dashboard</p>
                        </div>
                        <button onClick={handleLogout} className="logout-btn">
                            <span className="logout-icon">⎋</span>
                            Logout
                        </button>
                    </div>
                </header>

                {/* Main Content Grid */}
                <div className="dashboard-grid">
                    {/* Balance Card - Full Width */}
                    <div className="dashboard-section balance-section">
                        <Balance expenses={expenses} />
                    </div>

                    {/* Add Expense Form */}
                    <div className="dashboard-section form-section">
                        <AddExpense onAddExpense={handleExpense} />
                    </div>

                    {/* Graph Placeholder */}
                    <div className="dashboard-section graph-section">
                        <Graph expenses={expenses} />
                    </div>

                    {/* Expense History - Full Width */}
                    <div className="dashboard-section history-section">
                        <ExpenseHistory
                            expenses={expenses}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
