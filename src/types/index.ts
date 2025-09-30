export type RecurrenceFrequency =
  | "weekly"
  | "bi-weekly"
  | "monthly"
  | "quarterly"
  | "yearly";

export interface Recurrence {
  frequency: RecurrenceFrequency;
  startDate: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  budgetLimit?: number;
}

export interface Expense {
  id: string;
  type: "variable" | "fixed";
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  recurrence?: Recurrence;
}

export interface SalaryInfo {
  amount: number;
  paymentDay: number; // Day of month (1-31)
}