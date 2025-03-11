import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

export function MonthlyExpensesChart({ transactions }) {
    // Get the last 6 months
    const today = new Date();
    const sixMonthsAgo = subMonths(today, 5);

    const monthRange = eachMonthOfInterval({
        start: startOfMonth(sixMonthsAgo),
        end: endOfMonth(today)
    });

    // Prepare data for the chart
    const chartData = monthRange.map(month => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);

        // Filter transactions for this month
        const monthlyTransactions = transactions.filter(transaction => {
            const transactionDate = parseISO(transaction.date);
            return transactionDate >= monthStart && transactionDate <= monthEnd;
        });

        // Calculate total expenses for the month
        const totalExpenses = monthlyTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        return {
            month: format(month, 'MMM yyyy'),
            expenses: totalExpenses
        };
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
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
                            <XAxis dataKey="month" />
                            <YAxis
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                formatter={(value) => [`$${value.toFixed(2)}`, 'Expenses']}
                            />
                            <Bar dataKey="expenses" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
} 