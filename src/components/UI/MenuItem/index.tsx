import { ListItem } from "@mui/material";
import { styled } from "shared/theme";

const MenuItem = styled(ListItem)(({ theme }) => ({
  cursor: "auto",
  paddingTop: "1.2rem",
  paddingBottom: "1.2rem",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.colors.background.primary,
  },
}));

export default MenuItem;
