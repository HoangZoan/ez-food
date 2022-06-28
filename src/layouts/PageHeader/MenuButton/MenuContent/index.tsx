import React, { useCallback, useState } from "react";
import { menuState } from "states/menu";
import { useRecoilValue } from "recoil";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import MenuList from "./MenuList";
import MenuPreview from "./MenuPreview";
import { useFetchedMenu } from "api/menu/hooks";
import { useMediaQueries } from "hooks/useMediaQueries";

const MenuContent = () => {
  const { smUp } = useMediaQueries();
  const defaultMenuItem = useRecoilValue(menuState)[0].value;
  const [activeItem, setActiveItem] = useState(defaultMenuItem);
  const { fetchedMenu } = useFetchedMenu(activeItem, 3);

  const handleListHover = useCallback((itemId: string) => {
    setActiveItem(itemId);
  }, []);

  return (
    <Grid
      container
      justifyContent={{ xs: "center", sm: "space-between" }}
      sx={{ px: { xs: "2rem" } }}
    >
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <MenuList activeItem={activeItem} handleHover={handleListHover} />
      </Grid>

      {smUp && (
        <Grid item xs="auto">
          <Divider
            orientation="vertical"
            sx={{ backgroundColor: "primary.light" }}
          />
        </Grid>
      )}

      {smUp && (
        <Grid item sm={6} md={8} lg={9}>
          <MenuPreview items={fetchedMenu} />
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(MenuContent);
