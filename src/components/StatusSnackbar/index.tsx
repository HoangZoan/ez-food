import { Alert, Snackbar, SnackbarProps, AlertColor } from "@mui/material";

interface StatusSnackbarProps extends SnackbarProps {
  title: string;
  severity: AlertColor;
}

const StatusSnackbar = ({
  title,
  open,
  onClose,
  severity,
  anchorOrigin,
}: StatusSnackbarProps) => {
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {title}
      </Alert>
    </Snackbar>
  );
};

export default StatusSnackbar;
