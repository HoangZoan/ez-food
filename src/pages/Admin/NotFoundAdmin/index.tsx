import { Stack, Typography } from "@mui/material";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";

const NotFoundAdmin = () => {
  return (
    <Stack
      spacing={3}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ fontSize: "4.8rem" }}
    >
      <ReportGmailerrorredOutlinedIcon color="error" fontSize="inherit" />
      <Typography variant="h5">Trang không tồn tại</Typography>
    </Stack>
  );
};

export default NotFoundAdmin;
