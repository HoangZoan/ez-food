import React, { useCallback, useState } from "react";
import { menuState } from "states/menu";
import { useRecoilValue } from "recoil";
import Grid from "@mui/material/Grid";
import { Divider, useMediaQuery, useTheme } from "@mui/material";
import MenuList from "./MenuList";
import MenuPreview from "./MenuPreview";
import { useFetchedMenu } from "api/menu/hooks";

const MenuContent = () => {
  const theme = useTheme();
  const { sm: breakSm } = theme.breakpoints.values;
  const matchSm = useMediaQuery(theme.breakpoints.up(breakSm));
  const defaultMenuItem = useRecoilValue(menuState)[0].value;
  const [activeItem, setActiveItem] = useState(defaultMenuItem);
  const { fetchedMenu: beverageMenu } = useFetchedMenu(activeItem, 3);

  const handleListHover = useCallback((itemId: string) => {
    setActiveItem(itemId);
  }, []);

  return (
    <Grid container justifyContent="space-between" sx={{ px: { xs: "2rem" } }}>
      <Grid item xs={5} md={3} lg={2}>
        <MenuList activeItem={activeItem} handleHover={handleListHover} />
      </Grid>

      {matchSm && (
        <Grid item xs="auto">
          <Divider
            orientation="vertical"
            sx={{ backgroundColor: "primary.light" }}
          />
        </Grid>
      )}

      {matchSm && (
        <Grid item xs={6} md={8} lg={9}>
          <MenuPreview items={beverageMenu} />
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(MenuContent);
