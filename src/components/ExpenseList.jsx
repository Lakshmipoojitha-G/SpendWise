import ExpenseItem from "./ExpenseItem";

function ExpenseList({
    expenses,
    onDelete,
    onUpdate,
}) {
    return (
        <section
            className="expense-list"
            id="transactions"
        >

            <div className="expense-list-header">

                <div>
                    <span className="section-eyebrow">
                        TRANSACTIONS
                    </span>

                    <h2>
                        Recent Expenses
                    </h2>

                    <p>
                        Keep track of your latest spending.
                    </p>
                </div>

                <div className="transaction-count">
                    {expenses.length}{" "}
                    {expenses.length === 1
                        ? "transaction"
                        : "transactions"}
                </div>

            </div>


            {expenses.length === 0 ? (

                <div className="empty-expenses">

                    <div className="empty-expenses-icon">
                        ₹
                    </div>

                    <h3>
                        No expenses found
                    </h3>

                    <p>
                        Try changing your search or category
                        filter.
                    </p>

                </div>

            ) : (

                <div className="expense-items">

                    {expenses.map((expense) => (
                        <ExpenseItem
                            key={expense.id}
                            expense={expense}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))}

                </div>

            )}

        </section>
    );
}

export default ExpenseList;