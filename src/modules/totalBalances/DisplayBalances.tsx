import { Grid } from "@mui/material";
import { BalanceCard } from "@modules";
import { useTransactionsContext } from "context/TransactionsContext";
import { useMemo } from "react";
import { TransactionType } from "@models";

export const DisplayBalances = ({}) => {
  const { transactions } = useTransactionsContext();

  const income = useMemo(() => {
    return Array.from(transactions.values())
      .filter((tx) => tx.type === TransactionType.Income)
      .reduce((sum, tx) => sum + (tx?.amount ?? 0), 0);
  }, [transactions]);

  const expenses = useMemo(() => {
    return Array.from(transactions.values())
      .filter((tx) => tx.type === TransactionType.Expense)
      .reduce((sum, tx) => sum + (tx?.amount ?? 0), 0);
  }, [transactions]);

  const net = useMemo(() => {
    return income - expenses;
  }, [expenses, income]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <BalanceCard amount={income} label="Income" />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <BalanceCard amount={expenses} label="Expenses" />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <BalanceCard amount={net} label="Net" />
      </Grid>
    </Grid>
  );
};
