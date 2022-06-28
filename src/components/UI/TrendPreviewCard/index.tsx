import { Card, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  id?: string;
  title: string;
  itemType: string;
  imageUrl: string;
}

const TrendPreviewCard = ({ id, title, itemType, imageUrl }: Props) => {
  return (
    <Card
      component={Link}
      to={`products/${itemType}/${id}`}
      elevation={0}
      square
      sx={{
        "&:hover .card-text": {
          color: (theme) => theme.palette.primary.main,
        },
      }}
    >
      <CardMedia
        component="img"
        src={imageUrl}
        alt={title}
        sx={{ aspectRatio: "1 / 1" }}
      />

      <Typography
        variant="body1"
        mt={3}
        fontWeight={700}
        className="card-text"
        sx={{ transition: "all 0.2s" }}
      >
        {title}
      </Typography>
    </Card>
  );
};

export default TrendPreviewCard;
