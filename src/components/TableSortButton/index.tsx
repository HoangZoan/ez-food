import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import PopupItem from "components/UI/PopupMenuLayout/PopupItem";
import PopupMenu from "components/UI/PopupMenuLayout/PopupMenu";
import { TableSortsType } from "shared/types";

interface SortButtonProps {
  onChange: (value: string) => void;
  sorts: TableSortsType[];
  side?: "left" | "right";
}

const SortButton = ({ onChange, sorts, side = "right" }: SortButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const showMenu = Boolean(anchorEl);
  const [activeItem, setActiveItem] = useState(sorts[0].title);
  const selects = sorts.filter(({ title }) => title !== activeItem);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (activeTitle: string, activeValue: string) => {
    setActiveItem(activeTitle);
    onChange(activeValue);
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
          horizontal: side,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: side,
        }}
      >
        {selects.map(({ title, value }) => (
          <PopupItem
            key={value}
            sx={{
              fontSize: "1.6rem",
              py: 3,
              padding: "1rem 2.4rem",
            }}
            onClick={() => handleItemClick(title, value)}
          >
            {title}
          </PopupItem>
        ))}
      </PopupMenu>
    </Box>
  );
};

export default SortButton;
