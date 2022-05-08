import { Paper, PaperProps } from "@mui/material";
import { styled } from "shared/theme";

const BorderBoxLayout = styled(({ children, ...props }: PaperProps) => (
  <Paper {...props} elevation={0}>
    {children}
  </Paper>
))(({ theme }) => ({ border: `1px solid ${theme.palette.primary.main}` }));

export default BorderBoxLayout;
