import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { FormLabel, MultilineTextField } from "components/UI/FormComponents";
import MenuFormControl from "components/UI/MenuFormControl";
import { useForm } from "react-hook-form";
import InfoText from "../OrderInfoDialog/InfoText";

interface OrderDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onRemoveOrder: (message: string) => void;
  cancelMessage?: string;
}

const OrderDeleteDialog = ({
  open,
  cancelMessage: fetchedMessage,
  onClose,
  onRemoveOrder,
}: OrderDeleteDialogProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const submitForm = (values: any) => {
    const message = values.cancelMessage as string;
    onRemoveOrder(message);
    reset();
  };

  const handleCloseForm = () => {
    onClose();
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseForm}
      sx={{
        "& .MuiPaper-root": {
          minWidth: "54rem",
        },
      }}
    >
      <DialogTitle textAlign="center">Xác nhận hủy đơn hàng</DialogTitle>

      <Divider />

      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent>
          {fetchedMessage && (
            <InfoText
              title="Lý do"
              content={fetchedMessage}
              sx={{ mb: "1.6rem" }}
            />
          )}

          <MenuFormControl>
            <FormLabel htmlFor="reason">
              {fetchedMessage ? "Nội dung sửa" : "Lý do"}:
            </FormLabel>
            <MultilineTextField
              id="reason"
              error={!!errors.cancelMessage}
              {...register("cancelMessage", {
                required: {
                  value: true,
                  message: "Lý do hủy đơn hàng không dược bỏ trống",
                },
              })}
              helperText={errors.cancelMessage?.message}
            />
          </MenuFormControl>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="outlined" sx={{ mr: 3 }} onClick={handleCloseForm}>
            Trở lại
          </Button>
          <Button variant="contained" type="submit">
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OrderDeleteDialog;
