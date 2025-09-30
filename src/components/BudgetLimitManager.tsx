import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Category } from "@/types";
import { Settings, Pencil } from "lucide-react";
import { AddCategoryDialog } from "./AddCategoryDialog";

interface BudgetLimitManagerProps {
  categories: Category[];
  onAddCategory: (name: string, budgetLimit?: number) => void;
  onUpdateCategoryLimit: (categoryId: string, limit?: number) => void;
}

export function BudgetLimitManager({
  categories,
  onAddCategory,
  onUpdateCategoryLimit,
}: BudgetLimitManagerProps) {
  const [editingLimits, setEditingLimits] = useState<Record<string, string>>({});

  const handleLimitChange = (categoryId: string, value: string) => {
    setEditingLimits((prev) => ({
      ...prev,
      [categoryId]: value,
    }));
  };

  const handleSaveLimit = (categoryId: string) => {
    const value = editingLimits[categoryId];
    const numValue = value === "" ? undefined : parseFloat(value);
    onUpdateCategoryLimit(categoryId, numValue);

    // Remove from editing state after save
    setEditingLimits((prev) => {
      const newState = { ...prev };
      delete newState[categoryId];
      return newState;
    });
  };

  const getLimitValue = (category: Category) => {
    if (editingLimits[category.id] !== undefined) {
      return editingLimits[category.id];
    }
    return category.budgetLimit !== undefined ? category.budgetLimit.toString() : "";
  };

  const isEditing = (categoryId: string) => {
    return editingLimits[categoryId] !== undefined;
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Category Management
          </CardTitle>
          <AddCategoryDialog onAddCategory={onAddCategory} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Add new categories and set monthly spending limits. Leave empty for no limit.
          </p>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No categories yet. Add your first category to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 min-w-[180px]">
                    <div
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <Label htmlFor={category.id} className="text-sm font-medium">
                      {category.name}
                    </Label>
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      €
                    </span>
                    <Input
                      id={category.id}
                      type="number"
                      step="0.01"
                      value={getLimitValue(category)}
                      onChange={(e) => handleLimitChange(category.id, e.target.value)}
                      placeholder="No limit"
                      className="pl-8"
                    />
                  </div>
                  <Button
                    onClick={() => handleSaveLimit(category.id)}
                    size="sm"
                    variant={isEditing(category.id) ? "default" : "outline"}
                  >
                    {isEditing(category.id) ? (
                      "Save"
                    ) : (
                      <>
                        <Pencil className="h-3 w-3 mr-1" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}