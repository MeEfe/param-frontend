import type { FixedBill } from "@/types";
import { BillStatusBadge } from "./BillStatusBadge";
import { cn } from "@/lib/utils";

export function FixedBillRow({ icon: Icon, name, dueDate, amount, status, category }: FixedBill) {
  const isPaid = status === "paid";
  const isUpcoming = status === "upcoming";
  const isOverdue = status === "overdue";

  return (
    <div className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/40">
      {/* Status accent bar */}
      <span className={cn(
        "shrink-0 w-[3px] h-9 rounded-full",
        isOverdue  ? "bg-destructive" :
        isUpcoming ? "bg-amber-500" :
        isPaid     ? "bg-emerald-500/40" :
                     "bg-border/60"
      )} />

      <Icon
        size={16}
        strokeWidth={1.5}
        className={cn("shrink-0", isPaid ? "text-muted-foreground/50" : "text-muted-foreground")}
      />
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium truncate",
          isPaid
            ? "text-muted-foreground line-through decoration-muted-foreground/40"
            : "text-foreground"
        )}>
          {name}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className={cn(isOverdue && "text-destructive/80")}>
            {isOverdue ? "Was due" : "Due"} {dueDate}
          </span>
          <span className="mx-1 text-border">·</span>
          {category}
        </p>
      </div>
      <BillStatusBadge status={status} />
      <span className={cn(
        "min-w-[72px] text-right text-sm font-semibold tabular-nums transition-colors duration-150",
        isPaid
          ? "text-muted-foreground"
          : "text-primary group-hover:text-primary/80"
      )}>
        €{amount.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}
