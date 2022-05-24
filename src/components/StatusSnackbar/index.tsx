import { Alert, Snackbar } from "@mui/material";
import { useRecoilValue } from "recoil";
import { snackbarState } from "states/snackbar";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";

const StatusSnackbar = () => {
  const { show, title, type, SnackbarProps } = useRecoilValue(snackbarState);
  const { closeToast } = useSnackbar();

  return (
    <Snackbar
      open={show}
      autoHideDuration={3000}
      onClose={closeToast}
      {...SnackbarProps}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {title}
      </Alert>
    </Snackbar>
  );
};

export default StatusSnackbar;
