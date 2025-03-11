import { format } from "date-fns";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function TransactionList({ transactions, onEdit, onDelete }) {
    if (!transactions || transactions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-6 text-muted-foreground">
                        No transactions found. Add a transaction to get started.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">{transaction.description}</span>
                                <div className="flex space-x-2 text-sm text-muted-foreground">
                                    <span>{format(new Date(transaction.date), "MMM d, yyyy")}</span>
                                    {transaction.category && (
                                        <>
                                            <span>•</span>
                                            <span>{transaction.category}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="font-semibold">
                                    ${transaction.amount.toFixed(2)}
                                </span>
                                <div className="flex space-x-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(transaction)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive"
                                        onClick={() => onDelete(transaction.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 