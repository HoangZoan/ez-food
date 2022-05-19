import { Menu, MenuProps } from "@mui/material";
import { styled } from "shared/theme";

const PopupMenu = styled(({ children, ...props }: MenuProps) => {
  return (
    <Menu {...props} elevation={3}>
      {children}
    </Menu>
  );
})(({ theme }) => ({
  "& .MuiPaper-root": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiList-root": {
    padding: "0",
  },
}));

export default PopupMenu;
