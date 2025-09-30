import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type Category } from "@/types";
import { TrendingUp, AlertCircle } from "lucide-react";

interface CategoryStatusProps {
  categories: Category[];
  categorySpending: Record<string, number>;
}

export function CategoryStatus({
  categories,
  categorySpending,
}: CategoryStatusProps) {
  const getStatusColor = (spent: number, limit?: number) => {
    if (!limit) return "text-muted-foreground";
    return spent > limit ? "text-destructive" : "text-green-600";
  };

  const getStatusText = (spent: number, limit?: number) => {
    if (!limit) {
      return `€${spent.toFixed(2)} spent`;
    }
    if (spent > limit) {
      return `Exceeded by €${(spent - limit).toFixed(2)}`;
    }
    return `€${(limit - spent).toFixed(2)} left`;
  };

  const getProgressValue = (spent: number, limit?: number) => {
    if (!limit) return 0;
    return Math.min((spent / limit) * 100, 100);
  };

  const getProgressColor = (spent: number, limit?: number) => {
    if (!limit) return "";
    return spent > limit ? "bg-destructive" : "bg-green-600";
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Budget Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map((category) => {
            const spent = categorySpending[category.id] || 0;
            const limit = category.budgetLimit;
            const isOverBudget = limit && spent > limit;

            return (
              <div key={category.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium text-sm">{category.name}</span>
                      {isOverBudget && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <p className={`text-sm font-semibold ${getStatusColor(spent, limit)}`}>
                      {getStatusText(spent, limit)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">€{spent.toFixed(2)}</p>
                    {limit && (
                      <p className="text-xs text-muted-foreground">
                        of €{limit.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                {limit && (
                  <Progress
                    value={getProgressValue(spent, limit)}
                    className="h-2"
                    indicatorClassName={getProgressColor(spent, limit)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}