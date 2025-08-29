import { TransactionType, type Transaction } from "@models";

export const calculateTransaction = (
  transactions: Transaction[],
  type: TransactionType
) => {
  return Array.from(transactions.values())
    .filter((tx) => tx.type === type)
    .reduce((sum, tx) => sum + (tx?.amount ?? 0), 0);
};
