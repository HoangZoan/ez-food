import { styled } from "shared/theme";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = styled(CloseIcon)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    color: theme.colors.common.grey,
  },
}));

export default CloseButton;
