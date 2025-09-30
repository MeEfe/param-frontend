import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Category } from "@/types";
import { PieChart as PieChartIcon } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseChartProps {
  categories: Category[];
  categorySpending: Record<string, number>;
}

export function ExpenseChart({ categories, categorySpending }: ExpenseChartProps) {
  const data = Object.entries(categorySpending)
    .filter(([_, amount]) => amount > 0)
    .map(([categoryId, amount]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        categoryId,
        categoryName: category?.name || "Unknown",
        categoryColor: category?.color || "#gray",
        amount,
      };
    });

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  if (total === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Spending Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <PieChartIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No spending data</h3>
            <p className="text-sm text-muted-foreground">
              Add expenses to see your spending breakdown
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: data.map((item) => item.categoryName),
    datasets: [
      {
        data: data.map((item) => item.amount),
        backgroundColor: data.map((item) => item.categoryColor),
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

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <PieChartIcon className="h-5 w-5" />
          Spending Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-[1fr,380px] gap-8 items-center">
          {/* Chart Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[340px] aspect-square">
              <Pie data={chartData} options={options} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-sm text-muted-foreground font-medium">Total Spending</p>
                <p className="text-4xl font-bold mt-1">€{total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Legend Section */}
          <div className="space-y-2">
            {data.map((item) => {
              const percentage = ((item.amount / total) * 100).toFixed(1);
              return (
                <div
                  key={item.categoryId}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className="h-3 w-3 rounded-full flex-shrink-0 ring-2 ring-background group-hover:ring-4 transition-all"
                      style={{ backgroundColor: item.categoryColor }}
                    />
                    <span className="font-medium text-sm truncate">{item.categoryName}</span>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-semibold text-sm">€{item.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}