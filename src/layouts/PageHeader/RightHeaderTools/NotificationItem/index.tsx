import React from "react";
import { Typography } from "@mui/material";
import { NotificationListType } from "shared/types";
import MenuItem from "components/UI/MenuItem";

import classes from "./index.module.scss";

const NotificationItem = ({
  id,
  image,
  title,
  description,
}: NotificationListType) => {
  return (
    <MenuItem>
      <div className={classes.box}>
        <div className="image-sqr">
          <img
            src="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
            alt="JPG"
          />
        </div>

        <div>
          <Typography mb={1} variant="h6">
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </div>
      </div>
    </MenuItem>
  );
};

export default NotificationItem;
