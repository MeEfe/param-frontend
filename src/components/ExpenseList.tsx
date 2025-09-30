import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Expense, type Category } from "@/types";
import { CalendarDays, Repeat, Pencil } from "lucide-react";
import { EditExpenseDialog } from "@/components/EditExpenseDialog";

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
  onUpdate: (id: string, updates: Partial<Expense>) => void;
  onDelete: (id: string) => void;
  showFilters?: boolean;
}

type FilterType = "all" | "variable" | "fixed";

export function ExpenseList({
  expenses,
  categories,
  onUpdate,
  onDelete,
  showFilters = true
}: ExpenseListProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "all") return true;
    return expense.type === filter;
  });

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || "Unknown";
  };

  const formatAmount = (amount: number) => {
    return `€${amount.toFixed(2)}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatRecurrence = (frequency: string) => {
    return frequency.charAt(0).toUpperCase() + frequency.slice(1);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setDialogOpen(true);
  };

  if (filteredExpenses.length === 0) {
    return (
      <>
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Expenses</CardTitle>
              {showFilters && expenses.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      filter === "all"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("variable")}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      filter === "variable"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Variable
                  </button>
                  <button
                    onClick={() => setFilter("fixed")}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      filter === "fixed"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Fixed
                  </button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">
                {expenses.length === 0 ? "No expenses yet" : `No ${filter} expenses found`}
              </h3>
              <p className="text-sm text-muted-foreground">
                {expenses.length === 0
                  ? "Add your first expense to start tracking"
                  : `Try selecting a different filter`}
              </p>
            </div>
          </CardContent>
        </Card>
        <EditExpenseDialog
          expense={editingExpense}
          categories={categories}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </>
    );
  }

  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Expenses ({filteredExpenses.length})
            </CardTitle>
            {showFilters && (
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("variable")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === "variable"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Variable
                </button>
                <button
                  onClick={() => setFilter("fixed")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === "fixed"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Fixed
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Recurrence</TableHead>
                  <TableHead className="text-right font-semibold">Amount</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Badge
                        variant={expense.type === "fixed" ? "default" : "secondary"}
                        className="font-medium"
                      >
                        {expense.type === "fixed" ? (
                          <span className="flex items-center gap-1">
                            <Repeat className="h-3 w-3" />
                            Fixed
                          </span>
                        ) : (
                          "Variable"
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {getCategoryName(expense.categoryId)}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(expense.date)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {expense.recurrence
                        ? formatRecurrence(expense.recurrence.frequency)
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatAmount(expense.amount)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(expense)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <EditExpenseDialog
        expense={editingExpense}
        categories={categories}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </>
  );
}