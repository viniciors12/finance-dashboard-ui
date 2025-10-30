import { Box, Grid } from "@mui/material";
import {
  TransactionHistoryGrid,
  DisplayChart,
  DisplayBalances,
} from "@modules";

import { AddTransactionDialog } from "@modules";
import { useMemo, useState } from "react";
import { useTransactionsContext } from "context/TransactionsContext";
import { FloatingButtons } from "@components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuthContext } from "context/AuthContext";
import { LoadingBackdrop } from "@components";

export const FinanceDashboard = () => {
  const [transactionDialogOpen, setTransactionDialogOpen] =
    useState<boolean>(false);
  const { logout } = useAuthContext();
  const { transactions } = useTransactionsContext();
  const loadingMessage = useMemo(() => {
    return !transactions.length ? "Loading dashboard" : undefined;
  }, [transactions]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa", padding: 2 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <DisplayBalances />
          </Grid>
          <Grid size={12}>
            <DisplayChart />
          </Grid>
          <Grid size={12}>
            <TransactionHistoryGrid />
          </Grid>
        </Grid>
        <FloatingButtons
          setInsertDialogOpen={setTransactionDialogOpen}
          logout={logout}
        />
        <AddTransactionDialog
          open={transactionDialogOpen}
          onClose={() => setTransactionDialogOpen(false)}
        />
        <LoadingBackdrop backdropMessage={loadingMessage} />
      </Box>
    </LocalizationProvider>
  );
};
