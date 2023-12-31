"use client";
import { ExpenseModal } from "@/components/modals/expense-modal";
import { Overview } from "@/components/overview";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useExpenseModal } from "@/hooks/use-expense-modal";
import useStorage from "@/hooks/use-storage";
import { cn } from "@/lib/utils";
import { ExpenseDatatype } from "@/types/expense-data";
import { Banknote, Info, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as generateUUID } from "uuid";
import { format } from "date-fns";
import { RecentExpenses } from "@/components/recent-expenses";

export default function Home() {
  const expenseModal = useExpenseModal();
  const storage = useStorage();

  const [formData, setFormData] = useState<ExpenseDatatype>({
    id: undefined,
    statement: undefined,
    amount: undefined,
    createdAt: undefined,
  });

  const [data, setData] = useState<ExpenseDatatype[]>(storage.items);
  const [chartData, setChartData] =
    useState<{ month: string; amount: number }[]>();

  const [isMounted, setIsMounted] = useState<boolean>(false);

  let report: { month: string; amount: number }[] = [
    { month: "January", amount: 0 },
    { month: "February", amount: 0 },
    { month: "March", amount: 0 },
    { month: "April", amount: 0 },
    { month: "May", amount: 0 },
    { month: "June", amount: 0 },
    { month: "July", amount: 0 },
    { month: "August", amount: 0 },
    { month: "September", amount: 0 },
    { month: "October", amount: 0 },
    { month: "November", amount: 0 },
    { month: "December", amount: 0 },
  ];

  const generateChart = (data: ExpenseDatatype[]) => {
    data.map((item) => {
      let month: string = new Date(item.createdAt!).toLocaleString("month", {
        month: "long",
      });

      let monthExist = report.find((val) => val.month == month);

      if (monthExist) {
        report.map((reportItem) => {
          if (reportItem.month == month) {
            reportItem.amount += Number(item.amount!);
          }
        });
      } else {
        report.push({ month: month, amount: Number(item.amount!) });
      }
    });

    setChartData(report);
    console.log(report);
  };

  useEffect(() => {
    setIsMounted(true);
    generateChart(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!isMounted) {
    return false;
  }

  const onChangeHandler = (e: { target: { name: string; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value != "" ? e.target.value : undefined,
    });
  };

  const onSubmit = async () => {
    expenseModal.onClose();

    let uuid = generateUUID();

    setFormData({
      ...formData,
      id: uuid,
    });

    storage.addItem(formData);

    const items = await storage.getItems();

    setData(items);

    generateChart(data);
  };

  return (
    <>
      <ExpenseModal onChange={(e) => onChangeHandler(e)} onSubmit={onSubmit} />
      <div className={cn("space-y-4 max-sm:space-y-2", "p-8 max-sm:p-4 pt-6")}>
        <Heading title="Dashboard" description="An overview of your expenses" />
        <Separator />
        <div className="flex gap-8 items-center justify-between">
          <Overview
            data={chartData!}
            className="space-y-4 flex-[9_9_0%] border rounded-md py-2 px-2"
          />
          <RecentExpenses />
        </div>
        <Button
          onClick={() => {
            storage.removeAll();
            setData([]);
          }}
        >
          <Trash />
        </Button>
        <Button
          className={cn(
            "fixed bottom-8 right-8",
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
