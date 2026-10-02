import { useState } from "react";

function Profile({ user, onSave, onLogout, onBack }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!name.trim() || !email.trim()) {
            setError("Name and email are required.");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email.");
            return;
        }

        onSave({
            ...user,
            name: name.trim(),
            email: email.trim(),
        });

        setError("");
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <button className="back-button" onClick={onBack}>
                    ← Back to Dashboard
                </button>

                <div className="profile-header">
                    <div className="large-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <span className="eyebrow">ACCOUNT</span>
                        <h1>My Profile</h1>
                        <p>Manage your SpendWise account information.</p>
                    </div>
                </div>

                <div className="profile-grid">
                    <section className="profile-card">
                        <span className="eyebrow">PERSONAL DETAILS</span>

                        <h2>Account information</h2>

                        <form onSubmit={handleSubmit}>
                            <label>Name</label>

                            <input
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />

                            <label>Email</label>

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />

                            {error && (
                                <div className="form-error">{error}</div>
                            )}

                            <button className="primary-button">
                                Save Changes
                            </button>
                        </form>
                    </section>

                    <section className="profile-card account-card">
                        <span className="eyebrow">ACCOUNT STATUS</span>

                        <div className="status-row">
                            <span>Account</span>
                            <strong>Active</strong>
                        </div>

                        <div className="status-row">
                            <span>Authentication</span>
                            <strong>Demo Account</strong>
                        </div>

                        <div className="status-row">
                            <span>Data storage</span>
                            <strong>Local Device</strong>
                        </div>

                        <button
                            className="danger-button full"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Profile;