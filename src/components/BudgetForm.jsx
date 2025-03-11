import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Define the schema for budget validation
const budgetSchema = z.record(
    z.string(),
    z.string()
        .min(1, "Budget amount is required")
        .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
            message: "Budget must be a positive number",
        })
);

// Predefined categories for budgets
const categories = [
    "Food & Dining",
    "Transportation",
    "Housing",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Healthcare",
    "Education",
    "Travel",
    "Personal Care",
    "Gifts & Donations",
    "Other"
];

export function BudgetForm({ existingBudgets, onSubmit }) {
    // Convert numeric budget values to strings for the form
    const stringBudgets = Object.entries(existingBudgets || {}).reduce(
        (acc, [category, amount]) => {
            acc[category] = amount.toString();
            return acc;
        },
        {}
    );

    // Initialize default values for all categories
    const defaultValues = categories.reduce((acc, category) => {
        acc[category] = stringBudgets[category] || "";
        return acc;
    }, {});

    const form = useForm({
        resolver: zodResolver(budgetSchema),
        defaultValues,
    });

    const handleSubmit = (data) => {
        // Convert string values to numbers and filter out empty values
        const numericBudgets = Object.entries(data).reduce(
            (acc, [category, amountStr]) => {
                if (amountStr.trim() !== "") {
                    acc[category] = parseFloat(amountStr);
                }
                return acc;
            },
            {}
        );

        onSubmit(numericBudgets);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Set Monthly Budgets</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categories.map((category) => (
                                <FormField
                                    key={category}
                                    name={category}
                                    label={category}
                                    render={({ field }) => (
                                        <div className="flex items-center space-x-2">
                                            <span className="w-1/2">{category}</span>
                                            <Input
                                                {...field}
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="0.00"
                                                className="w-1/2"
                                            />
                                        </div>
                                    )}
                                />
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit">Save Budgets</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
} 