# Finance Visualizer

A personal finance tracking and visualization web application built with React, shadcn/ui, and Recharts.

## Features

### Transaction Management
- Add, edit, and delete financial transactions
- Track transaction details: amount, date, description, and category
- View transactions in a sortable list

### Data Visualization
- Monthly expenses bar chart
- Category-wise spending pie chart
- Budget vs. actual comparison chart

### Budget Management
- Set monthly budgets for different spending categories
- Track budget compliance with visual indicators
- Get insights on spending patterns and budget adherence

### Dashboard
- Summary cards with key financial metrics
- Recent transactions overview
- Spending insights and recommendations

## Technology Stack

- **Frontend**: React, Vite
- **UI Components**: shadcn/ui (built on Radix UI)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation
- **Data Storage**: Local Storage (can be extended to use MySQL)

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/finance-visualizer.git
cd finance-visualizer
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Adding Transactions**: Click the "Add Transaction" button to record a new expense or income.
2. **Setting Budgets**: Use the "Set Budgets" button to establish monthly spending limits by category.
3. **Viewing Reports**: Explore the charts and summary cards to gain insights into your financial habits.

## Future Enhancements

- User authentication and multi-user support
- Backend integration with MySQL for persistent storage
- Income tracking and cash flow analysis
- Financial goal setting and tracking
- Export/import functionality for transaction data
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.
