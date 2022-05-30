import React from "react";
import { Grid, Typography } from "@mui/material";
import { NotificationListType } from "shared/types";
import MenuItem from "components/UI/MenuItem";

const NotificationItem = ({
  imageUrl,
  title,
  description,
  url,
}: Omit<NotificationListType, "isPublished">) => {
  return (
    <MenuItem>
      <Grid
        component="a"
        href={url}
        container
        columns={7}
        spacing={4}
        alignItems="flex-start"
        sx={{ width: "48rem", py: 2, color: "inherit" }}
      >
        <Grid
          xs={2}
          item
          sx={{
            aspectRatio: "1 / 1",
            "& img": { width: 1, height: 1, objectFit: "cover" },
          }}
        >
          <img src={imageUrl} alt="JPG" />
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
