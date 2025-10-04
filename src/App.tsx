import { Box, Grid } from "@mui/material";
import {
  TransactionHistoryGrid,
  DisplayChart,
  DisplayBalances,
} from "@modules";

import { AddTransactionDialog } from "@modules";
import { useState } from "react";
import { TransactionsProvider } from "context/TransactionsContext";
import { AddButton } from "@components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TransactionsProvider>
        <Box
          sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa", padding: 2 }}
        >
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
          <AddButton setOpen={setOpen} />
          <AddTransactionDialog open={open} onClose={() => setOpen(false)} />
        </Box>
      </TransactionsProvider>
    </LocalizationProvider>
  );
}

export default App;
