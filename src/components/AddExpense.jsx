import { useState } from "react";

export default function AddExpense({ onAddExpense }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) {
      alert("Please enter a category and amount.");
      return;
    }

    const newExpense = {
      category,
      amount: parseFloat(amount),
      description,
    };

    try {
      setLoading(true);
      await onAddExpense(newExpense);
      setCategory("");
      setAmount("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to add expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add New Expense</h2>

      <div className="form-group">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="healthcare">Healthcare</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            placeholder="Optional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}