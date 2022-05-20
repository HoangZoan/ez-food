import { Button, Divider, Modal, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ModalBox from "components/UI/ModalBox";
import BorderBoxLayout from "layouts/BorderBoxLayout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { IN_QUEUE_STATUS, ORDER_KEY } from "shared/config";
import { createId } from "shared/utils";
import { cartState, cartTotalPriceState, useCart } from "states/cart";
import CheckoutInput from "../CheckOutInput";
import PriceField from "../PriceField";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { resetCart } = useCart();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSunmit = (data: any) => {
    const { fullName, phoneNumber, address } = data as CustomerInfoType;

    setShowModal(true);

    console.log({
      shipmentId: createId(ORDER_KEY),
      fullName,
      phoneNumber,
      address,
      orders: cart,
      totalPrice: totalPrice + shippingFee,
      status: IN_QUEUE_STATUS,
    });

    reset({
      fullName: "",
      phoneNumber: "",
      address: "",
    } as CustomerInfoType);

    setTimeout(() => {
      setShowModal(false);
      navigate("/");
      resetCart();
    }, 2000);
  };

  return (
    <>
      <Stack component="form" spacing={4} onSubmit={handleSubmit(onSunmit)}>
        {/* Customer Info */}
        <FormBoxLayout label="Thông tin khách hàng">
          <Stack sx={{ mt: 4 }} spacing={2}>
            <CheckoutInput
              id="full-name"
              error={fullNameHasError}
              errorMessage="Vui lòng điền thông tin họ tên"
              inputName="fullName"
              label="Họ tên"
              register={register}
            />
            <CheckoutInput
              id="phone-number"
              error={phoneNumberHasError}
              errorMessage="Vui lòng điền thông tin số điện thoại"
              inputName="phoneNumber"
              label="Số điện thoại"
              register={register}
            />
            <CheckoutInput
              id="address"
              error={addressHasError}
              errorMessage="Vui lòng điền thông tin số địa chỉ"
              inputName="address"
              label="Địa chỉ"
              register={register}
              multiline
            />
          </Stack>
        </FormBoxLayout>

        {/* Submit box */}
        <FormBoxLayout label="Tổng hóa đơn">
          <Stack alignItems="center">
            <Stack sx={{ width: 1, my: 3 }} spacing={2}>
              <PriceField label="Tạm tính" price={totalPrice} />
              <PriceField label="Vận chuyển" price={shippingFee} />
              <PriceField label="Thành tiền" price={totalPrice + shippingFee} />
            </Stack>

            <Button variant="contained" type="submit">
              <Typography variant="body1" fontWeight={700}>
                Thanh toán
              </Typography>
            </Button>
          </Stack>
        </FormBoxLayout>
      </Stack>

      <Modal open={showModal} onClose={handleCloseModal} disableScrollLock>
        <ModalBox sx={{ backgroundColor: "white", py: 5, px: 8 }}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Typography variant="h6">Đặt hàng thành công</Typography>
            <CheckCircleIcon color="primary" sx={{ fontSize: "4.8rem" }} />
          </Stack>
        </ModalBox>
      </Modal>
    </>
  );
};

export default CheckOutForm;
