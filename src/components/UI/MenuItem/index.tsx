import { ListItem } from "@mui/material";
import { styled } from "shared/theme";

const MenuItem = styled(ListItem)(({ theme }) => ({
  cursor: "auto",
  padding: "0 2.4rem",
  "&:not(:last-child)": {
    marginBottom: "3.6rem",

    [theme.breakpoints.up("sm")]: {
      marginBottom: "1.2rem",
    },
  },
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.colors.background.primary,
  },
}));

export default MenuItem;
