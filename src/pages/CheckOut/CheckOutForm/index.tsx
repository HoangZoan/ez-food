import {
  Button,
  CircularProgress,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ModalBox from "components/UI/ModalBox";
import BorderBoxLayout from "layouts/BorderBoxLayout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { IN_QUEUE_STATUS } from "shared/config";
import { cartState, cartTotalPriceState, useCart } from "states/cart";
import CheckoutInput from "../CheckOutInput";
import PriceField from "../PriceField";
import { useCreateOrder } from "api/order/hooks";
import { useNavigate } from "react-router-dom";
import { DateType } from "shared/types";
import { useMediaQueries } from "hooks/useMediaQueries";

interface CustomerInfoType {
  fullName: string;
  phoneNumber: string;
  address: string;
}

const FormBoxLayout = ({
  children,
  label,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <BorderBoxLayout sx={{ p: 4 }}>
      <Typography textTransform="uppercase" variant="h6" fontWeight={700}>
        {label}
      </Typography>

      <Divider sx={{ mt: 2 }} />

      {children}
    </BorderBoxLayout>
  );
};

const CheckOutForm = () => {
  const navigate = useNavigate();
  const cart = useRecoilValue(cartState);
  const totalPrice = useRecoilValue(cartTotalPriceState);
  const shippingFee = 25000;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const fullNameHasError = Boolean(errors.fullName);
  const phoneNumberHasError = Boolean(errors.phoneNumber);
  const addressHasError = Boolean(errors.address);
  const [showModal, setShowModal] = useState(false);
  const { resetCart } = useCart();
  const { smUp } = useMediaQueries();

  const handleSubmitSuccess = () => {
    setShowModal(true);

    setTimeout(() => {
      resetCart();
      reset({
        fullName: "",
        phoneNumber: "",
        address: "",
      } as CustomerInfoType);
      navigate("/");
    }, 2000);
  };

  const { isCreating, createOrder } = useCreateOrder({
    handleSuccess: handleSubmitSuccess,
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSunmit = (data: any) => {
    const { fullName, phoneNumber, address } = data as CustomerInfoType;

    createOrder({
      orderAt: new Date() as DateType,
      deliverAt: null,
      fullName,
      phoneNumber,
      address,
      orders: cart,
      totalPrice: totalPrice + shippingFee,
      status: IN_QUEUE_STATUS,
      cancelMessage: "",
    });
  };

  return (
    <>
      <Stack component="form" spacing={4} onSubmit={handleSubmit(onSunmit)}>
        {/* Customer Info */}
        <FormBoxLayout label="Th??ng tin kh??ch h??ng">
          <Stack sx={{ mt: 4 }} spacing={3}>
            <CheckoutInput
              id="full-name"
              error={fullNameHasError}
              errorMessage="Vui l??ng ??i???n th??ng tin h??? t??n"
              inputName="fullName"
              label="H??? t??n"
              register={register}
            />
            <CheckoutInput
              id="phone-number"
              error={phoneNumberHasError}
              errorMessage="Vui l??ng ??i???n th??ng tin s??? ??i???n tho???i"
              inputName="phoneNumber"
              label="S??? ??i???n tho???i"
              register={register}
            />
            <CheckoutInput
              id="address"
              error={addressHasError}
              errorMessage="Vui l??ng ??i???n th??ng tin s??? ?????a ch???"
              inputName="address"
              label="?????a ch???"
              register={register}
              multiline
            />
          </Stack>
        </FormBoxLayout>

        {/* Submit box */}
        <FormBoxLayout label="T???ng h??a ????n">
          <Stack alignItems="center">
            <Stack sx={{ width: 1, my: 3 }} spacing={2}>
              <PriceField label="T???m t??nh" price={totalPrice} />
              <PriceField label="V???n chuy???n" price={shippingFee} />
              <PriceField label="Th??nh ti???n" price={totalPrice + shippingFee} />
            </Stack>

            <Button variant="contained" type="submit" disabled={isCreating}>
              <Typography variant="body1" fontWeight={700}>
                Thanh to??n
              </Typography>
              {isCreating && <CircularProgress size={24} sx={{ ml: 3 }} />}
            </Button>
          </Stack>
        </FormBoxLayout>
      </Stack>

      <Modal open={showModal} onClose={handleCloseModal} disableScrollLock>
        <ModalBox
          sx={{ backgroundColor: "white", py: 5, px: { xs: 4, md: 8 } }}
        >
          <Stack
            direction={smUp ? "row" : "column-reverse"}
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h6">?????t h??ng th??nh c??ng</Typography>
            <CheckCircleIcon color="primary" sx={{ fontSize: "4.8rem" }} />
          </Stack>
        </ModalBox>
      </Modal>
    </>
  );
};

export default CheckOutForm;
