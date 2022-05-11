import { Box } from "@mui/material";
import { styled } from "shared/theme";

const BorderBoxLayout = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "9px",
}));

export default BorderBoxLayout;
