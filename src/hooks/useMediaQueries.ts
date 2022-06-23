import { useMediaQuery, useTheme } from "@mui/material";

export const useMediaQueries = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return { smUp, smDown, mdDown, lgDown };
};
