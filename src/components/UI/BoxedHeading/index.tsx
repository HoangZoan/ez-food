import { Box, BoxProps, Typography, SxProps, Stack } from "@mui/material";
import { styled } from "@mui/system";

interface BoxedHeadingProps {
  primary?: boolean;
  content: string;
  sx?: SxProps;
}

interface StyledBoxProps extends BoxProps {
  primary?: boolean;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "primary",
})<StyledBoxProps>(({ theme, primary }) => ({
  borderRadius: theme.shape.borderRadius,
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: primary ? theme.palette.primary.main : "white",
  color: primary ? theme.palette.primary.main : "white",
  padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
}));

const BoxedHeading = ({ primary, content, sx }: BoxedHeadingProps) => {
  return (
    <Stack alignItems="center" sx={{ mb: 8, ...sx }}>
      <StyledBox primary={primary}>
        <Typography textTransform="uppercase" variant="h2">
          {content}
        </Typography>
      </StyledBox>
    </Stack>
  );
};

export default BoxedHeading;
