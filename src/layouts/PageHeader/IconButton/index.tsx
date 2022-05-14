import { Button, SxProps } from "@mui/material";
import { styled } from "shared/theme";

interface ButtonSx {
  [key: string]: SxProps;
}

const IconButton = styled(Button)(
  ({ theme }): ButtonSx => ({
    "&.MuiButton-root": {
      backgroundColor: "transparent",
      padding: "0.8rem 1.2rem",
      minWidth: "45px",
    },
    "&.MuiButton-contained:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: theme.palette.primary.main,
    },
  })
);

export default IconButton;
