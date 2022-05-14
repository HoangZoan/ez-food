import { Box, Container, Menu } from "@mui/material";

interface MenuListPopupLayoutProps {
  anchorEl: HTMLElement | null;
  show: boolean;
  onClose: () => void;
  children: any;
}

const MenuListPopupLayout = ({
  anchorEl,
  show,
  onClose,
  children,
}: MenuListPopupLayoutProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={show}
      onClose={onClose}
      disableScrollLock={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "100%",
          left: "0 !important",
        },
      }}
    >
      <Box sx={{ width: "100vw", py: 4 }}>
        <Container>{children}</Container>
      </Box>
    </Menu>
  );
};

export default MenuListPopupLayout;
