import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import type { Transaction } from "models/Transaction";
import { useTransactionsContext } from "context/TransactionsContext";
import { useFormReducer } from "hooks/FormReducer";

export const AddTransactionDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { addTransaction, loading } = useTransactionsContext();
  const { form, onValueChanged } = useFormReducer<Transaction>();

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
          <FormControl fullWidth size="medium">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              value={form.type}
              onChange={(e) => onValueChanged("type")(e.target.value)}
              label="Type"
            >
              <MenuItem value={0}>Income</MenuItem>
              <MenuItem value={1}>Expense</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Category"
            value={form.category}
            onChange={(e) => onValueChanged("category")(e.target.value)}
            fullWidth
            size="medium"
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
