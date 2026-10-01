import { useState } from "react";

function Navbar({
    user,
    onProfile,
    onLogoutRequest,
}) {
    const [showProfile, setShowProfile] = useState(false);

    const userName = user?.name || "User";
    const userEmail = user?.email || "user@spendwise.com";

    const initials = userName
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "SW";

    function openProfile() {
        setShowProfile(false);
        onProfile();
    }

    function requestLogout() {
        setShowProfile(false);
        onLogoutRequest();
    }

    return (
        <nav className="navbar">
            <div className="navbar-inner">

                <a
                    href="#dashboard"
                    className="logo-area"
                    onClick={() => onProfile(false)}
                >
                    <div className="logo-icon">₹</div>

                    <div className="logo-text">
                        <div className="logo">
                            SpendWise
                        </div>

                        <span className="logo-subtitle">
                            Personal Finance
                        </span>
                    </div>
                </a>

                <div className="nav-links">

                    <a
                        href="#dashboard"
                        className="nav-link active-link"
                        onClick={() => onProfile(false)}
                    >
                        <span>⌂</span>
                        Dashboard
                    </a>

                    <a
                        href="#transactions"
                        className="nav-link"
                        onClick={() => onProfile(false)}
                    >
                        <span>▤</span>
                        Transactions
                    </a>

                    <a
                        href="#analytics"
                        className="nav-link"
                        onClick={() => onProfile(false)}
                    >
                        <span>◈</span>
                        Analytics
                    </a>

                </div>

                <div className="profile-container">

                    <button
                        className="profile-button"
                        onClick={() =>
                            setShowProfile(!showProfile)
                        }
                    >
                        <div className="profile-avatar">
                            {initials}
                        </div>

                        <div className="profile-name">
                            {userName}
                        </div>

                        <span className="profile-arrow">
                            {showProfile ? "▲" : "▼"}
                        </span>
                    </button>

                    {showProfile && (
                        <div className="profile-dropdown">

                            <div className="profile-header">

                                <div className="profile-avatar large">
                                    {initials}
                                </div>

                                <div>
                                    <strong>
                                        {userName}
                                    </strong>

                                    <span>
                                        {userEmail}
                                    </span>
                                </div>

                            </div>

                            <div className="profile-divider"></div>

                            <button
                                className="dropdown-action"
                                onClick={openProfile}
                            >
                                <span>👤</span>
                                My Profile
                            </button>

                            <button
                                className="logout-button"
                                onClick={requestLogout}
                            >
                                <span>↪</span>
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;