import { Box, Grid } from "@mui/material";
import { BalanceCard } from "@modules";
import { availableBalanceCard, expenseCard, incomeCard } from "utils/Colors";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useBalancesData } from "hooks/useBalancesData";

export const DisplayBalances = ({}) => {
  const { expenses, income, net } = useBalancesData();

  const incomeIcon = (
    <Box sx={{ justifyContent: "center", alignContent: "center" }}>
      <AttachMoneyIcon sx={{ color: incomeCard }} fontSize="large" />
    </Box>
  );

  const expenseIcon = (
    <Box sx={{ justifyContent: "center", alignContent: "center" }}>
      <TrendingDownIcon sx={{ color: expenseCard }} fontSize="large" />
    </Box>
  );

  const availableBalanceIcon = (
    <Box sx={{ justifyContent: "center", alignContent: "center" }}>
      <CreditCardIcon sx={{ color: availableBalanceCard }} fontSize="large" />
    </Box>
  );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <BalanceCard
          color={incomeCard}
          icon={incomeIcon}
          amount={`₡${income}`}
          label="Income"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <BalanceCard
          icon={expenseIcon}
          amount={`₡${expenses}`}
          label="Expenses"
          color={expenseCard}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <BalanceCard
          icon={availableBalanceIcon}
          amount={`₡${net}`}
          label="Available Balance"
          color={availableBalanceCard}
        />
      </Grid>
    </Grid>
  );
};
