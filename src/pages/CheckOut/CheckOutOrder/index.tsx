import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import ConfirmationBox from "components/ConfirmationBox";
import CloseButton from "components/UI/CloseButton";
import ModalBox from "components/UI/ModalBox";
import { useState } from "react";
import { ProductOrderType } from "shared/types";
import { formatPriceText } from "shared/utils";
import { useCart } from "states/cart";

interface CheckOutOrderProps {
  item: ProductOrderType;
}

const CheckOutOrder = ({ item }: CheckOutOrderProps) => {
  const { removeOrder } = useCart();
  const { orderId, title, totalPrice } = item;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Box width={1}>
      <Divider sx={{ backgroundColor: "primary.main" }} />

      <Grid container sx={{ py: 4, pr: 3 }} columnSpacing={5}>
        <Grid item>
          <Box
            sx={{
              backgroundColor: "green",
              width: "16rem",
              aspectRatio: "1 / 1",
            }}
          ></Box>
        </Grid>
        <Grid xs item>
          <Stack justifyContent="space-between" sx={{ height: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </Typography>

            <div>
              <Typography fontWeight={700} variant="body1" mb={3}>
                Tổng: {formatPriceText(totalPrice)}
              </Typography>

              <Button variant="outlined">Thay đổi</Button>
            </div>
          </Stack>
        </Grid>
        <Grid item>
          <CloseButton onClick={openModal} />
        </Grid>
      </Grid>

      <Modal open={showModal} onClose={closeModal} disableScrollLock>
        <ModalBox
          sx={{
            backgroundColor: "white",
            py: 4,
            px: 6,
          }}
        >
          <ConfirmationBox
            title={
              <Typography variant="h6">
                Bạn muốn xóa <strong>{title}</strong> khỏi giỏ hàng?
              </Typography>
            }
            onAction={() => removeOrder(orderId)}
            onCancel={closeModal}
          />
        </ModalBox>
      </Modal>
    </Box>
  );
};

export default CheckOutOrder;
