import { TransactionType, type Transaction } from "@models";

export const calculateExpenses = (transactions: Transaction[]) => {
  return Array.from(transactions.values())
    .filter((tx) => tx.type === TransactionType.Expense)
    .reduce((sum, tx) => sum + (tx?.amount ?? 0), 0);
};

export const calculateIncomes = (transactions: Transaction[]): number => {
  const incomeTotal = transactions
    .filter((tx) => tx.type === TransactionType.Income)
    .reduce((sum, tx) => sum + (tx?.amount ?? 0), 0);

  const savingsTotal = transactions
    .filter((tx) => tx.type === TransactionType.Savings)
    .reduce((sum, tx) => sum + (tx?.amount ?? 0), 0);

  return incomeTotal - savingsTotal;
};

export const ValidAmountText = (availableBalance: number) => {
  return `Your current available balance is ₡${availableBalance}`;
};

export const formatNumber = (value: number): string => {
  if (value >= 1_000_000)
    return `₡${truncateDecimal(value / 1_000_000, 1)} mill`;
  if (value >= 1_000) return `₡${truncateDecimal(value / 1_000, 1)} mil`;
  return `₡${truncateDecimal(value, 1)}`;
};

const truncateDecimal = (value: number, decimals: number) => {
  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
};
