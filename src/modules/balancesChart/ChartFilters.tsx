import { SelectorField } from "@components";
import { TransactionType, type ChartFilterRequest } from "@models";
import { FormControl, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { categories } from "constants/Constants";
import dayjs, { Dayjs } from "dayjs";

type props = {
  onValueChanged: (
    key: keyof ChartFilterRequest,
    value: string | Date | undefined
  ) => void;
  form: ChartFilterRequest;
};
export const ChartFilters = ({ onValueChanged, form }: props) => {
  const getCategories = () => {
    const categoryOptions = categories[TransactionType.Expense].map((cat) => ({
      key: cat,
      value: cat,
    }));
    return [{ key: "All", value: "All" }, ...categoryOptions];
  };

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
        <SelectorField
          label="Category"
          field="category"
          form={form}
          onValueChanged={onValueChanged}
          options={getCategories()}
        />
        <Stack spacing={2} direction="row">
          <DatePicker
            label="From"
            value={dayjs(form.fromDate)}
            onChange={(newValue: Dayjs | null) =>
              onValueChanged("fromDate", newValue?.toDate())
            }
          />
          <DatePicker
            label="To"
            value={dayjs(form.toDate)}
            onChange={(newValue: Dayjs | null) =>
              onValueChanged("toDate", newValue?.toDate())
            }
          />
        </Stack>
      </Stack>
    </FormControl>
  );
};
