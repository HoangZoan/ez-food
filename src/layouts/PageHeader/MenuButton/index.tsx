import React, { useCallback, useState } from "react";
import MenuButtonBase from "./MenuButtonBase";
import MenuListPopupLayout from "./MenuListPopupLayout";
import MenuContent from "./MenuContent";

const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [show, setShow] = useState(false);

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = event.target as HTMLElement;
      const buttonEl = target.closest(".rounded") as HTMLElement;

      setShow(true);
      setAnchorEl(buttonEl);
    },
    []
  );

  const handleOnClose = () => {
    setAnchorEl(null);
    setShow(false);
  };

  return (
    <div>
      <MenuButtonBase onClick={handleButtonClick} />

      <MenuListPopupLayout
        show={show}
        anchorEl={anchorEl}
        onClose={handleOnClose}
      >
        <MenuContent />
      </MenuListPopupLayout>
    </div>
  );
};

export default React.memo(MenuButton);
