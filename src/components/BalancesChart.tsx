import { Box, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

export const BalancesChart = () => {
  const data = [
    { month: "Jan", income: 4000, expenses: 2500 },
    { month: "Feb", income: 3000, expenses: 2800 },
    { month: "Mar", income: 5000, expenses: 3200 },
  ];
  return (
    <Box style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={["income", "expenses"]}
        indexBy="month"
        groupMode="grouped"
        margin={{ top: 20, right: 130, bottom: 50, left: 40 }}
        padding={0.3}
        colors={{ scheme: "category10" }}
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
              {id === "income" ? "Income" : "Expenses"}: ${value}
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};
