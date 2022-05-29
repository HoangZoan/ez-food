import { Box } from "@mui/material";
import { styled } from "shared/theme";

const ImageInputContainer = styled(Box)({
  width: "9.6rem",
  height: "9.6rem",
  "& img": {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

export default ImageInputContainer;
