import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useFormReducer } from "hooks/FormReducer";
import { useAuthContext } from "context/AuthContext";
import { useCallback } from "react";

export const LoginPage = () => {
  const { login, user } = useAuthContext();
  const { form, onValueChanged } = useFormReducer({
    username: "",
    password: "",
  });

  const handleLogin = useCallback(async () => {
    await login(form.username, form.password);
  }, [form.username, form.password]);

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
      open={!user}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Login
      </DialogTitle>

      <DialogContent>
        <Stack sx={{ p: 1 }} spacing={2}>
          <TextField
            label="Username"
            value={form.username}
            onChange={(e) => onValueChanged("username", e.target.value)}
            fullWidth
            size="medium"
          />

          <TextField
            label="Password"
            value={form.password}
            onChange={(e) => onValueChanged("password", e.target.value)}
            fullWidth
            type="password"
            size="medium"
          />

          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" onClick={handleLogin}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
