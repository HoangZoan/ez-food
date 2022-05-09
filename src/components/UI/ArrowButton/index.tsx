import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ThemeProvider } from "@mui/material";
import defaultTheme from "../../../shared/theme";

import classes from "./index.module.scss";

interface ArrowButtonProps {
  onClick: () => void;
  className?: string;
  variant: "left" | "right";
}

const ArrowButton = ({
  variant,
  onClick,
  className: newClass,
}: ArrowButtonProps) => {
  return (
    <div onClick={onClick} className={classes.arrow + " " + newClass}>
      {variant === "left" && (
        <ChevronLeftIcon fontSize="inherit" color="primary" />
      )}
      {variant === "right" && (
        <ChevronRightIcon fontSize="inherit" color="primary" />
      )}
    </div>
  );
};

export default React.memo(ArrowButton);
