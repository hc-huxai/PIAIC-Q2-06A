"use client";

import { useEffect, useState } from "react";

import { ExpenseModal } from "@/components/modals/expense-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{/* <ExpenseModal /> */}</>;
};
