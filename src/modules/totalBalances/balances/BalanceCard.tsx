import { Card, CardContent, Typography } from "@mui/material";

type props = {
  amount: number;
  label: string;
};

export const BalanceCard = ({ amount, label }: props) => {
  return (
    <Card>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="body1" color="text.primary">
          ₡ {label}
        </Typography>
        <Typography fontWeight="bold" variant="h5" component="div">
          ₡ {amount}
        </Typography>
      </CardContent>
    </Card>
  );
};
