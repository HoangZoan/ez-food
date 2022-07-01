import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ProductDetailCard from "components/ProductDetailCard";
import CloseButton from "components/UI/CloseButton";
import { useState } from "react";
import { ProductDetailType, ProductOrderType } from "shared/types";
import { formatPriceText } from "shared/utils";
import { useCart } from "states/cart";
import { useConfirmationDialog } from "states/confirmationDialog/hooks";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";

interface CheckOutOrderProps {
  item: ProductOrderType;
}

const ActionButtons = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <Stack direction="row" spacing={4}>
      <Button variant="outlined" onClick={onCancel}>
        Trở lại
      </Button>
      <Button type="submit" variant="contained">
        Thay đổi
      </Button>
    </Stack>
  );
};

const CheckOutOrder = ({ item }: CheckOutOrderProps) => {
  const { removeOrder, changeOrder } = useCart();
  const { openDialog } = useConfirmationDialog();
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
    date,
    description,
    imageUrl,
  } = item;
  const [isChanging, setIsChanging] = useState(false);
  const { showToast } = useSnackbar();

  const openChangeModal = () => {
    setIsChanging(true);
  };

  const closeChangeModal = () => {
    setIsChanging(false);
  };

  const handleRemoveItem = () => {
    openDialog({
      content: (
        <>
          Bạn muốn xóa <strong>{title}</strong> khỏi giỏ hàng?
        </>
      ),
      onConfirm: () => removeOrder(orderId),
    });
  };

  const handleChangeProduct = (data: ProductDetailType) => {
    const changedData = {
      ...data,
      date,
      orderId,
      title,
    } as ProductOrderType;

    changeOrder(changedData);
    closeChangeModal();
    showToast({ title: "Thay đổi thành công!", type: "success" });
  };

  return (
    <Card sx={{ width: 1 }} square elevation={0}>
      <Divider sx={{ backgroundColor: "primary.main" }} />

      <Grid container sx={{ pt: 4, pb: 6 }} rowGap={4} columnGap={5}>
        <Grid item xs={12} lg={3}>
          <CardMedia
            component="img"
            src={imageUrl}
            alt={title}
            sx={{
              aspectRatio: "1 / 1",
            }}
          />
        </Grid>
        <Grid item xs component={CardContent} sx={{ p: 0 }}>
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

              <CardActions sx={{ p: 0 }}>
                <Button variant="outlined" onClick={openChangeModal}>
                  Thay đổi
                </Button>
              </CardActions>
            </div>
          </Stack>
        </Grid>
        <Grid item>
          <CloseButton onClick={handleRemoveItem} />
        </Grid>
      </Grid>

      <Dialog open={isChanging} onClose={closeChangeModal} disableScrollLock>
        <ProductDetailCard
          item={{
            id,
            title,
            imageUrl,
            options,
            availableSideDish,
            selectedSideDish,
            price,
            quantity,
            totalPrice,
            description,
          }}
          actionButton={<ActionButtons onCancel={closeChangeModal} />}
          onSubmit={handleChangeProduct}
          sx={{ minWidth: { sm: "54rem" } }}
        />
      </Dialog>
    </Card>
  );
};

export default CheckOutOrder;
