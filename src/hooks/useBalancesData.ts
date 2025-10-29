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

  const availableBalance = useMemo(() => {
    return income - expenses;
  }, [expenses, income]);

  const savings = useMemo(() => {
    return transactions
      .filter((t) => t.type == TransactionType.Savings)
      .reduce((sum, tx) => sum + (tx?.amount ?? 0), 0);
  }, [transactions]);

  return { income, expenses, availableBalance, savings };
};
