import { TransactionType } from "@models";

type keyValuePair = {
  key: number;
  value: string;
};

export const categories = {
  [TransactionType.Income]: [
    "Salary",
    "Freelance",
    "Refund",
    "Investment Return",
  ],
  [TransactionType.Expense]: [
    "Groceries",
    "Rent",
    "Utilities",
    "Transport",
    "Entertainment",
    "Health",
    "Education",
    "Subscriptions",
    "Dining Out",
  ],
  [TransactionType.Savings]: ["Savings"],
};

export const types: keyValuePair[] = [
  { key: 1, value: "Income" },
  { key: 2, value: "Expenses" },
  { key: 3, value: "Savings" },
];
