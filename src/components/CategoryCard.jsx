// CATEGORY CARD COMPONENT
// Purpose: Shows spending for each category
// Props: category name, amount, transaction count

const CategoryCard = ({ category, amount, transactionCount }) => {
  // Helper function to get CSS class based on category
  const getCategoryClass = (cat) => {
    return `category-${cat.toLowerCase()}`;
  };

  return (
    <div className="category-card">
      <span className={`category-badge ${getCategoryClass(category)}`}>
        {category}
      </span>
      <div className="category-amount">${amount.toFixed(2)}</div>
      <div className="category-count">{transactionCount} transactions</div>
    </div>
  );
};

export default CategoryCard;