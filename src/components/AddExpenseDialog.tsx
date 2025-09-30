import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type Category, type RecurrenceFrequency } from "@/types";
import { Plus, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddExpenseDialogProps {
  categories: Category[];
  onAddExpense: (expense: {
    type: "variable" | "fixed";
    amount: number;
    description: string;
    date: string;
    categoryId: string;
    recurrence?: {
      frequency: RecurrenceFrequency;
      startDate: string;
    };
  }) => void;
  onAddCategory: (name: string, budgetLimit?: number) => string;
  trigger?: React.ReactNode;
}

export function AddExpenseDialog({
  categories,
  onAddExpense,
  onAddCategory,
  trigger,
}: AddExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"variable" | "fixed">("variable");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [frequency, setFrequency] = useState<RecurrenceFrequency>("monthly");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !categoryId) return;

    const expenseData = {
      type,
      amount: parseFloat(amount),
      description,
      date,
      categoryId,
      ...(type === "fixed" && {
        recurrence: {
          frequency,
          startDate: date,
        },
      }),
    };

    onAddExpense(expenseData);

    // Reset form
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategoryId("");
    setType("variable");
    setCategorySearch("");
    setOpen(false);
  };

  const handleCreateCategory = () => {
    if (!categorySearch.trim()) return;
    const newCategoryId = onAddCategory(categorySearch.trim());
    setCategoryId(newCategoryId);
    setCategorySearch("");
    setCategoryOpen(false);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const showCreateOption =
    categorySearch.trim() &&
    !categories.some(
      (cat) => cat.name.toLowerCase() === categorySearch.trim().toLowerCase()
    );

  const selectedCategory = categories.find((cat) => cat.id === categoryId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Create a new variable or fixed expense entry.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as "variable" | "fixed")}
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="variable">Variable</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (€)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={categoryOpen}
                    className="w-full justify-between"
                  >
                    {selectedCategory ? (
                      <span className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: selectedCategory.color }}
                        />
                        {selectedCategory.name}
                      </span>
                    ) : (
                      "Select or create category..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Search or type new category..."
                      value={categorySearch}
                      onValueChange={setCategorySearch}
                    />
                    <CommandList>
                      {filteredCategories.length === 0 && !showCreateOption ? (
                        <CommandEmpty>No categories found.</CommandEmpty>
                      ) : (
                        <>
                          {filteredCategories.length > 0 && (
                            <CommandGroup heading="Categories">
                              {filteredCategories.map((category) => (
                                <CommandItem
                                  key={category.id}
                                  value={category.id}
                                  onSelect={() => {
                                    setCategoryId(category.id);
                                    setCategoryOpen(false);
                                    setCategorySearch("");
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      categoryId === category.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <div
                                    className="h-3 w-3 rounded-full mr-2"
                                    style={{ backgroundColor: category.color }}
                                  />
                                  {category.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                          {showCreateOption && (
                            <CommandGroup>
                              <CommandItem
                                onSelect={handleCreateCategory}
                                className="text-primary"
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Create "{categorySearch}"
                              </CommandItem>
                            </CommandGroup>
                          )}
                        </>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {type === "fixed" && (
            <div className="space-y-2">
              <Label htmlFor="frequency">Recurrence</Label>
              <Select
                value={frequency}
                onValueChange={(v) => setFrequency(v as RecurrenceFrequency)}
              >
                <SelectTrigger id="frequency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}