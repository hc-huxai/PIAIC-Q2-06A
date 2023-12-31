import { ExpenseDatatype } from "@/types/expense-data";
import { Banknote, Info } from "lucide-react";
import { format } from "date-fns";

export const ExpenseTile = ({ data }: { data: ExpenseDatatype }) => {
  return (
    <div className="flex items-center justify-between hover:bg-primary-foreground p-2 rounded-md transition-all cursor-pointer">
      <Banknote className="bg-primary stroke-primary-foreground p-2 rounded-full w-10 h-10" />
      <div className="flex flex-col gap-0.5 ml-2 mr-auto">
        <span className="text-sm font-semibold">PKR {data.amount}</span>
        <span className="text-xs text-muted-foreground">
          {format(data.createdAt!, "PPP")}
        </span>
      </div>
      <Info className="w-6 h-6 cursor-pointer hover:stroke-primary/90" />
    </div>
  );
};
