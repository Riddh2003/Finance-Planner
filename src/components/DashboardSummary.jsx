import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format, startOfMonth, endOfMonth } from "date-fns";

export function DashboardSummary({ transactions }) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Filter transactions for the current month
    const currentMonthTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
            transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear
        );
    });

    // Calculate total expenses for the current month
    const totalExpenses = currentMonthTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );

    // Get top spending category
    const categoryTotals = currentMonthTransactions.reduce((acc, transaction) => {
        const category = transaction.category || 'Other';
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
    }, {});

    let topCategory = "None";
    let topCategoryAmount = 0;

    Object.entries(categoryTotals).forEach(([category, amount]) => {
        if (amount > topCategoryAmount) {
            topCategory = category;
            topCategoryAmount = amount;
        }
    });

    // Get most recent transactions (top 3)
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    // Format the month name
    const monthName = format(today, 'MMMM yyyy');

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Expenses ({monthName})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                        For the period {format(startOfMonth(today), 'MMM d')} - {format(endOfMonth(today), 'MMM d')}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Top Spending Category
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{topCategory}</div>
                    <p className="text-xs text-muted-foreground">
                        ${topCategoryAmount.toFixed(2)} spent this month
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Recent Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {recentTransactions.length > 0 ? (
                        <div className="space-y-2">
                            {recentTransactions.map((transaction) => (
                                <div key={transaction.id} className="flex justify-between items-center">
                                    <div className="text-sm">{transaction.description}</div>
                                    <div className="text-sm font-medium">
                                        ${transaction.amount.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No recent transactions</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 