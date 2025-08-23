import { Box, Grid } from "@mui/material";
import {
  TransactionHistoryGrid,
  DisplayChart,
  DisplayBalances,
} from "@modules";

function App() {
  return (
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
    </Box>
  );
}

export default App;
