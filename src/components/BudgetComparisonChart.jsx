import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function BudgetComparisonChart({ transactions, budgets }) {
    // Group transactions by category for the current month
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

    // Calculate spending by category
    const categorySpending = currentMonthTransactions.reduce((acc, transaction) => {
        const category = transaction.category || 'Other';
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
    }, {});

    // Prepare data for the chart
    const chartData = Object.entries(budgets).map(([category, budgetAmount]) => {
        const spent = categorySpending[category] || 0;
        const remaining = Math.max(0, budgetAmount - spent);
        const overspent = spent > budgetAmount ? spent - budgetAmount : 0;

        return {
            category,
            budget: budgetAmount,
            spent,
            remaining,
            overspent
        };
    });

    // Sort by highest spending first
    chartData.sort((a, b) => b.spent - a.spent);

    // If no data, show empty state
    if (chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Budget vs. Actual</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-80">
                    <p className="text-muted-foreground">No budget data available</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget vs. Actual</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, '']} />
                            <Legend />
                            <Bar dataKey="budget" name="Budget" fill="#8884d8" />
                            <Bar dataKey="spent" name="Spent" fill="#82ca9d" />
                            <Bar dataKey="overspent" name="Overspent" fill="#ff8042" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
} 