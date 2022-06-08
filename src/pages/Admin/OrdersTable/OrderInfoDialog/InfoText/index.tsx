import { Grid, SxProps, Typography } from "@mui/material";

interface InfoTextProps {
  title: string;
  content: string;
  sx?: SxProps;
}

const InfoText = ({ title, content, sx }: InfoTextProps) => {
  return (
    <Grid container sx={sx}>
      <Grid item xs={3.5}>
        <Typography variant="body1" fontWeight={700}>
          {title}:
        </Typography>
      </Grid>
      <Grid item xs={8.5}>
        <Typography variant="body1">{content}</Typography>
      </Grid>
    </Grid>
  );
};

export default InfoText;
