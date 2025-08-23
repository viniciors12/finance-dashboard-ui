import { Card, Stack, Typography } from "@mui/material";
import { DataGrid } from "@components";

export const TransactionHistoryGrid = () => {
  return (
    <Card>
      <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
        <Typography variant="body1" color="text.primary">
          Transaction History
        </Typography>
        <DataGrid />
      </Stack>
    </Card>
  );
};
