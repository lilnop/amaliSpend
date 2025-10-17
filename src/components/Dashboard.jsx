import { useState } from 'react'

import AddExpense from "./AddExpense";
import Balance from "./Balance";
import ExpenseHistory from "./ExpenseHistory";
import Graph from "./Graph";
import Header from "./Header";

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);

    // ADD EXPENSE HANDLER
    const handleExpense = (newExpense) => {
        setExpenses((prev) => [newExpense, ...prev]);

    };

    // DELETE EXPENSE HANDLER
    const handleDelete = (id) => {
        setExpenses((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <section className="dashboard">
            <div className="dashboard-elements">
                <Header />
                <Balance expenses={expenses} />
                <AddExpense onAddExpense={handleExpense} />
                <Graph />
                <ExpenseHistory
                    expenses={expenses}
                    onDelete={handleDelete}
                />
            </div>

        </section>
    )
}