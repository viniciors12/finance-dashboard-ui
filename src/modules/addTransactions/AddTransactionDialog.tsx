import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { TransactionType, type Transaction } from "models/Transaction";
import { useTransactionsContext } from "context/TransactionsContext";
import { useFormReducer } from "hooks/FormReducer";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { categories, types } from "constants/Constants";
import { SelectorField } from "@components/SelectorField";
import { useMemo } from "react";

export const AddTransactionDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { addTransaction } = useTransactionsContext();
  const { form, onValueChanged } = useFormReducer<Transaction>({
    type: 1,
    category: "",
    description: "",
    amount: 0,
    date: new Date(),
  });

  const categoryOptions = useMemo(() => {
    return categories[
      form.type === TransactionType.Income
        ? TransactionType.Income
        : TransactionType.Expense
    ].map((cat) => ({
      key: cat,
      value: cat,
    }));
  }, [form.type]);

  const handleSubmit = async () => {
    await addTransaction(form);
    onClose();
  };

  return (
    <Dialog
      slotProps={{
        paper: {
          sx: {
            width: "600px",
            borderRadius: 3,
            p: 2,
          },
        },
      }}
      maxWidth="md"
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add Transaction
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack sx={{ p: 1 }} spacing={2}>
          <SelectorField
            label="Type"
            field="type"
            form={form}
            onValueChanged={onValueChanged}
            options={types}
          />

          <SelectorField
            label="Category"
            field="category"
            form={form}
            onValueChanged={onValueChanged}
            options={categoryOptions}
          />

          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => onValueChanged("description")(e.target.value)}
            fullWidth
            size="medium"
          />

          <TextField
            label="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => onValueChanged("amount")(Number(e.target.value))}
            fullWidth
            size="medium"
          />

          <DatePicker
            label="Select date"
            value={dayjs(form.date)}
            onChange={(newValue: Dayjs | null) =>
              onValueChanged("date")(newValue?.toDate())
            }
          />

          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" onClick={handleSubmit}>
              Add
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
