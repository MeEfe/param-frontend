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
import { Button } from "@/components/ui/button";
import { type Expense, type Category } from "@/types";
import { Pencil, Repeat } from "lucide-react";
import { EditExpenseDialog } from "@/components/EditExpenseDialog";

interface FixedExpensesManagerProps {
  expenses: Expense[];
  categories: Category[];
  onUpdate: (id: string, updates: Partial<Expense>) => void;
  onDelete: (id: string) => void;
}

export function FixedExpensesManager({
  expenses,
  categories,
  onUpdate,
  onDelete,
}: FixedExpensesManagerProps) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fixedExpenses = expenses.filter((expense) => expense.type === "fixed");

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Unknown";
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.color || "#ccc";
  };

  const formatAmount = (amount: number) => {
    return `€${amount.toFixed(2)}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatRecurrence = (expense: Expense) => {
    if (!expense.recurrence) return "—";
    const frequency = expense.recurrence.frequency
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");
    const startDate = formatDate(expense.recurrence.startDate);
    return `${frequency}, starts ${startDate}`;
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setDialogOpen(true);
  };

  if (fixedExpenses.length === 0) {
    return (
      <>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Repeat className="h-5 w-5" />
              Manage Fixed Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Repeat className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No fixed expenses</h3>
              <p className="text-sm text-muted-foreground">
                Create fixed expense templates to automatically track recurring expenses
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
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Repeat className="h-5 w-5" />
            Manage Fixed Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Recurrence</TableHead>
                  <TableHead className="text-right font-semibold">Amount</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fixedExpenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {expense.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getCategoryColor(expense.categoryId) }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {getCategoryName(expense.categoryId)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatRecurrence(expense)}
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