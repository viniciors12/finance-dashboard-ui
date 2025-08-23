import { Stack, TextField } from "@mui/material";
import { useState } from "react";

export const MonthRangeSelector = () => {
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartMonth(event.target.value);
  };

  const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndMonth(event.target.value);
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="From"
        type="month"
        value={startMonth}
        onChange={handleStartChange}
        size="small"
        fullWidth
      />
      <TextField
        label="To"
        type="month"
        value={endMonth}
        onChange={handleEndChange}
        size="small"
        fullWidth
      />
    </Stack>
  );
};
