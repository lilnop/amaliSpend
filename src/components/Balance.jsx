export default function Balance({expenses}) {
    const total = expenses.reduce((acc,exp) => acc+ exp.amount, 0);

    return (
        <div className="balance-card-new">
            <div className="balance-content">
                <div className="balance-icon">💰</div>
                <div className="balance-info">
                    <div className="balance-label">Total Expenses</div>
                    <div className="balance-amount">${total.toFixed(2)}</div>
                    <div className="balance-subtext">{expenses.length} transaction{expenses.length !== 1 ? 's' : ''}</div>
                </div>
            </div>
            <div className="balance-decoration"></div>
        </div>
    )
}