// TRANSACTION ITEM COMPONENT
// Purpose: Display single expense entry
// Props: expense object, onDelete function

const TransactionItem = ({ expense, onDelete }) => {
  // Helper function for category styling
  const getCategoryClass = (cat) => {
    return `category-${cat.toLowerCase()}`;
  };
  
  // Helper function to format dates nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="transaction-item">
      <div className="transaction-left">
        <span className={`category-badge ${getCategoryClass(expense.category)}`}>
          {expense.category}
        </span>
        <div className="transaction-details">
          <h3>{expense.description}</h3>
          <div className="transaction-meta">{formatDate(expense.date)}</div>
        </div>
      </div>
      <div className="transaction-right">
        <div className="transaction-amount">${expense.amount.toFixed(2)}</div>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(expense.id)}
          aria-label="Delete expense"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;