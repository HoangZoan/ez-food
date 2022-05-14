import React from "react";
import { Grid, Typography } from "@mui/material";
import { NotificationListType } from "shared/types";
import MenuItem from "components/UI/MenuItem";

const NotificationItem = ({
  id,
  image,
  title,
  description,
}: NotificationListType) => {
  return (
    <MenuItem>
      <Grid container columns={7} sx={{ width: "48rem", py: 2 }} spacing={4}>
        <Grid
          xs={2}
          item
          sx={{
            aspectRatio: "1 / 1",
            "& img": { width: 1, height: 1, objectFit: "cover" },
          }}
        >
          <img
            src="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
            alt="JPG"
          />
        </Grid>

        <Grid xs={5} item>
          <Typography mb={1} variant="h6">
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Grid>
      </Grid>
    </MenuItem>
  );
};

export default NotificationItem;
