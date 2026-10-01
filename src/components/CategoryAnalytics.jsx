function CategoryAnalytics({
    categoryTotals,
}) {
    const categories =
        Object.entries(categoryTotals);

    const totalSpending =
        categories.reduce(
            (total, [, amount]) =>
                total + amount,
            0
        );


    const categoryIcons = {
        Food: "🍔",
        Transportation: "🚗",
        Shopping: "🛍️",
        Bills: "💡",
        Entertainment: "🎬",
        Health: "❤️",
        Other: "📦",
    };


    return (
        <section
            className="analytics-section"
            id="analytics"
        >

            <div className="analytics-heading">

                <div>

                    <span className="section-eyebrow">
                        BREAKDOWN
                    </span>

                    <h2>
                        Spending by Category
                    </h2>

                    <p>
                        See where most of your
                        money is going.
                    </p>

                </div>


                <div className="analytics-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ₹
                        {totalSpending.toLocaleString()}
                    </strong>

                </div>

            </div>


            <div className="category-list">

                {categories.length === 0 ? (

                    <div className="empty-analytics">

                        <div className="empty-analytics-icon">
                            ₹
                        </div>

                        <p>
                            No spending data
                            available.
                        </p>

                    </div>

                ) : (

                    categories.map(
                        ([category, amount]) => {

                            const percentage =
                                totalSpending > 0
                                    ? (amount /
                                        totalSpending) *
                                    100
                                    : 0;

                            return (
                                <div
                                    className="category-card"
                                    key={category}
                                >

                                    <div className="category-header">

                                        <div className="category-title">

                                            <div
                                                className="category-icon"
                                                aria-hidden="true"
                                            >
                                                {categoryIcons[
                                                    category
                                                ] || "📦"}
                                            </div>

                                            <div>

                                                <p className="category-name">
                                                    {category}
                                                </p>

                                                <h3>
                                                    ₹
                                                    {amount.toLocaleString()}
                                                </h3>

                                            </div>

                                        </div>


                                        <strong className="category-percentage">
                                            {percentage.toFixed(
                                                1
                                            )}
                                            %
                                        </strong>

                                    </div>


                                    <div
                                        className="progress-bar"
                                        aria-label={`${category} represents ${percentage.toFixed(
                                            1
                                        )}% of total spending`}
                                    >

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        ></div>

                                    </div>

                                </div>
                            );
                        }
                    )

                )}

            </div>

        </section>
    );
}

export default CategoryAnalytics;