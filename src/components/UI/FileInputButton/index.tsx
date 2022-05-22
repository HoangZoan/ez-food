import { styled } from "shared/theme";
import { FormLabel } from "../FormComponents";

const FileInputButton = styled(FormLabel)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  cursor: "pointer",
  borderRadius: "9px",
  fontSize: "1.2rem",
  fontWeight: 400,
  color: theme.palette.primary.main,
  padding: "0.6rem 1.2rem",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

export default FileInputButton;
