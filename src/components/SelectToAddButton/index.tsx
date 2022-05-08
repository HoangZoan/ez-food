import React, { useState } from "react";
import { SideDistType } from "shared/types";
import { Button, Menu as MuiMenu, MenuItem, MenuProps } from "@mui/material";
import { styled } from "shared/theme";
import { formatPriceText } from "shared/utils";

const Menu = styled(({ children, ...props }: MenuProps) => {
  return (
    <MuiMenu
      {...props}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      elevation={3}
    >
      {children}
    </MuiMenu>
  );
})(({ theme }) => ({
  "& .MuiPaper-root": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiList-root": {
    padding: "0",
  },
}));

interface SelectToAddButtonProps {
  content: string;
  items?: SideDistType[];
}

const SelectToAddButton = ({ content, items }: SelectToAddButtonProps) => {
  const initialSelections = items ? [...items] : [];
  const [leftedSelections, setLeftedSelections] = useState(initialSelections);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button id="select-button" onClick={handleClick} variant="outlined">
        {content}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {leftedSelections.map(({ name, price }) => (
          <MenuItem
            sx={{
              px: 4,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: (theme) => theme.colors.background.primary,
                color: (theme) => theme.palette.primary.main,
              },
            }}
            key={name}
          >
            {name} ({price === 0 ? "Miễn phí" : "+" + formatPriceText(price)})
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SelectToAddButton;
