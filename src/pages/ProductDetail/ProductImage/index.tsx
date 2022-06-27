import { Box } from "@mui/material";

const ProductImage = ({
  imgSrc,
  imgAlt,
}: {
  imgSrc: string;
  imgAlt: string;
}) => {
  return (
    <Box sx={{ width: 1, aspectRatio: "1 / 1" }}>
      <img
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        src={imgSrc}
        alt={imgAlt}
      />
    </Box>
  );
};

export default ProductImage;
