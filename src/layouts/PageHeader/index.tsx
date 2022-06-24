import PageHeaderLayout from "./PageHeaderLayout";
import MenuButton from "./MenuButton";
import { Container, Stack, Typography } from "@mui/material";
import CartButton from "./CartButton";
import NotificationsButton from "./NotificationsButton";
import LogoutButton from "./LogoutButton";
import { useRecoilValue } from "recoil";
import { adminLoginState } from "states/admin";
import { Link } from "react-router-dom";

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

          <Link to="/">
            <Typography
              variant="h3"
              color="white"
              lineHeight={1.2}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              LOGO
            </Typography>
          </Link>

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
