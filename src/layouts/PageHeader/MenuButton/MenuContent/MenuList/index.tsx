import React, { useContext } from "react";
import { useRecoilValue } from "recoil";
import { menuState } from "states/menu";
import { ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MenuButtonContext } from "../../context/MenuButtonContext";
import { useMediaQueries } from "hooks/useMediaQueries";

interface MenuListProps {
  activeItem: string;
  handleHover: (itemId: string) => void;
}

interface ItemProps {
  itemType: string;
  content: string;
  active: boolean;
  handleHover: (itemId: string) => void;
}

const Item = ({ content, itemType, active, handleHover }: ItemProps) => {
  const { onClosePopup } = useContext(MenuButtonContext);
  const { smDown } = useMediaQueries();

  return (
    <ListItem
      sx={[
        {
          padding: "1.6rem 0",
          transition: "all 0.2s",
          color: active ? "primary.main" : "black",
        },
        smDown && {
          color: "black",
        },
      ]}
      onMouseOver={() => handleHover(itemType)}
    >
      <Typography
        component={Link}
        to={`/products/${itemType}?page=1`}
        textTransform="uppercase"
        variant="h6"
        sx={{ color: "inherit" }}
        onClick={onClosePopup}
      >
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
          key={item.value}
          itemType={item.value}
          content={item.title}
          active={activeItem === item.value}
          handleHover={handleHover}
        />
      ))}
    </ul>
  );
};

export default React.memo(MenuList);
