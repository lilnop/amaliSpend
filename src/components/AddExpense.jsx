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
      await onAddExpense(newExpense); // 🔗 Call the handler from Dashboard
      // ✅ Clear inputs after successful add
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 bg-white rounded-2xl shadow"
    >
      <h3 className="text-lg font-semibold text-gray-800">Add Expense</h3>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded-lg"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded-lg"
      />

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded-lg"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}
