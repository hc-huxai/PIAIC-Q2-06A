import { Banknote, Info } from "lucide-react";
import { ExpenseTile } from "./expense-tile";

export const RecentExpenses = () => {
  return (
    <div className="flex-[3_3_0%] h-[350px] border rounded-md p-4">
      <div className="">
        <h1 className="text-xl font-bold">Recent Expenses</h1>
        <span className="text-muted-foreground text-sm">Recent 5 Expenses</span>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-2 w-full">
        <ExpenseTile
          data={{
            id: "1111",
            amount: 500,
            createdAt: new Date(),
            statement: "Narration",
          }}
        />
      </div>
    </div>
  );
};
