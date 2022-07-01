import { Button, Container, Stack, Typography } from "@mui/material";
import { useMediaQueries } from "hooks/useMediaQueries";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { smDown } = useMediaQueries();

  return (
    <Container>
      <Stack
        sx={{ mt: "6.4rem", height: "calc(100vh - 360px)" }}
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        <Typography
          textAlign="center"
          variant={smDown ? "body1" : "h5"}
          lineHeight={1.5}
        >
          Trang bạn đang tìm không tồn tại
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Trở lại trang chủ
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
