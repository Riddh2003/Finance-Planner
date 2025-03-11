import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// Define colors for different categories
const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
    '#82CA9D', '#FF6B6B', '#6A7FDB', '#F7C59F', '#9B5DE5',
    '#F15BB5', '#00BBF9', '#00F5D4', '#FEE440', '#9B5DE5'
];

export function CategoryPieChart({ transactions }) {
    // Group transactions by category and calculate totals
    const categoryTotals = transactions.reduce((acc, transaction) => {
        const category = transaction.category || 'Other';
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
    }, {});

    // Convert to array format for Recharts
    const data = Object.entries(categoryTotals).map(([name, value]) => ({
        name,
        value
    }));

    // Sort by value (highest first)
    data.sort((a, b) => b.value - a.value);

    // If no data, show empty state
    if (data.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-80">
                    <p className="text-muted-foreground">No category data available</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
} 