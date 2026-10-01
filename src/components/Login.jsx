import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function performLogin(userToLogin) {
        const loggedInUser = {
            id: userToLogin.id || `user-${Date.now()}`,
            name: userToLogin.name,
            email: userToLogin.email,
        };

        const updatedUser = {
            ...userToLogin,
            id: loggedInUser.id,
        };

        localStorage.setItem(
            "spendwise-user",
            JSON.stringify(updatedUser)
        );

        onLogin(loggedInUser);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (email.trim() === "" || password === "") {
            setError("Please enter both email and password.");
            return;
        }

        const savedUser = localStorage.getItem("spendwise-user");

        if (!savedUser) {
            // If user hasn't created or saved yet, check if matching demo or prompt
            if (
                email.trim().toLowerCase() === "demo@spendwise.com" &&
                password === "123456"
            ) {
                useDemoAccount(true);
                return;
            }
            setError("No account found. Use the Demo Account button below to test.");
            return;
        }

        const user = JSON.parse(savedUser);

        if (
            user.email.toLowerCase() !== email.trim().toLowerCase() ||
            user.password !== password
        ) {
            setError("Invalid email or password. Please verify your credentials.");
            return;
        }

        performLogin(user);
    }

    function useDemoAccount(autoLogin = false) {
        const demoUser = {
            id: "demo-user-001",
            name: "SpendWise User",
            email: "demo@spendwise.com",
            password: "123456",
        };

        localStorage.setItem(
            "spendwise-user",
            JSON.stringify(demoUser)
        );

        setEmail(demoUser.email);
        setPassword(demoUser.password);
        setError("");

        if (autoLogin) {
            performLogin(demoUser);
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Visual Showcase Left Column */}
                <div className="login-showcase">
                    <div className="login-showcase-overlay"></div>
                    <img
                        src="/images/login-hero.jpg"
                        alt="SpendWise Financial Intelligence Platform"
                        className="login-showcase-image"
                    />

                    <div className="login-showcase-content">
                        <div className="login-badge">
                            <span>✦</span> FINANCIAL INTELLIGENCE
                        </div>

                        <h2>Master your money with clarity & confidence.</h2>
                        <p>
                            Track every rupee, visualize spending habits, and build
                            sustainable wealth with real-time financial analytics.
                        </p>

                        <div className="login-features">
                            <div className="feature-item">
                                <span className="feature-icon">📊</span>
                                <div>
                                    <strong>Instant Categorization</strong>
                                    <small>Organize food, travel, bills & shopping</small>
                                </div>
                            </div>

                            <div className="feature-item">
                                <span className="feature-icon">💡</span>
                                <div>
                                    <strong>Smart Budget Insights</strong>
                                    <small>Spot highest expenses & trends immediately</small>
                                </div>
                            </div>

                            <div className="feature-item">
                                <span className="feature-icon">🔒</span>
                                <div>
                                    <strong>Private & Local</strong>
                                    <small>Your financial records stay secure on your device</small>
                                </div>
                            </div>
                        </div>

                        <div className="login-testimonial-pill">
                            <div className="trust-avatars">
                                <span>👤</span>
                                <span>👩</span>
                                <span>🧑</span>
                            </div>
                            <div>
                                <strong>₹10,00,000+ Tracked</strong>
                                <small>Join thousands taking charge of their budget</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login Form Right Column */}
                <div className="login-form-panel">
                    <div className="login-brand">
                        <div className="login-logo-box">₹</div>
                        <div>
                            <span className="brand-title">SpendWise</span>
                            <span className="brand-tag">Personal Wealth & Budget</span>
                        </div>
                    </div>

                    <div className="login-header-text">
                        <h1>Welcome Back</h1>
                        <p>Sign in to your account or jump in using the test account.</p>
                    </div>

                    {/* Quick Demo Access Bar */}
                    <div className="quick-demo-card">
                        <div className="demo-info">
                            <span className="demo-chip">DEMO READY</span>
                            <strong>Try SpendWise Instantly</strong>
                            <p>No registration needed. Explore dashboard with test expenses.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => useDemoAccount(true)}
                            className="quick-demo-button"
                        >
                            ⚡ 1-Click Demo Login
                        </button>
                    </div>

                    <div className="login-divider">
                        <span>OR SIGN IN WITH CREDENTIALS</span>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {error && (
                            <div className="login-error-alert" role="alert">
                                <span>⚠️</span>
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="login-email">Email Address</label>
                            <div className="input-with-icon">
                                <span className="input-icon">✉</span>
                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="demo@spendwise.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <div className="input-with-icon">
                                <span className="input-icon">🔒</span>
                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder="••••••"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button type="submit" className="login-submit-button">
                            Sign In to SpendWise →
                        </button>
                    </form>

                    <div className="login-footer-hint">
                        <span>Demo credentials: </span>
                        <code>demo@spendwise.com</code> / <code>123456</code>
                        <button
                            type="button"
                            onClick={() => useDemoAccount(false)}
                            className="fill-creds-btn"
                        >
                            (Fill Inputs)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;