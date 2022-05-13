import React from "react";
import NotificationsButton from "./NotificationsButton";
import CartButton from "./CartButton";
import { Stack } from "@mui/material";

const RightHeaderTools = () => {
  return (
    <Stack direction="row" spacing={3}>
      <CartButton />
      <NotificationsButton />
    </Stack>
  );
};

export default React.memo(RightHeaderTools);
