import { useState } from "react";

export default function AddExpense({ onAddExpense }) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("food");


    // ADD EXPENSE HANDLER DETAILS
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        onAddExpense({
            id: Date.now(),
            description,
            category,
            date: new Date().toLocaleDateString(),
            amount: parseFloat(amount)
        });
        setDescription("");
        setAmount("");
        setCategory('food');
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="expense-form" >
                <h2>Add New Expense</h2>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            step="0.01"
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            id="category"
                            value={category}
                        >
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="utilities">Utilities</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="shopping">Shopping</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn-primary">
                        Add Expense
                </button>
            </form>
        </section>

    )
}
