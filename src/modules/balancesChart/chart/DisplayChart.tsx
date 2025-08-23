import { Card, Grid, Typography } from "@mui/material";
import { ChartFilters } from "@modules";
import { BalancesChart } from "@components";

export const DisplayChart = () => {
  return (
    <Card>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="body1" color="text.primary">
            Income vs. Expenses
          </Typography>
          <BalancesChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartFilters />
        </Grid>
      </Grid>
    </Card>
  );
};
