import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import PopupItem from "components/UI/PopupMenuLayout/PopupItem";
import PopupMenu from "components/UI/PopupMenuLayout/PopupMenu";
import { OrderStatusType, TableSortsType } from "shared/types";

interface SortButtonProps {
  onChange: (value: string) => void;
  defaultQuery: OrderStatusType;
  sorts: TableSortsType[];
  side?: "left" | "right";
  width?: string;
}

const SortButton = ({
  width = "15rem",
  onChange,
  sorts,
  defaultQuery,
  side = "right",
}: SortButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const showMenu = Boolean(anchorEl);
  const defaultActiveTitle = sorts.find(
    ({ value }) => value === defaultQuery
  )?.title;
  const [activeTitle, setActiveTitle] = useState(defaultActiveTitle);
  const selects = sorts.filter(({ title }) => title !== activeTitle);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (
    activeTitle: string,
    activeValue: OrderStatusType
  ) => {
    setActiveTitle(activeTitle);
    onChange(activeValue);
    handleClose();
  };

  return (
    <Box>
      <Button
        sx={{ width }}
        variant="outlined"
        onClick={handleClick}
        endIcon={<ExpandCircleDownIcon fontSize="large" />}
      >
        <Typography textTransform="capitalize" variant="body1">
          {activeTitle}
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
              width,
              fontSize: "1.6rem",
              py: 3,
              justifyContent: "center",
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
