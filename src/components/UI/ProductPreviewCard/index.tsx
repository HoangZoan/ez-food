import { Card, CardMedia, SxProps, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "shared/theme";

interface Props {
  imgSrc: string;
  title: string;
  pathNameData: {
    id: string;
    itemType: string;
  };
  onClick: () => void;
}

const CardSx: SxProps = {
  "& p": {
    transition: "all 0.2s",
  },

  "&:hover p": {
    color: theme.palette.primary.main,
  },
};

const ProductPreviewCard = ({
  title,
  imgSrc,
  pathNameData,
  onClick,
}: Props) => {
  const { id, itemType } = pathNameData;

  return (
    <Card
      component={Link}
      to={`products/${itemType}/${id}`}
      sx={CardSx}
      elevation={0}
      square
      onClick={onClick}
    >
      <CardMedia component="img" src={imgSrc} alt={title} />

      <Typography mt={3} textAlign="center" variant="body1" fontWeight={700}>
        {title}
      </Typography>
    </Card>
  );
};

export default ProductPreviewCard;
