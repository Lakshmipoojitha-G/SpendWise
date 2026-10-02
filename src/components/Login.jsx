import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function fillDemoAccount() {
        setEmail("demo@spendwise.com");
        setPassword("123456");
        setError("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        if (
            email !== "demo@spendwise.com" ||
            password !== "123456"
        ) {
            setError(
                "Invalid credentials. Please use the demo account."
            );
            return;
        }

        onLogin({
            id: "demo-user-001",
            name: "SpendWise User",
            email,
        });
    }

    return (
        <div className="login-page">
            {/* BACKGROUND DECORATION */}

            <div className="login-background">
                <div className="glow glow-one"></div>
                <div className="glow glow-two"></div>
                <div className="glow glow-three"></div>

                <div className="grid-pattern"></div>
            </div>

            {/* LEFT VISUAL SIDE */}

            <div className="login-visual">
                <div className="visual-content">
                    <div className="login-brand">
                        <div className="brand-mark large">
                            S
                        </div>

                        <span>
                            Spend<span>Wise</span>
                        </span>
                    </div>

                    <span className="eyebrow light">
                        PERSONAL FINANCE INTELLIGENCE
                    </span>

                    <h1>
                        Your money.
                        <br />
                        <span>Your decisions.</span>
                    </h1>

                    <p>
                        Understand your spending, stay within your
                        budget and build better financial habits.
                    </p>

                    {/* FEATURE PILLS */}

                    <div className="feature-pills">
                        <div>
                            <span>✓</span>
                            Track expenses
                        </div>

                        <div>
                            <span>✓</span>
                            Smart insights
                        </div>

                        <div>
                            <span>✓</span>
                            Budget better
                        </div>
                    </div>
                </div>

                {/* ANIMATED FINANCE VISUAL */}

                <div className="finance-visual">
                    {/* MAIN CARD */}

                    <div className="money-card">
                        <div className="money-card-top">
                            <span>MONTHLY SPENDING</span>
                            <span>•••</span>
                        </div>

                        <strong>₹24,580</strong>

                        <div className="mini-chart">
                            <span style={{ height: "35%" }}></span>
                            <span style={{ height: "55%" }}></span>
                            <span style={{ height: "42%" }}></span>
                            <span style={{ height: "72%" }}></span>
                            <span style={{ height: "60%" }}></span>
                            <span style={{ height: "86%" }}></span>
                            <span style={{ height: "75%" }}></span>
                            <span style={{ height: "95%" }}></span>
                        </div>

                        <div className="money-card-bottom">
                            <span>This month</span>
                            <strong>+12.4%</strong>
                        </div>
                    </div>

                    {/* FLOATING BALANCE CARD */}

                    <div className="floating-finance-card balance-card">
                        <div className="floating-icon">₹</div>

                        <div>
                            <small>Available</small>
                            <strong>₹18,420</strong>
                        </div>
                    </div>

                    {/* FLOATING BUDGET CARD */}

                    <div className="floating-finance-card budget-floating">
                        <div className="budget-circle">
                            <span>72%</span>
                        </div>

                        <div>
                            <small>Budget used</small>
                            <strong>On track</strong>
                        </div>
                    </div>

                    {/* FLOATING COINS */}

                    <div className="coin coin-one">₹</div>
                    <div className="coin coin-two">₹</div>
                    <div className="coin coin-three">₹</div>
                </div>
            </div>

            {/* LOGIN SIDE */}

            <div className="login-panel">
                <div className="login-box">
                    <div className="mobile-login-brand">
                        <div className="brand-mark">
                            S
                        </div>

                        <span>
                            Spend<span>Wise</span>
                        </span>
                    </div>

                    <div className="login-heading">
                        <span className="eyebrow">
                            WELCOME BACK
                        </span>

                        <h2>
                            Let's make your
                            <br />
                            money work smarter.
                        </h2>

                        <p>
                            Sign in to continue to your financial
                            dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label>Email address</label>

                            <div className="input-wrapper">
                                <span>✉</span>

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label>Password</label>

                            <div className="input-wrapper">
                                <span>⌑</span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="login-error">
                                <span>!</span>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-submit"
                        >
                            <span>Sign in to SpendWise</span>
                            <span>→</span>
                        </button>
                    </form>

                    {/* DEMO LOGIN */}

                    <div className="demo-section">
                        <div className="demo-divider">
                            <span>OR</span>
                        </div>

                        <button
                            type="button"
                            className="demo-button"
                            onClick={fillDemoAccount}
                        >
                            <span className="demo-button-icon">
                                ✦
                            </span>

                            <span>
                                <strong>Use Demo Account</strong>
                                <small>
                                    Fill demo credentials automatically
                                </small>
                            </span>

                            <span className="demo-arrow">
                                →
                            </span>
                        </button>
                    </div>

                    <div className="demo-details">
                        <span>Demo credentials</span>

                        <div>
                            <code>
                                demo@spendwise.com
                            </code>

                            <code>123456</code>
                        </div>
                    </div>

                    <p className="login-footer">
                        SpendWise · Personal Finance Dashboard
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;