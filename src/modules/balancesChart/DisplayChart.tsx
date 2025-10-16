import { Card, Grid, Typography } from "@mui/material";
import { ChartFilters } from "@modules";
import { BalancesChart } from "@components";
import { useEffect } from "react";
import { useTransactionsContext } from "context/TransactionsContext";
import { useFormReducer } from "hooks/FormReducer";
import { chartFilterInitialState, type ChartFilterRequest } from "@models";

export const DisplayChart = () => {
  const { fetchFilteredTransactions, chartData } = useTransactionsContext();
  const { form, onValueChanged, hasChanged } =
    useFormReducer<ChartFilterRequest>(chartFilterInitialState);

  useEffect(() => {
    const isInitialState =
      JSON.stringify(form) == JSON.stringify(chartFilterInitialState);

    if (hasChanged || isInitialState) {
      fetchFilteredTransactions(form);
    }
  }, [form, hasChanged]);
  return (
    <Card>
      <Grid container sx={{ padding: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="body1" color="text.primary">
            Income vs. Expenses
          </Typography>
          <BalancesChart chartData={chartData ?? []} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartFilters onValueChanged={onValueChanged} form={form} />
        </Grid>
      </Grid>
    </Card>
  );
};
