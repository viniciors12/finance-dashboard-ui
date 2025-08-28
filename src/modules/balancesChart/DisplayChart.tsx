import { Card, Grid, Typography } from "@mui/material";
import { ChartFilters } from "@modules";
import { BalancesChart } from "@components";
import { useEffect, useRef, useState } from "react";
import { useTransactionsContext } from "context/TransactionsContext";
import { useFormReducer } from "hooks/FormReducer";
import type { ChartFilterRequest, ChartFilterResponse } from "@models";
import dayjs from "dayjs";

export const DisplayChart = () => {
  const { fetchFilteredTransactions } = useTransactionsContext();
  const { form, onValueChanged } = useFormReducer<ChartFilterRequest>({
    fromDate: dayjs().startOf("month").toDate(),
    toDate: dayjs().endOf("month").toDate(),
    category: "All",
  });
  const [chartData, setChartData] = useState<ChartFilterResponse[]>([]);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    fetchFilteredTransactions(form).then((data) => setChartData(data ?? []));
  }, [form, fetchFilteredTransactions]);
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
