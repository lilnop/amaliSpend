import { Pie, PieChart } from 'recharts';

export default function Graph({ expenses }) {
    // Calculate category totals
    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const categories = Object.keys(categoryTotals);
    const maxAmount = Math.max(...Object.values(categoryTotals), 1);

    return (
        <div className="graph-card">
            <h3 className="graph-title">Spending by Category</h3>
            {categories.length === 0 ? (
                <div className="graph-empty">
                    <span className="graph-empty-icon">📊</span>
                    <p>No data to display yet</p>
                </div>
            ) : (
                <div className="graph-bars">
                    {categories.map((category) => {
                        const amount = categoryTotals[category];
                        const percentage = (amount / maxAmount) * 100;
                        
                        return (
                            <div key={category} className="graph-bar-item">
                                <div className="graph-bar-label">
                                    <span className="graph-category">{category}</span>
                                    <span className="graph-amount">${amount.toFixed(2)}</span>
                                </div>
                                <div className="graph-bar-container">
                                    <div 
                                        className={`graph-bar graph-bar-${category}`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}