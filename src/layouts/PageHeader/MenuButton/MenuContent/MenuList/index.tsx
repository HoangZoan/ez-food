import React from "react";
import { useRecoilValue } from "recoil";
import { menuState } from "states/menu";
import { Typography } from "@mui/material";

import classes from "./index.module.scss";

interface MenuListProps {
  activeItem: string;
  handleHover: (itemId: string) => void;
}

interface ItemProps {
  id: string;
  content: string;
  active: boolean;
  handleHover: (itemId: string) => void;
}

const Item = ({ id, content, active, handleHover }: ItemProps) => {
  const listClasses = active ? classes["item-active"] : classes.item;

  return (
    <li className={listClasses} onMouseOver={() => handleHover(id)}>
      <Typography textTransform="uppercase" variant="h5">
        {content}
      </Typography>
    </li>
  );
};

const MenuList = ({ activeItem, handleHover }: MenuListProps) => {
  const menu = useRecoilValue(menuState);

  return (
    <ul>
      {menu.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          content={item.title}
          active={activeItem === item.id}
          handleHover={handleHover}
        />
      ))}
    </ul>
  );
};

export default React.memo(MenuList);
