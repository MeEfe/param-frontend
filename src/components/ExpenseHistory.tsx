import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Expense, type Category } from "@/types";
import { History, Repeat } from "lucide-react";

interface ExpenseHistoryProps {
  expenses: Expense[];
  categories: Category[];
}

type FilterType = "all" | "variable" | "fixed";

export function ExpenseHistory({ expenses, categories }: ExpenseHistoryProps) {
  const [filter, setFilter] = useState<FilterType>("all");

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

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <History className="h-5 w-5" />
            Expense History
          </CardTitle>
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
        </div>
      </CardHeader>
      <CardContent>
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              No {filter !== "all" ? filter : ""} expenses found
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredExpenses.slice(0, 10).map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Badge
                    variant={expense.type === "fixed" ? "default" : "secondary"}
                    className="flex-shrink-0"
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
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{expense.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{getCategoryName(expense.categoryId)}</span>
                      <span>•</span>
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-semibold">{formatAmount(expense.amount)}</p>
                </div>
              </div>
            ))}
            {filteredExpenses.length > 10 && (
              <p className="text-center text-sm text-muted-foreground pt-2">
                Showing 10 of {filteredExpenses.length} expenses
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}