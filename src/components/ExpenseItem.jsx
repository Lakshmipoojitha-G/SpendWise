import { useState } from "react";

function ExpenseItem({ expense, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);

    const [description, setDescription] = useState(
        expense.description
    );

    const [category, setCategory] = useState(
        expense.category
    );

    const [amount, setAmount] = useState(
        expense.amount
    );

    const [date, setDate] = useState(expense.date);

    const [error, setError] = useState("");

    function handleSave() {
        // Basic validation
        if (
            description.trim() === "" ||
            category === "" ||
            amount === "" ||
            date === ""
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (Number(amount) <= 0) {
            setError("Amount must be greater than 0.");
            return;
        }

        // Send updated data to App
        onUpdate({
            id: expense.id,
            description: description.trim(),
            category: category,
            amount: Number(amount),
            date: date,
        });

        setError("");
        setIsEditing(false);
    }

    function handleCancel() {
        // Restore original values
        setDescription(expense.description);
        setCategory(expense.category);
        setAmount(expense.amount);
        setDate(expense.date);

        setError("");
        setIsEditing(false);
    }

    return (
        <div className="expense-item">

            {!isEditing ? (
                <>
                    <div>
                        <h3>{expense.description}</h3>

                        <p>
                            {expense.category} • {expense.date}
                        </p>
                    </div>

                    <div className="expense-actions">
                        <strong>
                            ₹{expense.amount.toLocaleString()}
                        </strong>

                        <button
                            className="edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-button"
                            onClick={() => onDelete(expense.id)}
                        >
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <div className="edit-form">

                    <h3>Edit Expense</h3>

                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}

                    <div className="edit-form-grid">

                        <div className="form-group">
                            <label>
                                Description
                            </label>

                            <input
                                type="text"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(event) =>
                                    setCategory(event.target.value)
                                }
                            >
                                <option value="">
                                    Select category
                                </option>

                                <option value="Food">
                                    Food
                                </option>

                                <option value="Transportation">
                                    Transportation
                                </option>

                                <option value="Shopping">
                                    Shopping
                                </option>

                                <option value="Bills">
                                    Bills
                                </option>

                                <option value="Entertainment">
                                    Entertainment
                                </option>

                                <option value="Health">
                                    Health
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                Amount
                            </label>

                            <input
                                type="number"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Date
                            </label>

                            <input
                                type="date"
                                value={date}
                                onChange={(event) =>
                                    setDate(event.target.value)
                                }
                            />
                        </div>

                    </div>

                    <div className="edit-actions">

                        <button
                            className="save-edit-button"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>

                        <button
                            className="cancel-edit-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default ExpenseItem;