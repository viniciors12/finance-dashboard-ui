import { Grid } from "@mui/material";
import { BalanceCard } from "@modules";

export const DisplayBalances = ({}) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <BalanceCard amount={500} label="Income" />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <BalanceCard amount={200} label="Expenses" />
      </Grid>
    </Grid>
  );
};
