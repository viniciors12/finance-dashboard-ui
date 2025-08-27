import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { MonthRangeSelector } from "@components";

export const ChartFilters = () => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      sx={{ minWidth: 160 }}
    >
      <Typography variant="body1" color="text.primary">
        Filters
      </Typography>
      <Stack
        sx={{
          mt: "20px",
          mb: "50px",
        }}
        direction="column"
        spacing={3}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            //value={category}
            label="Category"
            //onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expenses">Expenses</MenuItem>
            <MenuItem value="savings">Savings</MenuItem>
          </Select>
        </FormControl>
        <MonthRangeSelector />
      </Stack>
    </FormControl>
  );
};
