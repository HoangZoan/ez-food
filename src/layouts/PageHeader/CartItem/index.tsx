import React from "react";
import MenuItem from "components/UI/MenuItem";
import { Grid, Typography } from "@mui/material";
import { ProductInCartType } from "shared/types";
import CloseIcon from "@mui/icons-material/Close";

const CartItem = ({ title, total, quantity }: ProductInCartType) => {
  return (
    <MenuItem>
      <Grid container columns={7} spacing={3} sx={{ maxWidth: "40rem" }}>
        <Grid
          xs={2}
          item
          sx={{
            aspectRatio: "1 / 1",
            "& img": {
              width: 1,
              height: 1,
              objectFit: "cover",
            },
          }}
        >
          <img
            src="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
            alt="Anh"
          />
        </Grid>

        <Grid xs item>
          <Typography mb={2} variant="h6">
            {title}
          </Typography>

          <Typography mb={1} variant="body1">
            Số lượng: {quantity}
          </Typography>
          <Typography variant="body1">
            Tổng: <strong>{total}</strong>
          </Typography>
        </Grid>

        <Grid item>
          <CloseIcon
            sx={{
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                color: (theme) => theme.colors.common.grey,
              },
            }}
          />
        </Grid>
      </Grid>
    </MenuItem>
  );
};

export default CartItem;
