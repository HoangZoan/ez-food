import { ListItem, styled } from "@mui/material";

const PopupItem = styled(ListItem)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "1.6rem",
  transition: "all 0.2s",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.background.primary,
    color: theme.palette.primary.main,
  },
}));

export default PopupItem;
