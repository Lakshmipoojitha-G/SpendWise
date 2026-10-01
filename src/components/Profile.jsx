import { useEffect, useState } from "react";

function Profile({
    user,
    onSave,
    onLogout,
    onBack,
}) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
    }, [user]);

    function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        if (!trimmedName || !trimmedEmail) {
            setError("Name and email are required.");
            return;
        }

        if (!trimmedEmail.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        onSave({
            ...user,
            name: trimmedName,
            email: trimmedEmail,
        });

        setMessage("Profile updated successfully.");
    }

    const initials = name
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <main className="profile-page">
            <div className="profile-page-header">
                <div>
                    <span className="section-eyebrow">✦ ACCOUNT & SECURITY</span>
                    <h1>User Profile</h1>
                    <p>
                        Manage your personal details, preferences, and session controls.
                    </p>
                </div>

                <button
                    className="profile-back-button"
                    onClick={onBack}
                >
                    ← Back to Dashboard
                </button>
            </div>

            <div className="profile-card">
                {/* Profile Cover Banner with Real Image */}
                <div className="profile-cover">
                    <img
                        src="/images/profile-banner.jpg"
                        alt="Profile Cover Banner"
                        className="profile-cover-img"
                    />
                    <div className="profile-cover-badge">
                        <span>🛡️</span> Verified Local Account
                    </div>
                </div>

                <div className="profile-avatar-row">
                    <div className="profile-page-avatar">
                        {initials}
                    </div>

                    <div className="profile-user-summary">
                        <div className="profile-name-tag">
                            <h2>{user.name}</h2>
                            <span className="profile-plan-pill">PRO PLAN</span>
                        </div>
                        <p>{user.email}</p>
                        <small className="profile-id-text">
                            User ID: <code>{user.id || "demo-user"}</code>
                        </small>
                    </div>
                </div>

                <div className="profile-stats-grid">
                    <div className="profile-stat-box">
                        <span className="stat-label">Currency</span>
                        <strong>₹ INR (Indian Rupee)</strong>
                    </div>
                    <div className="profile-stat-box">
                        <span className="stat-label">Storage</span>
                        <strong>Client Encrypted (Local)</strong>
                    </div>
                    <div className="profile-stat-box">
                        <span className="stat-label">Auto-Timeout</span>
                        <strong>30 Minutes Inactivity</strong>
                    </div>
                </div>

                <div className="profile-divider"></div>

                <form
                    className="profile-form"
                    onSubmit={handleSubmit}
                >
                    <h3>Personal Information</h3>

                    {message && (
                        <div className="profile-success-alert">
                            <span>✓</span>
                            <p>{message}</p>
                        </div>
                    )}

                    {error && (
                        <div className="profile-error-alert">
                            <span>⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="profile-form-grid">
                        <div className="form-group">
                            <label htmlFor="profile-name">Full Name</label>
                            <input
                                id="profile-name"
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="profile-email">Email Address</label>
                            <input
                                id="profile-email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="profile-save-button"
                    >
                        Save Profile Changes
                    </button>
                </form>

                <div className="profile-divider"></div>

                <div className="profile-session-info">
                    <div>
                        <h3>Session Security</h3>
                        <p>
                            To protect your financial data, SpendWise automatically locks
                            after 30 minutes of inactivity.
                        </p>
                    </div>

                    <button
                        className="profile-logout-button"
                        onClick={onLogout}
                    >
                        <span>↪</span> Logout
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Profile;