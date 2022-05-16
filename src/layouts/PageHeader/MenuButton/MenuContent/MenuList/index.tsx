import React from "react";
import { useRecoilValue } from "recoil";
import { menuState } from "states/menu";
import { ListItem, Typography } from "@mui/material";

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
  return (
    <ListItem
      sx={{
        padding: "1.6rem 0",
        transition: "all 0.2s",
        color: active ? "primary.main" : "black",
      }}
      onMouseOver={() => handleHover(id)}
    >
      <Typography textTransform="uppercase" variant="h6">
        {content}
      </Typography>
    </ListItem>
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
