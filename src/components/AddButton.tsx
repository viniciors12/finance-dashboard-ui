import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
type props = {
  setOpen: (flag: boolean) => void;
};
export const AddButton = ({ setOpen }: props) => {
  return (
    <Fab
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        width: 64,
        height: 64,
        fontSize: "1.5rem",
      }}
      color="primary"
      aria-label="add"
      onClick={() => setOpen(true)}
    >
      <AddIcon sx={{ fontSize: "1.5rem" }} />
    </Fab>
  );
};
