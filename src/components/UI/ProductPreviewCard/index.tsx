import { Card, CardMedia, Typography } from "@mui/material";

interface Props {
  imgSrc: string;
  title: string;
}

const ProductPreviewCard = ({ title, imgSrc }: Props) => {
  return (
    <Card elevation={0} square>
      <CardMedia component="img" src={imgSrc} alt={title} />

      <Typography mt={3} textAlign="center" variant="body1" fontWeight={700}>
        {title}
      </Typography>
    </Card>
  );
};

export default ProductPreviewCard;
