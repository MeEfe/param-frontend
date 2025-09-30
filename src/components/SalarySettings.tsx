import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SalaryInfo } from "@/types";
import { Banknote } from "lucide-react";

interface SalarySettingsProps {
  salaryInfo: SalaryInfo | null;
  onUpdateSalary: (salary: SalaryInfo) => void;
}

export function SalarySettings({ salaryInfo, onUpdateSalary }: SalarySettingsProps) {
  const [amount, setAmount] = useState(salaryInfo?.amount.toString() || "");
  const [paymentDay, setPaymentDay] = useState(salaryInfo?.paymentDay.toString() || "");

  const handleSave = () => {
    if (!amount || !paymentDay) return;

    const day = parseInt(paymentDay);
    if (day < 1 || day > 31) return;

    onUpdateSalary({
      amount: parseFloat(amount),
      paymentDay: day,
    });
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Banknote className="h-5 w-5" />
          Salary Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Set your monthly salary and payment date to track your finances better.
          </p>

          <div className="space-y-2">
            <Label htmlFor="salary-amount">Monthly Salary (€)</Label>
            <Input
              id="salary-amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-day">Payment Day of Month</Label>
            <Input
              id="payment-day"
              type="number"
              min="1"
              max="31"
              value={paymentDay}
              onChange={(e) => setPaymentDay(e.target.value)}
              placeholder="15"
            />
            <p className="text-xs text-muted-foreground">
              Enter a day between 1-31
            </p>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Salary Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}