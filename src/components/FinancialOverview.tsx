import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_COLORS, type Category, type SalaryInfo } from "@/types";
import { PieChart as PieChartIcon, Banknote, Calendar, TrendingDown, Wallet } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface FinancialOverviewProps {
  categorySpending: Record<Category, number>;
  salaryInfo: SalaryInfo | null;
  totalSpending: number;
}

export function FinancialOverview({
  categorySpending,
  salaryInfo,
  totalSpending,
}: FinancialOverviewProps) {
  const data = Object.entries(categorySpending)
    .filter(([_, amount]) => amount > 0)
    .map(([category, amount]) => ({
      category: category as Category,
      amount,
    }));

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.amount),
        backgroundColor: data.map((item) => CATEGORY_COLORS[item.category]),
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverBorderColor: "#ffffff",
        hoverBorderWidth: 4,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: 0,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 16,
        displayColors: false,
        bodyFont: {
          size: 14,
          family: "system-ui, -apple-system, sans-serif",
        },
        titleFont: {
          size: 15,
          weight: "600" as const,
          family: "system-ui, -apple-system, sans-serif",
        },
        callbacks: {
          label: function (context: any) {
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `€${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  const getNextPaymentDate = () => {
    if (!salaryInfo) return "";

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    let nextPaymentDate: Date;

    if (currentDay < salaryInfo.paymentDay) {
      nextPaymentDate = new Date(currentYear, currentMonth, salaryInfo.paymentDay);
    } else {
      nextPaymentDate = new Date(currentYear, currentMonth + 1, salaryInfo.paymentDay);
    }

    return nextPaymentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const remaining = salaryInfo ? salaryInfo.amount - totalSpending : 0;
  const spendingPercentage = salaryInfo ? (totalSpending / salaryInfo.amount) * 100 : 0;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Left: Spending Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <PieChartIcon className="h-5 w-5" />
              <h3 className="font-semibold">Spending Overview</h3>
            </div>

            {total === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <PieChartIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No spending data</h3>
                <p className="text-sm text-muted-foreground">
                  Add expenses to see your spending breakdown
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[1fr,300px] gap-6 items-center">
                {/* Chart */}
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-[280px] aspect-square">
                    <Pie data={chartData} options={options} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <p className="text-xs text-muted-foreground font-medium">Total Spending</p>
                      <p className="text-3xl font-bold mt-1">€{total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-1.5">
                  {data.map((item) => {
                    const percentage = ((item.amount / total) * 100).toFixed(1);
                    return (
                      <div
                        key={item.category}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <div
                            className="h-3 w-3 rounded-full flex-shrink-0 ring-2 ring-background group-hover:ring-4 transition-all"
                            style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                          />
                          <span className="font-medium text-xs truncate">{item.category}</span>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <p className="font-semibold text-xs">€{item.amount.toFixed(2)}</p>
                          <p className="text-[10px] text-muted-foreground">{percentage}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Salary Overview */}
          <div className="space-y-4 border-l border-border/50 pl-8">
            <div className="flex items-center gap-2 mb-4">
              <Banknote className="h-5 w-5" />
              <h3 className="font-semibold">Salary Overview</h3>
            </div>

            {!salaryInfo ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Banknote className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-base font-medium mb-1">No salary set</h3>
                <p className="text-xs text-muted-foreground">
                  Configure your salary in the Budget tab
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Monthly Salary */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Wallet className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly Salary</p>
                      <p className="text-xl font-bold">€{salaryInfo.amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Spending vs Remaining */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                      <p className="text-[10px] font-medium text-muted-foreground">Spent</p>
                    </div>
                    <p className="text-lg font-bold">€{totalSpending.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {spendingPercentage.toFixed(1)}% of salary
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Wallet className="h-3.5 w-3.5 text-green-600" />
                      <p className="text-[10px] font-medium text-muted-foreground">Remaining</p>
                    </div>
                    <p
                      className={`text-lg font-bold ${
                        remaining < 0 ? "text-destructive" : "text-green-600"
                      }`}
                    >
                      €{remaining.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {(100 - spendingPercentage).toFixed(1)}% left
                    </p>
                  </div>
                </div>

                {/* Next Payment */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-accent/50">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">Next Payment</p>
                    <p className="text-[10px] text-muted-foreground">{getNextPaymentDate()}</p>
                  </div>
                </div>

                {/* Warning if overspent */}
                {remaining < 0 && (
                  <div className="p-2.5 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-xs font-medium text-destructive">
                      ⚠️ Exceeded by €{Math.abs(remaining).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}