import { ListItem } from "@mui/material";
import { styled } from "shared/theme";

const MenuItem = styled(ListItem)(({ theme }) => ({
  cursor: "auto",
  padding: "1.6rem 2.4rem",
  [theme.breakpoints.down("sm")]: {
    padding: "3.2rem 2.4rem",
  },
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.colors.background.primary,
  },
}));

export default MenuItem;
