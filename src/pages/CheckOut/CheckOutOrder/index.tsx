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
import ProductDetailCard from "components/ProductDetailCard";
import CloseButton from "components/UI/CloseButton";
import ModalBox from "components/UI/ModalBox";
import { useState } from "react";
import { ProductDetailType, ProductOrderType } from "shared/types";
import { formatPriceText } from "shared/utils";
import { useCart } from "states/cart";

interface CheckOutOrderProps {
  item: ProductOrderType;
}

const CheckOutOrder = ({ item }: CheckOutOrderProps) => {
  const { removeOrder } = useCart();
  const {
    orderId,
    title,
    totalPrice,
    availableSideDish,
    id,
    options,
    price,
    quantity,
    selectedSideDish,
  } = item;
  const [showModal, setShowModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const openConfirmationModal = () => {
    setShowModal(true);
    setIsRemoving(true);
  };

  const closeConfirmationModal = () => {
    setShowModal(false);
    setIsRemoving(false);
  };

  const openChangeModal = () => {
    setShowModal(true);
    setIsChanging(true);
  };

  const closeChangeModal = () => {
    setShowModal(false);
    setIsChanging(false);
  };

  const handleChangeProduct = (data: ProductDetailType) => {
    console.log(data);
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

              <Button variant="outlined" onClick={openChangeModal}>
                Thay đổi
              </Button>
            </div>
          </Stack>
        </Grid>
        <Grid item>
          <CloseButton onClick={openConfirmationModal} />
        </Grid>
      </Grid>

      <Modal
        open={showModal}
        onClose={isRemoving ? closeConfirmationModal : closeChangeModal}
        disableScrollLock
      >
        <ModalBox
          sx={{
            backgroundColor: "white",
          }}
        >
          {isRemoving && (
            <ConfirmationBox
              title={
                <>
                  Bạn muốn xóa <strong>{title}</strong> khỏi giỏ hàng?
                </>
              }
              onAction={() => removeOrder(orderId)}
              onCancel={closeConfirmationModal}
              sx={{ py: 4, px: 6 }}
            />
          )}
          {isChanging && (
            <ProductDetailCard
              item={{
                id,
                title,
                options,
                availableSideDish,
                selectedSideDish,
                price,
                quantity,
                totalPrice,
              }}
              actionButton={<Button>Thay Doi</Button>}
              onSubmit={handleChangeProduct}
              sx={{ minWidth: "54rem" }}
            />
          )}
        </ModalBox>
      </Modal>
    </Box>
  );
};

export default CheckOutOrder;
