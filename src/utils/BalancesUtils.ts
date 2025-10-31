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
