import React from "react";
import { Box, Typography } from "@mui/material";

const TrendPreviewCard = ({ title }: { title: string }) => {
  return (
    <div>
      <Box sx={{ backgroundColor: "green", aspectRatio: "1 / 1" }}></Box>

      <Typography variant="subtitle1" mt={3}>
        {title}
      </Typography>
    </div>
  );
};

export default TrendPreviewCard;
