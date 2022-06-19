import PageHeaderLayout from "./PageHeaderLayout";
import MenuButton from "./MenuButton";
import { Container, Stack, Typography } from "@mui/material";
import CartButton from "./CartButton";
import NotificationsButton from "./NotificationsButton";
import LogoutButton from "./LogoutButton";
import { useRecoilValue } from "recoil";
import { adminLoginState } from "states/admin";

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

          <Typography variant="h3" color="white" lineHeight={1.2}>
            LOGO
          </Typography>

          <Stack direction="row" spacing={3}>
            {!adminState && (
              <>
                <CartButton />
                <NotificationsButton />
              </>
            )}
            {adminState && <LogoutButton />}
            <CartButton />
            <NotificationsButton />
          </Stack>
        </Stack>
      </Container>
    </PageHeaderLayout>
  );
};

export default PageHeader;
