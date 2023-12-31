"use client";
import { ExpenseModal } from "@/components/modals/expense-modal";
import { Overview } from "@/components/overview";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useExpenseModal } from "@/hooks/use-expense-modal";
import { cn } from "@/lib/utils";
import { ExpenseDatatype } from "@/types/expense-data";
import { on } from "events";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const expenseModal = useExpenseModal();

  const [data, setData] = useState<ExpenseDatatype>({
    id: undefined,
    statement: undefined,
    amount: undefined,
    createdAt: undefined,
  });

  const onChangeHandler = (e: { target: { name: string; value: any } }) => {
    setData({
      ...data,
      [e.target.name]: e.target.value != "" ? e.target.value : undefined,
    });

    console.log(data);
  };

  return (
    <>
      <ExpenseModal onChange={(e) => onChangeHandler(e)} />
      <div className={cn("space-y-4 max-sm:space-y-2", "p-8 max-sm:p-4 pt-6")}>
        <Heading title="Dashboard" description="An overview of your expenses" />
        <Separator />
        <Overview data={[]} />
        <Button
          className={cn(
            "fixed bottom-6 right-6",
            "rounded-3xl max-sm:rounded-2xl",
            "shadow-lg",
            "w-16 h-16 max-sm:w-12 max-sm:h-12"
          )}
          onClick={expenseModal.onOpen}
        >
          <Plus size={48} />
        </Button>
      </div>
    </>
  );
}
