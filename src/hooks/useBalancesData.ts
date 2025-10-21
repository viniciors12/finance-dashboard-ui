import { TransactionType } from "@models";
import { useTransactionsContext } from "context/TransactionsContext";
import { useMemo } from "react";
import { calculateExpenses, calculateIncomes } from "utils/BalancesUtils";

export const useBalancesData = () => {
  const { transactions } = useTransactionsContext();

  const income = useMemo(() => {
    return calculateIncomes(transactions, TransactionType.Income);
  }, [transactions]);

  const expenses = useMemo(() => {
    return calculateExpenses(transactions, TransactionType.Expense);
  }, [transactions]);

  const net = useMemo(() => {
    return income - expenses;
  }, [expenses, income]);

  return { income, expenses, net };
};
