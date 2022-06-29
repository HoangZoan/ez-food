import PageHeaderLayout from "./PageHeaderLayout";
import MenuButton from "./MenuButton";
import { Box, Container, Stack, SxProps } from "@mui/material";
import CartButton from "./CartButton";
import NotificationsButton from "./NotificationsButton";
import LogoutButton from "./LogoutButton";
import { useRecoilValue } from "recoil";
import { adminLoginState } from "states/admin";
import { Link } from "react-router-dom";
import logo from "shared/images/logo.svg";

const BoxSx: SxProps = {
  height: { xs: "2.8rem", sm: "3.6rem" },
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const PageHeader = () => {
  const adminState = useRecoilValue(adminLoginState);

  return (
    <PageHeaderLayout>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <MenuButton />

          <Box component={Link} to="/" sx={BoxSx}>
            <img src={logo} alt="EZ Food Logo" style={{ height: "100%" }} />
          </Box>

          <Stack direction="row" spacing={{ sm: 3 }}>
            {!adminState && (
              <>
                <CartButton />
                <NotificationsButton />
              </>
            )}
            {adminState && <LogoutButton />}
          </Stack>
        </Stack>
      </Container>
    </PageHeaderLayout>
  );
};

export default PageHeader;
