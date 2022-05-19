import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { formatPriceText } from "shared/utils";
import { useRecoilValue } from "recoil";
import { productSideDishState, useProductSideDish } from "states/productDetail";
import SideDishChips from "../SideDishChips";
import PopupItem from "components/UI/PopupMenuLayout/PopupItem";
import PopupMenu from "components/UI/PopupMenuLayout/PopupMenu";

interface SelectToAddButtonProps {
  content: string;
}

const SelectToAddButton = ({ content }: SelectToAddButtonProps) => {
  const { addSideDish, removeSideDish } = useProductSideDish();
  const { availableSideDish, selectedSideDish } =
    useRecoilValue(productSideDishState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddSideDish = (itemName: string) => {
    addSideDish(itemName);
    handleClose();
  };

  const handleRemoveSideDish = (itemName: string) => {
    removeSideDish(itemName);
  };

  return (
    <Stack
      alignItems="flex-start"
      spacing={selectedSideDish.length > 0 ? 3 : 0}
    >
      <SideDishChips items={selectedSideDish} onDelete={handleRemoveSideDish} />

      {availableSideDish.length > 0 && (
        <>
          <Button id="select-button" onClick={handleClick} variant="outlined">
            {content}
          </Button>

          <PopupMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {availableSideDish.map(({ name, price }) => (
              <PopupItem
                key={name}
                onClick={() => handleAddSideDish(name)}
                sx={{ py: 3 }}
              >
                {name} (
                {price === 0 ? "Miễn phí" : "+" + formatPriceText(price)})
              </PopupItem>
            ))}
          </PopupMenu>
        </>
      )}
    </Stack>
  );
};

export default SelectToAddButton;
