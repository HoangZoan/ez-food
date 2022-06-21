import React, { useCallback, useState } from "react";
import { menuState } from "states/menu";
import { useRecoilValue } from "recoil";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import MenuList from "./MenuList";
import MenuPreview from "./MenuPreview";

const MenuContent = () => {
  const defaultMenuItem = useRecoilValue(menuState)[0].id;
  const [activeItem, setActiveItem] = useState(defaultMenuItem);

  const handleListHover = useCallback((itemId: string) => {
    setActiveItem(itemId);
  }, []);

  return (
    <Grid container justifyContent="space-between" columnGap={11}>
      <Grid item xs="auto">
        <MenuList activeItem={activeItem} handleHover={handleListHover} />
      </Grid>

      <Grid item xs="auto">
        <Divider
          orientation="vertical"
          sx={{ backgroundColor: "primary.light" }}
        />
      </Grid>

      <Grid item xs>
        <MenuPreview />
      </Grid>
    </Grid>
  );
};

export default React.memo(MenuContent);
