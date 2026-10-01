import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SummaryCard from "./components/SummaryCard";
import ExpenseList from "./components/ExpenseList";
import CategoryAnalytics from "./components/CategoryAnalytics";

import "./App.css";

const SESSION_TIMEOUT = 30 * 60 * 1000;

const sampleExpenses = [
  {
    id: 1,
    description: "Lunch",
    category: "Food",
    amount: 450,
    date: "30 Sep 2026",
  },
  {
    id: 2,
    description: "Uber Ride",
    category: "Transportation",
    amount: 280,
    date: "29 Sep 2026",
  },
  {
    id: 3,
    description: "New Shirt",
    category: "Shopping",
    amount: 1200,
    date: "28 Sep 2026",
  },
  {
    id: 4,
    description: "Electricity Bill",
    category: "Bills",
    amount: 1800,
    date: "27 Sep 2026",
  },
];

function getExpenseKey(user) {
  return `spendwise-expenses-${user.id}`;
}

function getExpensesForUser(user) {
  const savedExpenses =
    localStorage.getItem(
      getExpenseKey(user)
    );

  if (savedExpenses) {
    return JSON.parse(savedExpenses);
  }

  return sampleExpenses;
}

function App() {

  // =========================================
  // CURRENT USER
  // =========================================

  const [currentUser, setCurrentUser] =
    useState(() => {
      const savedUser =
        localStorage.getItem(
          "spendwise-current-user"
        );

      if (!savedUser) {
        return null;
      }

      const user = JSON.parse(savedUser);

      // Old sessions without lastActivity
      if (!user.lastActivity) {
        return null;
      }

      const sessionAge =
        Date.now() - user.lastActivity;

      if (sessionAge >= SESSION_TIMEOUT) {
        localStorage.removeItem(
          "spendwise-current-user"
        );

        return null;
      }

      return user;
    });

  // =========================================
  // PAGE
  // =========================================

  const [currentPage, setCurrentPage] =
    useState("dashboard");

  // =========================================
  // LOGOUT CONFIRMATION
  // =========================================

  const [showLogoutConfirmation, setShowLogoutConfirmation] =
    useState(false);

  // =========================================
  // EXPENSES
  // =========================================

  const [expenses, setExpenses] =
    useState(() => {

      const savedUser =
        localStorage.getItem(
          "spendwise-current-user"
        );

      if (!savedUser) {
        return [];
      }

      const user = JSON.parse(savedUser);

      return getExpensesForUser(user);
    });

  // =========================================
  // SAVE EXPENSES
  // =========================================

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    localStorage.setItem(
      getExpenseKey(currentUser),
      JSON.stringify(expenses)
    );
  }, [expenses, currentUser]);

  // =========================================
  // LOGIN
  // =========================================

  function handleLogin(user) {
    const sessionUser = {
      ...user,
      lastActivity: Date.now(),
    };

    setCurrentUser(sessionUser);

    localStorage.setItem(
      "spendwise-current-user",
      JSON.stringify(sessionUser)
    );

    setExpenses(
      getExpensesForUser(sessionUser)
    );

    setCurrentPage("dashboard");
  }

  // =========================================
  // SESSION ACTIVITY
  // =========================================

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    let activityTimeout;

    function updateActivity() {
      clearTimeout(activityTimeout);

      activityTimeout = setTimeout(() => {

        const updatedUser = {
          ...currentUser,
          lastActivity: Date.now(),
        };

        setCurrentUser(updatedUser);

        localStorage.setItem(
          "spendwise-current-user",
          JSON.stringify(updatedUser)
        );

      }, 1000);
    }

    const events = [
      "click",
      "keydown",
      "mousemove",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(
        event,
        updateActivity
      );
    });

    return () => {
      clearTimeout(activityTimeout);

      events.forEach((event) => {
        window.removeEventListener(
          event,
          updateActivity
        );
      });
    };
  }, [currentUser]);

  // =========================================
  // SESSION EXPIRATION CHECK
  // =========================================

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const interval = setInterval(() => {

      const savedUser =
        localStorage.getItem(
          "spendwise-current-user"
        );

      if (!savedUser) {
        return;
      }

      const user = JSON.parse(savedUser);

      const inactiveTime =
        Date.now() -
        user.lastActivity;

      if (
        inactiveTime >=
        SESSION_TIMEOUT
      ) {
        setCurrentUser(null);
        setExpenses([]);
        setCurrentPage("dashboard");

        localStorage.removeItem(
          "spendwise-current-user"
        );

        alert(
          "Your session has expired due to inactivity."
        );
      }

    }, 60 * 1000);

    return () =>
      clearInterval(interval);

  }, [currentUser]);

  // =========================================
  // LOGOUT
  // =========================================

  function handleLogoutRequest() {
    setShowLogoutConfirmation(true);
  }

  function handleLogout() {
    setCurrentUser(null);
    setExpenses([]);
    setCurrentPage("dashboard");
    setShowLogoutConfirmation(false);

    localStorage.removeItem(
      "spendwise-current-user"
    );
  }

  // =========================================
  // PROFILE UPDATE
  // =========================================

  function handleProfileUpdate(updatedUser) {

    const userWithSession = {
      ...updatedUser,
      lastActivity: Date.now(),
    };

    setCurrentUser(userWithSession);

    localStorage.setItem(
      "spendwise-current-user",
      JSON.stringify(userWithSession)
    );

    const savedAccount =
      localStorage.getItem(
        "spendwise-user"
      );

    if (savedAccount) {
      const account =
        JSON.parse(savedAccount);

      localStorage.setItem(
        "spendwise-user",
        JSON.stringify({
          ...account,
          name: updatedUser.name,
          email: updatedUser.email,
          id:
            account.id ||
            updatedUser.id,
        })
      );
    }
  }

  // =========================================
  // FORM STATE
  // =========================================

  const [showForm, setShowForm] =
    useState(false);

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [date, setDate] =
    useState("");

  const [error, setError] =
    useState("");

  // =========================================
  // SEARCH / FILTER
  // =========================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // =========================================
  // CALCULATIONS
  // =========================================

  const totalSpent =
    expenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  const transactionCount =
    expenses.length;

  const averageExpense =
    transactionCount > 0
      ? totalSpent /
      transactionCount
      : 0;

  const highestExpense =
    transactionCount > 0
      ? Math.max(
        ...expenses.map(
          (expense) =>
            expense.amount
        )
      )
      : 0;

  // =========================================
  // DELETE
  // =========================================

  function handleDeleteExpense(id) {
    setExpenses(
      (previousExpenses) =>
        previousExpenses.filter(
          (expense) =>
            expense.id !== id
        )
    );
  }

  // =========================================
  // UPDATE
  // =========================================

  function handleUpdateExpense(
    updatedExpense
  ) {
    setExpenses(
      (previousExpenses) =>
        previousExpenses.map(
          (expense) =>
            expense.id ===
              updatedExpense.id
              ? updatedExpense
              : expense
        )
    );
  }

  // =========================================
  // SEARCH + FILTER
  // =========================================

  const filteredExpenses =
    expenses.filter(
      (expense) => {

        const matchesSearch =
          expense.description
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesCategory =
          selectedCategory ===
          "All" ||
          expense.category ===
          selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  // =========================================
  // CATEGORY TOTALS
  // =========================================

  const categoryTotals =
    expenses.reduce(
      (totals, expense) => {

        if (
          totals[
          expense.category
          ]
        ) {
          totals[
            expense.category
          ] += expense.amount;
        } else {
          totals[
            expense.category
          ] = expense.amount;
        }

        return totals;

      },
      {}
    );

  const highestCategory =
    Object.entries(
      categoryTotals
    ).reduce(
      (highest, current) => {

        if (
          current[1] >
          highest[1]
        ) {
          return current;
        }

        return highest;
      },
      ["None", 0]
    );

  const highestCategoryName =
    highestCategory[0];

  const highestCategoryAmount =
    highestCategory[1];

  // =========================================
  // ADD EXPENSE
  // =========================================

  function handleSubmit(event) {
    event.preventDefault();

    if (
      description.trim() === "" ||
      category === "" ||
      amount === "" ||
      date === ""
    ) {
      setError(
        "Please fill in all fields."
      );

      return;
    }

    if (Number(amount) <= 0) {
      setError(
        "Amount must be greater than 0."
      );

      return;
    }

    const newExpense = {
      id: Date.now(),
      description:
        description.trim(),
      category,
      amount: Number(amount),
      date,
    };

    setExpenses(
      (previousExpenses) => [
        newExpense,
        ...previousExpenses,
      ]
    );

    setDescription("");
    setCategory("");
    setAmount("");
    setDate("");
    setError("");
    setShowForm(false);
  }

  // =========================================
  // PROTECTED DASHBOARD
  // =========================================

  if (!currentUser) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  // =========================================
  // PROFILE PAGE
  // =========================================

  if (
    currentPage === "profile"
  ) {
    return (
      <>
        <Navbar
          user={currentUser}
          onProfile={() =>
            setCurrentPage("profile")
          }
          onLogoutRequest={
            handleLogoutRequest
          }
        />

        <Profile
          user={currentUser}
          onSave={
            handleProfileUpdate
          }
          onLogout={
            handleLogoutRequest
          }
          onBack={() =>
            setCurrentPage("dashboard")
          }
        />

        {showLogoutConfirmation && (
          <LogoutConfirmation
            onConfirm={handleLogout}
            onCancel={() =>
              setShowLogoutConfirmation(
                false
              )
            }
          />
        )}
      </>
    );
  }

  // =========================================
  // DASHBOARD
  // =========================================

  const monthlyBudget = 30000;
  const budgetPercent = Math.min(
    Math.round((totalSpent / monthlyBudget) * 100),
    100
  );
  const remainingBudget = Math.max(monthlyBudget - totalSpent, 0);

  return (
    <div className="app-container">
      <Navbar
        user={currentUser}
        onProfile={() => setCurrentPage("profile")}
        onLogoutRequest={handleLogoutRequest}
      />

      <main className="dashboard" id="dashboard">
        {/* =====================================
            FINANCIAL HERO BANNER (REAL WORKSPACE IMAGE)
        ===================================== */}
        <section className="dashboard-hero-card">
          <div className="hero-text-side">
            <div className="hero-pill-badge">
              <span>✦</span> PERSONAL WEALTH DASHBOARD
            </div>

            <h1>
              Welcome back, <span>{currentUser.name}</span>
            </h1>

            <p className="hero-subtext">
              Here is your real-time spending pulse for this month. Stay disciplined,
              track every transaction, and grow your savings.
            </p>

            <div className="hero-metrics-pill-row">
              <div className="hero-metric-chip">
                <small>Total Outflow</small>
                <strong>₹{totalSpent.toLocaleString()}</strong>
              </div>

              <div className="hero-metric-chip">
                <small>Budget Left</small>
                <strong>₹{remainingBudget.toLocaleString()}</strong>
              </div>

              <div className="hero-metric-chip">
                <small>Transactions</small>
                <strong>{transactionCount} logged</strong>
              </div>
            </div>

            <div className="hero-cta-row">
              <button
                className="add-expense-button hero-cta"
                onClick={() => {
                  setShowForm(!showForm);
                  setError("");
                }}
              >
                <span>{showForm ? "✕" : "+"}</span>
                {showForm ? "Close Form" : "Add New Expense"}
              </button>

              <a href="#analytics" className="hero-secondary-btn">
                <span>📊</span> View Breakdown
              </a>
            </div>
          </div>

          <div className="hero-image-side">
            <div className="hero-image-frame">
              <img
                src="/images/dashboard-banner.jpg"
                alt="Financial planning workspace with charts and notebook"
                className="hero-dashboard-img"
              />
              <div className="hero-floating-glass-card">
                <div className="glass-icon">₹</div>
                <div>
                  <small>Smart Budget Status</small>
                  <strong>{budgetPercent}% of monthly limit</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================
            MONTHLY BUDGET PROGRESS BAR
        ===================================== */}
        <section className="budget-progress-section">
          <div className="budget-progress-header">
            <div>
              <h3>Monthly Spending Target</h3>
              <p>Budget: ₹{monthlyBudget.toLocaleString()} / month</p>
            </div>
            <div className="budget-status-pill">
              {budgetPercent < 70 ? (
                <span className="status-good">✓ On Track ({budgetPercent}%)</span>
              ) : budgetPercent < 90 ? (
                <span className="status-warning">⚠️ High Usage ({budgetPercent}%)</span>
              ) : (
                <span className="status-danger">🚨 Budget Alert ({budgetPercent}%)</span>
              )}
            </div>
          </div>

          <div className="budget-bar-track">
            <div
              className={`budget-bar-fill ${
                budgetPercent > 90
                  ? "fill-danger"
                  : budgetPercent > 70
                  ? "fill-warning"
                  : "fill-good"
              }`}
              style={{ width: `${budgetPercent}%` }}
            ></div>
          </div>

          <div className="budget-bar-labels">
            <span>₹{totalSpent.toLocaleString()} spent</span>
            <span>₹{remainingBudget.toLocaleString()} remaining</span>
          </div>
        </section>

        {/* =====================================
            ADD EXPENSE FORM (EXPANDABLE)
        ===================================== */}
        {showForm && (
          <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-header-bar">
              <div>
                <h2>Add New Expense</h2>
                <p>Record a new transaction to update your budget immediately.</p>
              </div>
              <button
                type="button"
                className="close-form-btn"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-grid">
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="e.g., Grocery Shopping, Uber, Dinner"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Food">🍔 Food & Dining</option>
                  <option value="Transportation">🚗 Transportation</option>
                  <option value="Shopping">🛍️ Shopping</option>
                  <option value="Bills">💡 Bills & Utilities</option>
                  <option value="Entertainment">🎬 Entertainment</option>
                  <option value="Health">❤️ Health & Fitness</option>
                  <option value="Other">📦 Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount (₹)</label>
                <div className="amount-input-box">
                  <span className="currency-prefix">₹</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 500"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
            </div>

            <div className="form-footer-actions">
              <button type="submit" className="save-expense-button">
                ✓ Save Expense
              </button>
              <button
                type="button"
                className="cancel-form-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* =====================================
            SUMMARY CARDS (KPI GRID)
        ===================================== */}
        <section className="summary-grid">
          <SummaryCard
            title="Total Spent"
            value={`₹${totalSpent.toLocaleString()}`}
            description="Overall monthly outflow"
            icon="₹"
          />

          <SummaryCard
            title="Transactions"
            value={transactionCount}
            description="Total logged entries"
            icon="▤"
          />

          <SummaryCard
            title="Average Expense"
            value={`₹${Math.round(averageExpense).toLocaleString()}`}
            description="Per transaction"
            icon="◈"
          />

          <SummaryCard
            title="Highest Expense"
            value={`₹${highestExpense.toLocaleString()}`}
            description="Single biggest expense"
            icon="↑"
          />
        </section>

        {/* =====================================
            SEARCH & CATEGORY FILTER BAR
        ===================================== */}
        <section className="expense-controls">
          <div className="search-box-wrapper">
            <span className="search-box-icon">🔍</span>
            <input
              type="text"
              placeholder="Search expenses by description..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="category-filter"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food & Dining</option>
            <option value="Transportation">Transportation</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills & Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health & Fitness</option>
            <option value="Other">Other</option>
          </select>
        </section>

        {/* =====================================
            TRANSACTIONS LIST
        ===================================== */}
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={handleDeleteExpense}
          onUpdate={handleUpdateExpense}
        />

        {/* =====================================
            DUAL SPOTLIGHT: HIGHEST CATEGORY & REAL SAVINGS GOAL IMAGE
        ===================================== */}
        <section className="insights-dual-grid">
          {/* Card 1: Highest Spending Category */}
          <div className="highest-category-card">
            <div className="highest-card-top">
              <span className="insight-badge">SPENDING SPOTLIGHT</span>
              <p className="insight-label">Top Outflow Category</p>
              <h2>{highestCategoryName}</h2>
              <p className="insight-description">
                You spent the most on <strong>{highestCategoryName}</strong> (₹
                {highestCategoryAmount.toLocaleString()}).
              </p>
            </div>

            <div className="highest-category-amount">
              ₹{highestCategoryAmount.toLocaleString()}
            </div>

            <div className="category-tip-box">
              <span>💡</span>
              <small>
                {highestCategoryName === "Food"
                  ? "Tip: Preparing home-cooked meals 2-3 times a week can trim this by up to 25%."
                  : highestCategoryName === "Transportation"
                  ? "Tip: Look into monthly metro passes or ride-sharing to reduce commute costs."
                  : highestCategoryName === "Shopping"
                  ? "Tip: Use the 24-hour rule before buying non-essentials to prevent impulse buys."
                  : "Tip: Regular reviews help you allocate more funds into compounding savings."}
              </small>
            </div>
          </div>

          {/* Card 2: Smart Wealth & Savings Goal (Real 3D Frosted Glass Piggy Bank Image) */}
          <div className="savings-goal-card">
            <div className="savings-goal-content">
              <span className="goal-badge">✦ WEALTH GOAL</span>
              <h3>Emergency Fund Target</h3>
              <p>
                Allocate at least 20% of your earnings into an emergency reserve
                covering 3–6 months of essential bills.
              </p>

              <div className="goal-stats-row">
                <div>
                  <small>Target Fund</small>
                  <strong>₹50,000</strong>
                </div>
                <div>
                  <small>Saved So Far</small>
                  <strong className="text-emerald">₹35,000</strong>
                </div>
                <div>
                  <small>Progress</small>
                  <strong className="text-indigo">70%</strong>
                </div>
              </div>

              <div className="savings-progress-bar">
                <div className="savings-progress-fill" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div className="savings-goal-image-wrapper">
              <img
                src="/images/savings-goal.jpg"
                alt="3D Glowing Glass Piggy Bank and Financial Growth"
                className="savings-goal-img"
              />
            </div>
          </div>
        </section>

        {/* =====================================
            CATEGORY ANALYTICS
        ===================================== */}
        <CategoryAnalytics categoryTotals={categoryTotals} />

        {/* =====================================
            SMART FINANCIAL HABITS FEATURE STRIP
        ===================================== */}
        <section className="finance-habits-banner">
          <div className="habits-header">
            <span className="section-eyebrow">FINANCIAL FREEDOM</span>
            <h2>Proven Principles for Smarter Spending</h2>
            <p>Simple money rules followed by successful budgeters.</p>
          </div>

          <div className="habits-grid">
            <div className="habit-card">
              <div className="habit-icon">📊</div>
              <h4>50 / 30 / 20 Rule</h4>
              <p>
                Allocate 50% for Needs (rent, bills), 30% for Wants (dining, hobbies),
                and 20% into Savings & Investments.
              </p>
            </div>

            <div className="habit-card">
              <div className="habit-icon">🛡️</div>
              <h4>Zero-Based Budget</h4>
              <p>
                Give every single rupee a job before the month starts so unassigned
                cash doesn't get spent unconsciously.
              </p>
            </div>

            <div className="habit-card">
              <div className="habit-icon">⚡</div>
              <h4>The 24-Hour Buffer</h4>
              <p>
                Hold off on impulsive online shopping for 24 hours. Most unnecessary
                urges fade after a day.
              </p>
            </div>
          </div>
        </section>
      </main>

      {showLogoutConfirmation && (
        <LogoutConfirmation
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirmation(false)}
        />
      )}
    </div>
  );
}

// =========================================
// LOGOUT CONFIRMATION
// =========================================

function LogoutConfirmation({
  onConfirm,
  onCancel,
}) {
  return (
    <div className="modal-overlay">

      <div className="logout-modal">

        <div className="logout-modal-icon">
          ↪
        </div>

        <h2>
          Logout from SpendWise?
        </h2>

        <p>
          Are you sure you want to log
          out of your account?
        </p>

        <div className="logout-modal-actions">

          <button
            className="cancel-logout-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-logout-button"
            onClick={onConfirm}
          >
            Yes, Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;