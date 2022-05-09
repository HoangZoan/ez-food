import React, { useState } from "react";
import { Button, Menu as MuiMenu, MenuItem, MenuProps } from "@mui/material";
import { styled } from "shared/theme";
import { formatPriceText } from "shared/utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productDetailState } from "states/productDetail";

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
}

const SelectToAddButton = ({ content }: SelectToAddButtonProps) => {
  const { availableSideDish, selectedSideDish } =
    useRecoilValue(productDetailState);
  const setProductState = useSetRecoilState(productDetailState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (itemName: string) => {
    const newSelectedIndex = availableSideDish.findIndex(
      ({ name }) => name === itemName
    );
    const newAvailableSideDish = [
      ...availableSideDish.slice(0, newSelectedIndex),
      ...availableSideDish.slice(newSelectedIndex + 1),
    ];

    setProductState((oldState) => ({
      ...oldState,
      selectedSideDish: [
        ...selectedSideDish,
        availableSideDish[newSelectedIndex],
      ],
      availableSideDish: newAvailableSideDish,
    }));
    handleClose();
  };

  if (availableSideDish.length <= 0) {
    return null;
  }

  return (
    <div>
      <Button id="select-button" onClick={handleClick} variant="outlined">
        {content}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {availableSideDish.map(({ name, price }) => (
          <MenuItem
            onClick={() => handleItemClick(name)}
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
