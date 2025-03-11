import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

export function SpendingInsights({ transactions, budgets }) {
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

    // Filter transactions for the previous month
    const lastMonth = subMonths(today, 1);
    const lastMonthTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
            transactionDate.getMonth() === lastMonth.getMonth() &&
            transactionDate.getFullYear() === lastMonth.getFullYear()
        );
    });

    // Calculate total expenses for current and previous month
    const currentMonthTotal = currentMonthTransactions.reduce(
        (sum, transaction) => sum + transaction.amount, 0
    );

    const lastMonthTotal = lastMonthTransactions.reduce(
        (sum, transaction) => sum + transaction.amount, 0
    );

    // Calculate month-over-month change
    const percentChange = lastMonthTotal === 0
        ? 100
        : ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

    // Calculate spending by category for current month
    const categorySpending = currentMonthTransactions.reduce((acc, transaction) => {
        const category = transaction.category || 'Other';
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
    }, {});

    // Find categories that are over budget
    const overBudgetCategories = Object.entries(budgets || {})
        .filter(([category, budget]) => {
            const spent = categorySpending[category] || 0;
            return spent > budget;
        })
        .map(([category, budget]) => ({
            category,
            budget,
            spent: categorySpending[category] || 0,
            overspent: (categorySpending[category] || 0) - budget
        }))
        .sort((a, b) => b.overspent - a.overspent)
        .slice(0, 3);

    // Generate insights
    const insights = [];

    // Month-over-month comparison
    if (lastMonthTotal > 0) {
        const trend = percentChange > 0 ? "increased" : "decreased";
        insights.push(
            `Your spending has ${trend} by ${Math.abs(percentChange).toFixed(1)}% compared to last month.`
        );
    }

    // Budget warnings
    if (overBudgetCategories.length > 0) {
        overBudgetCategories.forEach(({ category, budget, spent }) => {
            const percentOver = ((spent - budget) / budget) * 100;
            insights.push(
                `You've exceeded your ${category} budget by ${percentOver.toFixed(1)}% ($${(spent - budget).toFixed(2)}).`
            );
        });
    }

    // Add a positive insight if under budget overall
    const totalBudget = Object.values(budgets || {}).reduce((sum, budget) => sum + budget, 0);
    if (totalBudget > 0 && currentMonthTotal < totalBudget) {
        const savedAmount = totalBudget - currentMonthTotal;
        const percentSaved = (savedAmount / totalBudget) * 100;
        insights.push(
            `Great job! You're under your total budget by $${savedAmount.toFixed(2)} (${percentSaved.toFixed(1)}%).`
        );
    }

    // If no insights, add a default message
    if (insights.length === 0) {
        insights.push("Start adding transactions and setting budgets to see personalized insights.");
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {insights.map((insight, index) => (
                        <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary">•</span>
                            <span>{insight}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
} 