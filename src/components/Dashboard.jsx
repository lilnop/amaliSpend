import { useState, useEffect } from "react";
import axios from "axios";

import AddExpense from "./AddExpense";
import Balance from "./Balance";
import ExpenseHistory from "./ExpenseHistory";
import Graph from "./Graph";
import Header from "./Header";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ====== FETCH EXPENSES ON LOAD ======
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await axios.get("/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setExpenses(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to load expenses.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // ====== ADD EXPENSE HANDLER ======
  const handleExpense = async (newExpense) => {
    try {
      const token = localStorage.getItem("token");

      // Create new expense in the backend
      await axios.post("/api/expenses", newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Immediately re-fetch the updated list
      const refreshed = await axios.get("/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the state to reflect backend data
      setExpenses(refreshed.data);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to add expense.");
    }
  };

  // ====== DELETE EXPENSE HANDLER ======
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted expense from UI
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to delete expense.");
    }
  };

  // ====== RENDER UI ======
  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <Header />
        <div className="dashboard-grid">
          <div className="dashboard-section balance-section">
            <Balance expenses={expenses} />
          </div>
          <div className="dashboard-section form-section">
            <AddExpense onAddExpense={handleExpense} />
          </div>
          <div className="dashboard-section graph-section">
            <Graph expenses={expenses} />
          </div>
          <div className="dashboard-section history-section">
            <ExpenseHistory expenses={expenses} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}