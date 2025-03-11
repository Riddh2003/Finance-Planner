import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { MonthlyExpensesChart } from './components/MonthlyExpensesChart';
import { CategoryPieChart } from './components/CategoryPieChart';
import { DashboardSummary } from './components/DashboardSummary';
import { BudgetForm } from './components/BudgetForm';
import { BudgetComparisonChart } from './components/BudgetComparisonChart';
import { SpendingInsights } from './components/SpendingInsights';

// Mock data for initial state
const initialTransactions = [
  {
    id: '1',
    amount: 45.99,
    date: format(new Date(2023, 5, 15), 'yyyy-MM-dd'),
    description: 'Grocery shopping',
    category: 'Food & Dining'
  },
  {
    id: '2',
    amount: 120.50,
    date: format(new Date(2023, 6, 2), 'yyyy-MM-dd'),
    description: 'Electricity bill',
    category: 'Utilities'
  },
  {
    id: '3',
    amount: 35.00,
    date: format(new Date(2023, 6, 10), 'yyyy-MM-dd'),
    description: 'Movie tickets',
    category: 'Entertainment'
  },
  {
    id: '4',
    amount: 250.00,
    date: format(new Date(), 'yyyy-MM-dd'),
    description: 'New headphones',
    category: 'Shopping'
  }
];

const initialBudgets = {
  'Food & Dining': 500,
  'Transportation': 200,
  'Utilities': 300,
  'Entertainment': 150,
  'Shopping': 200
};

function App() {
  // State for transactions
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });

  // State for budgets
  const [budgets, setBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem('budgets');
    return savedBudgets ? JSON.parse(savedBudgets) : initialBudgets;
  });

  // State for dialog
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  // Transaction handlers
  const handleAddTransaction = () => {
    setCurrentTransaction(null);
    setIsTransactionDialogOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setCurrentTransaction(transaction);
    setIsTransactionDialogOpen(true);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const handleTransactionSubmit = (data) => {
    if (data.id) {
      // Update existing transaction
      setTransactions(transactions.map(transaction =>
        transaction.id === data.id ? data : transaction
      ));
    } else {
      // Add new transaction
      setTransactions([...transactions, { ...data, id: uuidv4() }]);
    }
    setIsTransactionDialogOpen(false);
  };

  // Budget handlers
  const handleBudgetSubmit = (newBudgets) => {
    setBudgets(newBudgets);
    setIsBudgetDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <header className="border-b w-full">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Finance Visualizer</h1>
          <div className="flex space-x-2">
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
            <Button variant="outline" onClick={() => setIsBudgetDialogOpen(true)}>
              Set Budgets
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full px-4 py-8">
        <div className="grid gap-6">
          {/* Dashboard Summary */}
          <DashboardSummary transactions={transactions} />

          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <MonthlyExpensesChart transactions={transactions} />
            <CategoryPieChart transactions={transactions} />
          </div>

          {/* Budget and Insights Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <BudgetComparisonChart transactions={transactions} budgets={budgets} />
            <SpendingInsights transactions={transactions} budgets={budgets} />
          </div>

          {/* Transactions List */}
          <TransactionList
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </main>

      {/* Transaction Dialog */}
      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </DialogTitle>
          </DialogHeader>
          <TransactionForm
            transaction={currentTransaction}
            onSubmit={handleTransactionSubmit}
            onCancel={() => setIsTransactionDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Budget Dialog */}
      <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Set Monthly Budgets</DialogTitle>
          </DialogHeader>
          <BudgetForm
            existingBudgets={budgets}
            onSubmit={handleBudgetSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
