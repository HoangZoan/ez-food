import {
  Button,
  Divider,
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  Stack,
  TextField as MuiTextField,
  Typography,
  TextFieldProps,
} from "@mui/material";
import BorderBoxLayout from "layouts/BorderBoxLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { SHIP_KEY } from "shared/config";
import { createId, formatPriceText } from "shared/utils";
import { cartState, cartTotalPriceState } from "states/cart";
import { styled } from "../../../shared/theme";

const FormControl = styled(MuiFormControl)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const FormLabel = styled(MuiFormLabel)({
  fontWeight: 700,
  alignSelf: "flex-start",
  lineHeight: "3.2rem",
});

const TextField = styled(MuiTextField)({
  flex: 1,
  maxWidth: "24rem",
  "& input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    fontSize: "1.4rem",
  },
});

const MultilineTextField = styled((props: TextFieldProps) => (
  <TextField {...props} multiline minRows={2} maxRows={3} />
))({
  "& .MuiOutlinedInput-root": { padding: "0" },
  "& #address": {
    padding: "0.6rem 1.4rem",
  },
});

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

  const onSunmit = (data: any) => {
    const { fullName, phoneNumber, address } = data as CustomerInfoType;

    console.log({
      shipmentId: createId(SHIP_KEY),
      fullName,
      phoneNumber,
      address,
      orders: cart,
      totalPrice: totalPrice + shippingFee,
    });

    reset({
      fullName: "",
      phoneNumber: "",
      address: "",
    } as CustomerInfoType);
  };

  return (
    <Stack
      component="form"
      spacing={4}
      onSubmit={handleSubmit(onSunmit)}
      sx={{ position: "sticky", top: "10rem" }}
    >
      {/* Customer Info */}
      <FormBoxLayout label="Thông tin khách hàng">
        <Stack sx={{ mt: 4 }} spacing={2}>
          <FormControl>
            <FormLabel htmlFor="full-name">Họ tên:</FormLabel>
            <TextField
              id="full-name"
              inputProps={{ ...register("fullName", { required: true }) }}
              error={fullNameHasError}
              helperText={fullNameHasError && "Vui lòng điền thông tin họ tên"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone-number">Số điện thoại:</FormLabel>
            <TextField
              id="phone-number"
              inputProps={{ ...register("phoneNumber", { required: true }) }}
              error={phoneNumberHasError}
              helperText={
                phoneNumberHasError && "Vui lòng điền thông tin số điện thoại"
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">Địa chỉ:</FormLabel>
            <MultilineTextField
              id="address"
              inputProps={{ ...register("address", { required: true }) }}
              error={addressHasError}
              helperText={
                addressHasError && "Vui lòng điền thông tin số địa chỉ"
              }
            />
          </FormControl>
        </Stack>
      </FormBoxLayout>

      {/* Submit box */}
      <FormBoxLayout label="Tổng hóa đơn">
        <Stack alignItems="center">
          <Stack sx={{ width: 1, my: 3 }} spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={700}>Tạm tính:</Typography>
              <Typography fontWeight={700}>
                {formatPriceText(totalPrice)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={700}>Vận chuyển:</Typography>
              <Typography fontWeight={700}>
                {formatPriceText(shippingFee)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={700}>Thành tiền:</Typography>
              <Typography fontWeight={700}>
                {formatPriceText(totalPrice + shippingFee)}
              </Typography>
            </Stack>
          </Stack>

          <Button variant="contained" type="submit">
            <Typography variant="body1" fontWeight={700}>
              Thanh toán
            </Typography>
          </Button>
        </Stack>
      </FormBoxLayout>
    </Stack>
  );
};

export default CheckOutForm;
