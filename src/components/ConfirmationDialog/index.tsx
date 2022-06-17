import { useRecoilValue } from "recoil";
import { useConfirmationDialog } from "../../states/confirmationDialog/hooks";
import { confirmationDialogState } from "states/confirmationDialog";
import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions as MuiDialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const DialogActions = styled(MuiDialogActions)({
  justifyContent: "center",
  paddingTop: 0,
  "&>:not(:first-of-type)": {
    marginLeft: "2.4rem",
  },
});

const ConfirmationDialog = () => {
  const { closeDialog } = useConfirmationDialog();
  const { show, content, onConfirm } = useRecoilValue(confirmationDialogState);

  return (
    <Dialog open={show} onClose={closeDialog}>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: 500, color: "black" }}>
          {content}
        </DialogContentText>
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
