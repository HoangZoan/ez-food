import {
  Button,
  Dialog,
  DialogActions as MuiDialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { styled } from "shared/theme";
import { useRecoilValue } from "recoil";
import { confirmationDialogState } from "../../states/confirmationDialog";
import { useConfirmationDialog } from "../../states/confirmationDialog/hooks";

const DialogActions = styled(MuiDialogActions)({
  justifyContent: "center",
  paddingTop: 0,
  "&>:not(:first-of-type)": {
    marginLeft: "2.4rem",
  },
});

const ConfirmationDialog = () => {
  const { show, content, onConfirm } = useRecoilValue(confirmationDialogState);
  const { closeDialog } = useConfirmationDialog();

  return (
    <Dialog open={show} onClose={closeDialog}>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>

      <DialogActions sx={{ mb: 1 }}>
        <Button
          variant="contained"
          onClick={() => {
            onConfirm();
            closeDialog();
          }}
        >
          Đồng ý
        </Button>
        <Button variant="outlined" onClick={closeDialog}>
          Trở lại
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
