import { Grid } from "@mui/material";
import { BalanceCard } from "@modules";
import { useTransactionsContext } from "context/TransactionsContext";
import { useMemo } from "react";
import { TransactionType } from "@models";
import { calculateTransaction } from "utils/BalancesUtiles";

export const DisplayBalances = ({}) => {
  const { transactions } = useTransactionsContext();

  const income = useMemo(() => {
    return calculateTransaction(transactions, TransactionType.Income);
  }, [transactions]);

  const expenses = useMemo(() => {
    return calculateTransaction(transactions, TransactionType.Expense);
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
        <BalanceCard amount={net} label="Savings" />
      </Grid>
    </Grid>
  );
};
