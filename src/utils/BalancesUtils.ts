import { TransactionType, type Transaction } from "@models";

export const calculateExpenses = (
  transactions: Transaction[],
  type: TransactionType
) => {
  return Array.from(transactions.values())
    .filter((tx) => tx.type === type || tx.type === TransactionType.Savings)
    .reduce((sum, tx) => sum + (tx?.amount ?? 0), 0);
};

export const calculateIncomes = (
  transactions: Transaction[],
  type: TransactionType
) => {
  return Array.from(transactions.values())
    .filter((tx) => tx.type === type)
    .reduce((sum, tx) => sum + (tx?.amount ?? 0), 0);
};

export const ValidAmountText = (availableBalance: number) => {
  return `Your current available balance is ₡${availableBalance}`;
};
