export default function Balance({expenses}) {
    const total = expenses.reduce((acc,exp) => acc+ exp.amount, 0);

    return (
        <div className="balance-card">
            <div className="balance-label">Total Expenses</div>
            <div className="balance-amount">${total.toFixed(2)}</div>
        </div>
    )
}
