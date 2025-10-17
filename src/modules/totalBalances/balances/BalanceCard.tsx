import { Card, CardContent, Stack, Typography } from "@mui/material";

type props = {
  amount: string;
  label: string;
  icon: React.ReactNode;
  color: string;
};

export const BalanceCard = ({ amount, label, icon, color }: props) => {
  return (
    <Card>
      <CardContent sx={{ height: "100%" }}>
        <Stack spacing={1} direction="row">
          {icon}
          <Stack direction="column">
            <Typography variant="body1" color="text.primary">
              {label}
            </Typography>
            <Typography
              color={color}
              fontWeight="bold"
              variant="h5"
              component="div"
            >
              {amount}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
