// 5. ADD EXPENSE MODAL COMPONENT
// Purpose: Form for adding new expenses

import { useState } from "react";

// Props: isOpen, onClose, onSubmit
export default function AddExpenseModal({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create new expense object
        const newExpense = {
            id: Date.now(), // Simple ID generation
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: formData.category,
            date: formData.date
        };

        // Pass to parent component
        onSubmit(newExpense);

        // Reset form
        setFormData({
            description: '',
            amount: '',
            category: 'Food',
            date: new Date().toISOString().split('T')[0]
        });
    };

    // Don't render anything if modal is closed
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                // Close when clicking outside the modal
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="modal">
                <div className="modal-header">
                    <h2>Add New Expense</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
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
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        >
                            Add Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}