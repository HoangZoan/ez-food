import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import PopupItem from "components/UI/PopupMenuLayout/PopupItem";
import PopupMenu from "components/UI/PopupMenuLayout/PopupMenu";

type SortsTitleType = "Đơn đang đặt" | "Đơn đã giao" | "Đơn đã hủy";

interface SortsType {
  title: SortsTitleType;
  value: "in-queue" | "delivered" | "canceled";
}

const sorts: SortsType[] = [
  { title: "Đơn đang đặt", value: "in-queue" },
  { title: "Đơn đã giao", value: "delivered" },
  { title: "Đơn đã hủy", value: "canceled" },
];

const SortButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const showMenu = Boolean(anchorEl);
  const [activeItem, setActiveItem] = useState<
    "Đơn đang đặt" | "Đơn đã giao" | "Đơn đã hủy"
  >("Đơn đang đặt");
  const selects = sorts.filter(({ title }) => title !== activeItem);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (activeValue: SortsTitleType) => {
    setActiveItem(activeValue);
    handleClose();
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<ExpandCircleDownIcon fontSize="large" />}
      >
        <Typography textTransform="capitalize" variant="body1">
          {activeItem}
        </Typography>
      </Button>

      <PopupMenu
        anchorEl={anchorEl}
        open={showMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {selects.map(({ title, value }) => (
          <PopupItem
            key={value}
            sx={{
              fontSize: "1.6rem",
              py: 3,
              paddingLeft: "1.5rem",
              paddingRight: "5.4rem",
            }}
            onClick={() => handleItemClick(title)}
          >
            {title}
          </PopupItem>
        ))}
      </PopupMenu>
    </Box>
  );
};

export default SortButton;
