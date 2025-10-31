import { Box, Grid } from "@mui/material";
import { BalanceCard } from "@modules";
import {
  availableBalanceDark,
  expenseDark,
  incomeDark,
  savingsDark,
} from "utils/Colors";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useBalancesData } from "hooks/useBalancesData";

export const DisplayBalances = ({}) => {
  const { expenses, income, availableBalance, savings } = useBalancesData();

  const incomeIcon = (
    <Box sx={{ justifyContent: "center", alignContent: "center" }}>
      <AttachMoneyIcon sx={{ color: incomeDark }} fontSize="large" />
    </Box>
  );

  const expenseIcon = (
    <Box sx={{ justifyContent: "center", alignContent: "center" }}>
      <TrendingDownIcon sx={{ color: expenseDark }} fontSize="large" />
    </Box>
  );

  const availableBalanceIcon = (
    <Box sx={{ justifyContent: "center", alignContent: "center" }}>
      <CreditCardIcon sx={{ color: availableBalanceDark }} fontSize="large" />
    </Box>
  );

  const savingsIcon = (
    <Box sx={{ justifyContent: "center", alignContent: "center" }}>
      <AccountBalanceIcon sx={{ color: savingsDark }} fontSize="large" />
    </Box>
  );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <BalanceCard
          color={incomeDark}
          icon={incomeIcon}
          amount={`₡${income}`}
          label="Income"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <BalanceCard
          icon={expenseIcon}
          amount={`₡${expenses}`}
          label="Expenses"
          color={expenseDark}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <BalanceCard
          icon={availableBalanceIcon}
          amount={`₡${availableBalance}`}
          label="Available Balance"
          color={availableBalanceDark}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <BalanceCard
          icon={savingsIcon}
          amount={`₡${savings}`}
          label="Savings"
          color={savingsDark}
        />
      </Grid>
    </Grid>
  );
};
