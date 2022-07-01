import { Typography } from "@mui/material";

const ProductPreviewCard = () => {
  return (
    <div>
      <div className="image-sqr" style={{ backgroundColor: "red" }}></div>

      <Typography mt={3} textAlign="center" variant="h6">
        Bánh mỳ cay
      </Typography>
    </div>
  );
};

export default ProductPreviewCard;
