import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useSnackbar();

  const handleFormSubmit = (data: any) => {
    console.log("submit");
    // Temporary
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess) {
      showToast({
        title: isSuccess
          ? "Đăng nhập thành công"
          : "Đăng nhập không thành công",
        type: isSuccess ? "success" : "error",
        SnackbarProps: {
          anchorOrigin: { vertical: "top", horizontal: "center" },
        },
      });
    }
  }, [isSuccess, showToast]);

  return (
    <>
      <Box
        sx={{
          pt: 13,
          pb: "10rem",
          backgroundColor: (theme) => theme.colors.common.grey,
        }}
      >
        <Stack alignItems="center">
          <Paper
            sx={{ py: 4, px: 6 }}
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
            >
              Đăng nhập
            </Typography>

            <Stack spacing={3}>
              <FormControl>
                <FormLabel htmlFor="login-id" sx={{ mb: 2 }}>
                  Tên đăng nhập:
                </FormLabel>
                <TextField
                  id="login-id"
                  InputProps={{ sx: { minWidth: "27rem" } }}
                  inputProps={{ sx: { py: 2 } }}
                  error={Boolean(errors.id)}
                  helperText={errors.id && errors.id.message}
                  {...register("id", {
                    required: {
                      value: true,
                      message: "Tên đăng nhập không được bỏ trống",
                    },
                  })}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="login-password" sx={{ mb: 2 }}>
                  Mật khẩu:
                </FormLabel>
                <TextField
                  id="login-password"
                  type="password"
                  InputProps={{ sx: { minWidth: "27rem" } }}
                  inputProps={{ sx: { py: 2 } }}
                  error={Boolean(errors.password)}
                  helperText={errors.password && errors.password.message}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Mật khẩu không được bỏ trống",
                    },
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có độ dài tối thiểu là 6 ký tự",
                    },
                  })}
                />
              </FormControl>
            </Stack>

            <Stack alignItems="center" sx={{ mt: 5 }}>
              <Button type="submit" variant="contained">
                Đăng nhập
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Box>

      {/* <StatusSnackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackbar}
        onClose={handleClose}
        title={
          isSuccess ? "Đăng nhập thành công" : "Đăng nhập không thành công"
        }
        severity={isSuccess ? "success" : "error"}
      /> */}
    </>
  );
};

export default Login;
