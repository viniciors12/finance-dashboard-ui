import { Card, Grid, Typography } from "@mui/material";
import { ChartFilters } from "@modules";
import { BalancesChart } from "@components";
import { useEffect, useState } from "react";
import { useTransactionsContext } from "context/TransactionsContext";
import { useFormReducer } from "hooks/FormReducer";
import type { ChartFilterRequest, ChartFilterResponse } from "@models";
import dayjs from "dayjs";
const initialState: ChartFilterRequest = {
  fromDate: dayjs().startOf("month").toDate(),
  toDate: dayjs().endOf("month").toDate(),
  category: "All",
};

export const DisplayChart = () => {
  const { fetchFilteredTransactions } = useTransactionsContext();
  const { form, onValueChanged, hasChanged } =
    useFormReducer<ChartFilterRequest>(initialState);
  const [chartData, setChartData] = useState<ChartFilterResponse[]>([]);

  useEffect(() => {
    const isInitialState = JSON.stringify(form) == JSON.stringify(initialState);

    if (hasChanged || isInitialState) {
      fetchFilteredTransactions(form).then((data) => setChartData(data ?? []));
    }
  }, [form, hasChanged]);
  return (
    <Card>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="body1" color="text.primary">
            Income vs. Expenses
          </Typography>
          <BalancesChart chartData={chartData} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartFilters onValueChanged={onValueChanged} form={form} />
        </Grid>
      </Grid>
    </Card>
  );
};
