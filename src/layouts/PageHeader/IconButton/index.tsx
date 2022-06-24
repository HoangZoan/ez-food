import { Button } from "@mui/material";
import { styled } from "shared/theme";

const IconButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: "0.8rem 1.2rem",
  minWidth: "45px",

  [theme.breakpoints.down("md")]: {
    paddingLeft: 0,
    paddingRight: 0,
  },

  "&.MuiButton-contained:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: theme.palette.primary.main,

    [theme.breakpoints.down("sm")]: {
      backgroundColor: "transparent",
      color: "white",
    },
  },
}));

export default IconButton;
