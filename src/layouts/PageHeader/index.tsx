import PageHeaderLayout from "./PageHeaderLayout";
import MenuButton from "./MenuButton";
import { Container, Stack, Typography } from "@mui/material";
import CartButton from "./CartButton";
import NotificationsButton from "./NotificationsButton";
import LogoutButton from "./LogoutButton";
import { useRecoilValue } from "recoil";
import { adminLoginState } from "states/admin";
import { useMediaQueries } from "hooks/useMediaQueries";

const PageHeader = () => {
  const adminState = useRecoilValue(adminLoginState);
  const { smUp } = useMediaQueries();

  return (
    <PageHeaderLayout>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <MenuButton />

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

          <Stack direction="row" spacing={smUp ? 3 : 0}>
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
