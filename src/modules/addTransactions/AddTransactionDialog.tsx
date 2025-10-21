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
import {
  chartFilterInitialState,
  TransactionType,
  type Transaction,
} from "@models";
import { useTransactionsContext } from "context/TransactionsContext";
import { useFormReducer } from "hooks/FormReducer";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { types } from "constants/Constants";
import { SelectorField } from "@components";
import { TransactionsDialogValidations } from "./TransactionsDialogValidations";

const transactionInitialState: Transaction = {
  type: 1,
  category: "",
  description: "",
  amount: 0,
  date: new Date(),
};
export const AddTransactionDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { onAddTransaction, fetchFilteredTransactions } =
    useTransactionsContext();
  const { form, onValueChanged, resetForm } = useFormReducer<Transaction>(
    transactionInitialState
  );
  const { categoryOptions, amountHelperText, isInvalidAmount } =
    TransactionsDialogValidations({
      form,
      onValueChanged,
    });

  const onHandleSubmit = async () => {
    await onAddTransaction(form);
    await fetchFilteredTransactions(chartFilterInitialState);
    resetForm();
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
            disabled={form.type == TransactionType.Savings}
          />

          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => onValueChanged("description", e.target.value)}
            fullWidth
            size="medium"
          />

          <TextField
            label="Amount"
            value={form.amount}
            onChange={(e) => onValueChanged("amount", Number(e.target.value))}
            fullWidth
            size="medium"
            error={isInvalidAmount}
            helperText={amountHelperText}
          />

          <DatePicker
            label="Select date"
            value={dayjs(form.date)}
            onChange={(newValue: Dayjs | null) =>
              onValueChanged("date", newValue?.toDate())
            }
          />

          <Stack direction="row" justifyContent="flex-end">
            <Button
              disabled={isInvalidAmount}
              variant="contained"
              onClick={onHandleSubmit}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
