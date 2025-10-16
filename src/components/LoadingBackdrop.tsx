import { Backdrop, CircularProgress, Stack } from "@mui/material";

type props = {
  backdropMessage?: string;
};

export const LoadingBackdrop = ({ backdropMessage }: props) => {
  return (
    <Backdrop open={!!backdropMessage}>
      <Stack>
        <CircularProgress color="inherit" />
        {backdropMessage}...
      </Stack>
    </Backdrop>
  );
};
