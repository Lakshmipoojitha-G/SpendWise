function SummaryCard({
    title,
    value,
    description,
    icon,
}) {
    return (
        <div className="summary-card">

            <div className="summary-top">
                <div className="summary-icon">
                    {icon}
                </div>

                <span className="summary-dot"></span>
            </div>

            <p className="summary-title">
                {title}
            </p>

            <h2 className="summary-value">
                {value}
            </h2>

            <p className="summary-description">
                {description}
            </p>

        </div>
    );
}

export default SummaryCard;