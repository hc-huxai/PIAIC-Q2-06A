"use client";
import { useState } from "react";
import { useExpenseModal } from "@/hooks/use-expense-modal";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const ExpenseModal = ({
  onChange,
}: {
  onChange: (e: { target: { name: string; value: any } }) => void;
}) => {
  const expenseModal = useExpenseModal();

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState<Date>();

  return (
    <Modal
      title="Create store"
      description="Add a store to manage products and add categories"
      isOpen={expenseModal.isOpen}
      onClose={expenseModal.onClose}
      className="w-[512px] max-w-[90%] rounded-lg"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Statement</Label>
              <Input
                disabled={loading}
                onChange={(e) => onChange(e)}
                name="statement"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Expense</Label>
                <Input
                  disabled={loading}
                  type="number"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(day, selectedDay, active, e) => {
                        // console.log(day, selectedDay, active, e);
                        setDate(day);
                        onChange({ target: { name: "createdAt", value: day } });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                variant="outline"
                disabled={loading}
                onClick={expenseModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
