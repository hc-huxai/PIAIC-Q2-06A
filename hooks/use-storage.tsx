import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ExpenseDatatype } from "@/types/expense-data";

interface ExpenseModel {
  items: ExpenseDatatype[];
  addItem: (data: ExpenseDatatype) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  getItems: () => Promise<ExpenseDatatype[]>
}

const useStorage = create(
  persist<ExpenseModel>(
    (set, get) => ({
      items: [],
      addItem: (data: ExpenseDatatype) => {
        const currentItems = get().items;

        set({ items: [...get().items, data] });
        alert("Data added.");
      },

      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        alert("Data deleted.");
      },

      removeAll: () => {
        set({ items: [] });
      },

      getItems: async () => {
        return get().items;
      }
    }),
    {
      name: "expense-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStorage;