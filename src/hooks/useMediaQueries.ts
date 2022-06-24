import { useMediaQuery, useTheme } from "@mui/material";

export const useMediaQueries = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return { smUp, mdUp, lgUp, smDown, mdDown, lgDown };
};
