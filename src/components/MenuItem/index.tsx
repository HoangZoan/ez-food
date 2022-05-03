import { MenuItem as MuiMenuItem } from "@mui/material";
import { styled } from "../../shared/theme";

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  cursor: "auto",
  paddingTop: "1.8rem",
  paddingBottom: "1.8rem",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.colors.background.primary,
  },
}));

export default MenuItem;
