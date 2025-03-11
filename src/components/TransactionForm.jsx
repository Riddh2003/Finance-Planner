import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Define the schema for transaction validation
const transactionSchema = z.object({
    amount: z.string().min(1, "Amount is required").refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        { message: "Amount must be a positive number" }
    ),
    date: z.string().min(1, "Date is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().optional(),
});

// Predefined categories for transactions
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
    "Investments",
    "Income",
    "Other"
];

export function TransactionForm({ transaction, onSubmit, onCancel }) {
    const form = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            amount: transaction?.amount?.toString() || "",
            date: transaction?.date || format(new Date(), "yyyy-MM-dd"),
            description: transaction?.description || "",
            category: transaction?.category || "Other",
        },
    });

    const handleSubmit = (data) => {
        onSubmit({
            ...data,
            amount: parseFloat(data.amount),
            id: transaction?.id,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    name="amount"
                    label="Amount"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                        />
                    )}
                />

                <FormField
                    name="date"
                    label="Date"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="date"
                        />
                    )}
                />

                <FormField
                    name="description"
                    label="Description"
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Transaction description"
                        />
                    )}
                />

                <FormField
                    name="category"
                    label="Category"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />

                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {transaction ? "Update" : "Add"} Transaction
                    </Button>
                </div>
            </form>
        </Form>
    );
} 