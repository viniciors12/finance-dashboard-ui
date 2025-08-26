export const TransactionType = {
  Income: 1,
  Expense: 2,
};

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
  transactionId?: number;
  type?: TransactionType;
  category?: string;
  description?: string;
  amount?: number;
  date?: Date;
}
