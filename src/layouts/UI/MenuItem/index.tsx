import { MenuItem as MuiMenuItem } from "@mui/material";
import { styled } from "../../../shared/theme";

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.colors.background.primary,
  },
}));

export default MenuItem;
