import ExpensesClient from "@/components/pages/expenses-client";

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <p className="text-muted-foreground">
          Track your spending and get AI-powered insights.
        </p>
      </header>
      <ExpensesClient />
    </div>
  );
}
