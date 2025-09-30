import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseList } from "@/components/ExpenseList";
import { BudgetLimitManager } from "@/components/BudgetLimitManager";
import { CategoryStatus } from "@/components/CategoryStatus";
import { ExpenseChart } from "@/components/ExpenseChart";
import { ExpenseHistory } from "@/components/ExpenseHistory";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { SalaryOverview } from "@/components/SalaryOverview";
import { SalarySettings } from "@/components/SalarySettings";
import { MonthYearSelector } from "@/components/MonthYearSelector";
import { FixedExpensesManager } from "@/components/FixedExpensesManager";
import {
  type Expense,
  type Category,
  type RecurrenceFrequency,
  type SalaryInfo,
} from "@/types";
import { generateRandomColor } from "@/lib/colors";
import { Wallet } from "lucide-react";

function App() {
  const now = new Date();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [salaryInfo, setSalaryInfo] = useState<SalaryInfo | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const handleMonthYearChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleAddCategory = (name: string, budgetLimit?: number): string => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color: generateRandomColor(),
      budgetLimit,
    };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory.id;
  };

  const handleUpdateCategoryLimit = (categoryId: string, limit?: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, budgetLimit: limit } : cat
      )
    );
  };

  // Calculate all occurrences of fixed expenses for the selected month
  const calculateFixedExpenseOccurrences = (expense: Expense): Expense[] => {
    if (expense.type !== "fixed" || !expense.recurrence) {
      return [expense];
    }

    const startDate = new Date(expense.recurrence.startDate);
    const occurrences: Expense[] = [];

    // Get first and last day of selected month
    const monthStart = new Date(selectedYear, selectedMonth, 1);
    const monthEnd = new Date(selectedYear, selectedMonth + 1, 0);

    let currentDate = new Date(startDate);

    // Generate occurrences within the selected month
    while (currentDate <= monthEnd) {
      if (currentDate >= monthStart && currentDate >= startDate) {
        occurrences.push({
          ...expense,
          date: currentDate.toISOString().split("T")[0],
        });
      }

      // Calculate next occurrence based on frequency
      switch (expense.recurrence.frequency) {
        case "weekly":
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case "bi-weekly":
          currentDate.setDate(currentDate.getDate() + 14);
          break;
        case "monthly":
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        case "quarterly":
          currentDate.setMonth(currentDate.getMonth() + 3);
          break;
        case "yearly":
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          break;
      }
    }

    return occurrences.length > 0 ? occurrences : [expense];
  };

  const handleAddExpense = (expenseData: {
    type: "variable" | "fixed";
    amount: number;
    description: string;
    date: string;
    categoryId: string;
    recurrence?: {
      frequency: RecurrenceFrequency;
      startDate: string;
    };
  }) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...expenseData,
    };

    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleUpdateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // Filter expenses for the selected month
  const filterExpensesByMonth = (expense: Expense): boolean => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === selectedMonth &&
      expenseDate.getFullYear() === selectedYear
    );
  };

  // Calculate all expenses including fixed expense occurrences for selected month
  const allExpenses = expenses
    .flatMap(calculateFixedExpenseOccurrences)
    .filter(filterExpensesByMonth);

  // Calculate category spending
  const categorySpending: Record<string, number> = categories.reduce((acc, category) => {
    acc[category.id] = allExpenses
      .filter((exp) => exp.categoryId === category.id)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return acc;
  }, {} as Record<string, number>);

  // Calculate total spending
  const totalSpending = allExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1600px] mx-auto py-8 px-4">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Expense Tracker</h1>
                <p className="text-sm text-muted-foreground">
                  Track your expenses and manage your budget efficiently
                </p>
              </div>
            </div>
            <MonthYearSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthYearChange={handleMonthYearChange}
            />
          </div>
        </header>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-[500px] grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <ExpenseChart
                categorySpending={categorySpending}
                categories={categories}
              />
              <SalaryOverview salaryInfo={salaryInfo} totalSpending={totalSpending} />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <ExpenseHistory expenses={allExpenses} categories={categories} />
              <CategoryStatus
                categorySpending={categorySpending}
                categories={categories}
              />
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <Tabs defaultValue="all" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Expenses</TabsTrigger>
                  <TabsTrigger value="fixed">Fixed Expenses</TabsTrigger>
                </TabsList>
                <AddExpenseDialog
                  onAddExpense={handleAddExpense}
                  categories={categories}
                  onAddCategory={handleAddCategory}
                />
              </div>

              <TabsContent value="all" className="mt-0">
                <ExpenseList
                  expenses={allExpenses}
                  categories={categories}
                  onUpdate={handleUpdateExpense}
                  onDelete={handleDeleteExpense}
                  showFilters={true}
                />
              </TabsContent>

              <TabsContent value="fixed" className="mt-0">
                <FixedExpensesManager
                  expenses={expenses}
                  categories={categories}
                  onUpdate={handleUpdateExpense}
                  onDelete={handleDeleteExpense}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <SalarySettings salaryInfo={salaryInfo} onUpdateSalary={setSalaryInfo} />
                <BudgetLimitManager
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onUpdateCategoryLimit={handleUpdateCategoryLimit}
                />
              </div>
              <CategoryStatus
                categorySpending={categorySpending}
                categories={categories}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;