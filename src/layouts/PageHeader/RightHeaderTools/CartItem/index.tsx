import React from "react";
import MenuItem from "components/UI/MenuItem";
import { Typography } from "@mui/material";
import { ProductInCartType } from "shared/types";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./index.module.scss";

const CartItem = ({ title, total, quantity }: ProductInCartType) => {
  return (
    <MenuItem>
      <div className={classes.box}>
        <div className="image-sqr">
          <img
            src="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
            alt="Anh"
          />
        </div>

        <div>
          <Typography mb={2} variant="h6">
            {title}
          </Typography>

          <Typography mb={1} variant="body1">
            Số lượng: {quantity}
          </Typography>
          <Typography variant="body1">
            Tổng: <strong>{total}</strong>
          </Typography>
        </div>

        <CloseIcon
          sx={{
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              color: (theme) => theme.colors.common.grey,
            },
          }}
        />
      </div>
    </MenuItem>
  );
};

export default CartItem;
