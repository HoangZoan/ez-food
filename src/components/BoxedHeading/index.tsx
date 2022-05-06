import { Box, BoxProps, SxProps, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface BoxedHeadingProps {
  primary?: boolean;
  content: string;
  sx?: SxProps;
}

type StyledBoxProps = BoxProps & BoxedHeadingProps;

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
    <StyledBox primary={primary} sx={sx}>
      <Typography textTransform="uppercase" variant="h2">
        {content}
      </Typography>
    </StyledBox>
  );
};

export default BoxedHeading;
