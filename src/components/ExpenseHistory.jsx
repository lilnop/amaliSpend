
export default function ExpenseHistory({ expenses, onDelete }) {
    return (
        <div className="expense-list">
            {/* LIST HEADER */}
            <div className="list-header">
                <h3>Expense History</h3>
                <select
                    className="filter-select"
                >
                    <option value="all">All Categories</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="utilities">Utilities</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">Other</option>
                </select>
            </div>
            {/* IF EMPTY */}
            {
                expenses.length === 0 ? (
                    <div className="empty-state">
                        <p>No expenses yet. Add your first expense above!</p>
                    </div>
                ) :
                    (
                        <div className="expenses">
                            {
                                expenses.map((item) => (
                                    <div key={item.id} className="expense-item">
                                        <div className="expense-info">
                                            <div className="expense-header">
                                                <span className="expense-description">{item.description}</span>
                                                <span className={`category-badge ${item.category}`}>{item.category}</span>
                                            </div>
                                            <span className="expense-date">
                                                {new Date(item.date).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <div className="expense-actions">
                                            <span className="expense-amount">${item.amount.toFixed(2)}</span>
                                            <button
                                                className="btn-delete"
                                                onClick={() => onDelete(item.id)}
                                                aria-label="Delete expense"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
        </div>
    )
}
