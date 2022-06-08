import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { OrderStatusType } from "shared/types";
import { useConfirmationDialog } from "states/confirmationDialog/hooks";

interface OrderInfoDialogProps {
  open: boolean;
  tableType: OrderStatusType;
  onClose: () => void;
  onFinish?: () => void;
  submitStatus?: {
    isFinishing: boolean;
    isFinished: boolean;
  };
  children: React.ReactNode;
}

const OrderInfoDialog = ({
  open,
  tableType,
  onClose,
  onFinish = () => {},
  submitStatus = { isFinishing: false, isFinished: false },
  children,
}: OrderInfoDialogProps) => {
  const { isFinishing, isFinished } = submitStatus;
  const { openDialog } = useConfirmationDialog();

  const openConfirmDialog = () => {
    openDialog({
      content: "Xác nhận hoàn thành đơn hàng",
      onConfirm: onFinish,
    });
  };

  useEffect(() => {
    if (isFinished) {
      onClose();
    }
  }, [isFinished, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ fontWeight: 700, textAlign: "center", fontSize: "2.1rem" }}
      >
        Chi tiết đơn hàng
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Stack spacing={3} sx={{ px: 6 }}>
          {children}
        </Stack>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ justifyContent: "center", py: 3 }}>
        {tableType === "in-queue" && (
          <Button
            variant="contained"
            disabled={isFinishing}
            sx={{ mr: 4 }}
            onClick={openConfirmDialog}
          >
            {isFinishing ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Hoàn thành"
            )}
          </Button>
        )}
        <Button variant="outlined" onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderInfoDialog;
