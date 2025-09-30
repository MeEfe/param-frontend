import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SalaryInfo } from "@/types";
import { Banknote, Calendar, TrendingDown, Wallet } from "lucide-react";

interface SalaryOverviewProps {
  salaryInfo: SalaryInfo | null;
  totalSpending: number;
}

export function SalaryOverview({ salaryInfo, totalSpending }: SalaryOverviewProps) {
  if (!salaryInfo) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Salary Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Banknote className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No salary set</h3>
            <p className="text-sm text-muted-foreground">
              Configure your salary in the Budget tab
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const remaining = salaryInfo.amount - totalSpending;
  const spendingPercentage = (totalSpending / salaryInfo.amount) * 100;

  const getNextPaymentDate = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    let nextPaymentDate: Date;

    if (currentDay < salaryInfo.paymentDay) {
      // Payment is this month
      nextPaymentDate = new Date(currentYear, currentMonth, salaryInfo.paymentDay);
    } else {
      // Payment is next month
      nextPaymentDate = new Date(currentYear, currentMonth + 1, salaryInfo.paymentDay);
    }

    return nextPaymentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Banknote className="h-5 w-5" />
          Salary Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Monthly Salary */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Salary</p>
                <p className="text-2xl font-bold">€{salaryInfo.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Spending vs Remaining */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <p className="text-xs font-medium text-muted-foreground">Spent</p>
              </div>
              <p className="text-xl font-bold">€{totalSpending.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {spendingPercentage.toFixed(1)}% of salary
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-green-600" />
                <p className="text-xs font-medium text-muted-foreground">Remaining</p>
              </div>
              <p
                className={`text-xl font-bold ${
                  remaining < 0 ? "text-destructive" : "text-green-600"
                }`}
              >
                €{remaining.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {(100 - spendingPercentage).toFixed(1)}% left
              </p>
            </div>
          </div>

          {/* Next Payment */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Next Payment</p>
              <p className="text-xs text-muted-foreground">{getNextPaymentDate()}</p>
            </div>
          </div>

          {/* Warning if overspent */}
          {remaining < 0 && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm font-medium text-destructive">
                ⚠️ You've exceeded your monthly salary by €
                {Math.abs(remaining).toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}