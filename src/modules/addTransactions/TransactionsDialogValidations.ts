import { useBalancesData } from "@hooks";
import { TransactionType, type Transaction } from "@models";
import { categories } from "constants/Constants";
import { useEffect, useMemo } from "react";
import { ValidAmountText } from "utils/BalancesUtils";

type transactionsDialogProps = {
  form: Transaction;
  onValueChanged: (
    key: keyof Transaction,
    value: string | number | Date | undefined
  ) => void;
};
export const TransactionsDialogValidations = ({
  form,
  onValueChanged,
}: transactionsDialogProps) => {
  const { availableBalance } = useBalancesData();

  const categoryOptions = useMemo(() => {
    const selectedCategories = (() => {
      switch (form.type) {
        case TransactionType.Income:
          return categories[TransactionType.Income];
        case TransactionType.Expense:
          return categories[TransactionType.Expense];
        case TransactionType.Savings:
          return categories[TransactionType.Savings];
        default:
          return [];
      }
    })();

    return selectedCategories.map((cat) => ({
      key: cat,
      value: cat,
    }));
  }, [form.type]);

  const amountHelperText = useMemo(() => {
    return form.type !== TransactionType.Income
      ? ValidAmountText(availableBalance)
      : undefined;
  }, [availableBalance, form.type]);

  const isInvalidAmount = useMemo(() => {
    return (
      form.type !== TransactionType.Income &&
      availableBalance < (form?.amount ?? 0)
    );
  }, [availableBalance, form.amount, form.type]);

  useEffect(() => {
    form.type == TransactionType.Savings
      ? onValueChanged("category", "Savings")
      : onValueChanged("category", undefined);
  }, [form.type]);

  return { categoryOptions, amountHelperText, isInvalidAmount };
};
