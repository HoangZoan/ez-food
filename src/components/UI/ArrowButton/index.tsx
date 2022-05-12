import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Box, SxProps } from "@mui/material";

interface ArrowButtonProps {
  onClick: () => void;
  variant: "left" | "right";
  sx?: SxProps;
}

const ArrowButton = ({ variant, onClick, sx }: ArrowButtonProps) => {
  return (
    <Box sx={{ ...sx, fontSize: "5.4rem" }} onClick={onClick}>
      {variant === "left" && (
        <ChevronLeftIcon fontSize="inherit" color="primary" />
      )}
      {variant === "right" && (
        <ChevronRightIcon fontSize="inherit" color="primary" />
      )}
    </Box>
  );
};

export default React.memo(ArrowButton);
