import { Fab, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
type FloatingButtonsProps = {
  setInsertDialogOpen: (flag: boolean) => void;
  logout: () => void;
};
export const FloatingButtons = ({
  setInsertDialogOpen,
  logout,
}: FloatingButtonsProps) => {
  const buttonStyle = {
    zIndex: 1000,
    width: 64,
    height: 64,
    fontSize: "1.5rem",
  };
  return (
    <Stack
      direction="row"
      gap={1.5}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
      }}
    >
      <Fab
        sx={buttonStyle}
        color="primary"
        aria-label="add"
        onClick={() => setInsertDialogOpen(true)}
      >
        <AddIcon sx={{ fontSize: "1.5rem" }} />
      </Fab>
      <Fab
        sx={buttonStyle}
        color="primary"
        aria-label="logout"
        onClick={logout}
      >
        <LogoutIcon sx={{ fontSize: "1.5rem" }} />
      </Fab>
    </Stack>
  );
};
