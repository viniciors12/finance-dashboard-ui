import type { ChartFilterResponse } from "@models";
import { Box, Typography } from "@mui/material";
import { ResponsiveBar, type ComputedDatum } from "@nivo/bar";
import { formatNumber } from "utils/BalancesUtils";
import {
  availableBalanceLight,
  expenseLight,
  incomeLight,
  savingsLight,
} from "utils/Colors";

type props = {
  chartData: ChartFilterResponse[];
};

export const BalancesChart = ({ chartData }: props) => {
  const getBarColor = (datum: ComputedDatum<ChartFilterResponse>) => {
    switch (datum.id) {
      case "income":
        return incomeLight;
      case "expense":
        return expenseLight;
      case "net":
        return availableBalanceLight;
      case "savings":
        return savingsLight;
      default:
        return "#757575";
    }
  };

  const getLabel = (id: string | number) => {
    switch (id) {
      case "income":
        return "Income";
      case "expense":
        return "Expenses";
      case "net":
        return "Available Balance";
      case "savings":
        return "Available Balance";
      default:
        return "";
    }
  };
  return (
    <Box minHeight={400} minWidth={400}>
      <ResponsiveBar
        data={chartData as readonly ChartFilterResponse[]}
        keys={["income", "expense", "net", "savings"]}
        indexBy="month"
        axisLeft={{
          format: formatNumber,
        }}
        groupMode="grouped"
        margin={{ top: 20, right: 50, bottom: 50, left: 80 }}
        padding={0.3}
        colors={getBarColor}
        labelSkipWidth={999}
        labelSkipHeight={999}
        legends={[]}
        role="application"
        ariaLabel="Grouped bar chart"
        innerPadding={5}
        tooltip={({ id, value, indexValue, color }) => (
          <Box
            sx={{
              p: 1,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 2,
              boxShadow: 3,
              minWidth: 150,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {indexValue}
            </Typography>
            <Typography variant="body2" fontWeight={600} color={color}>
              {getLabel(id)}: {formatNumber(value)}
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};
