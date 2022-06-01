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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminLoginState } from "states/admin";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";
import { FirebaseAuthService } from "../../../firebase/authService";

const Login = () => {
  const adminState = useRecoilValue(adminLoginState);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { showToast } = useSnackbar();

  const handleFormSubmit = async ({
    email,
    password,
  }: {
    [key: string]: string;
  }) => {
    try {
      await FirebaseAuthService.loginUser(email, password);

      showToast({
        title: "Đăng nhập thành công",
        type: "success",
        SnackbarProps: {
          anchorOrigin: { vertical: "top", horizontal: "center" },
        },
      });
    } catch (error: any) {
      showToast({
        title: "Đăng nhập không thành công",
        type: "error",
        SnackbarProps: {
          anchorOrigin: { vertical: "top", horizontal: "center" },
        },
      });
    }
  };

  useEffect(() => {
    if (adminState) {
      navigate("/admin");
    }
  }, [adminState, navigate]);

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
                  Email:
                </FormLabel>
                <TextField
                  id="login-id"
                  InputProps={{ sx: { minWidth: "27rem" } }}
                  inputProps={{ sx: { py: 2 } }}
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email không được bỏ trống",
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
    </>
  );
};

export default Login;
