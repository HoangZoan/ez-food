import { Box } from "@mui/material";
import { styled } from "shared/theme";

const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: theme.shadows[2],
  zIndex: theme.zIndex.snackbar,
  borderRadius: theme.shape.borderRadius,
}));

export default ModalBox;
