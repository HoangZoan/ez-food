import PageHeaderLayout from "./PageHeaderLayout";
import MenuButton from "./MenuButton";
import { Container, Stack, Typography } from "@mui/material";
import CartButton from "./CartButton";
import NotificationsButton from "./NotificationsButton";

const PageHeader = () => {
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
            <CartButton />
            <NotificationsButton />
          </Stack>
        </Stack>
      </Container>
    </PageHeaderLayout>
  );
};

export default PageHeader;
