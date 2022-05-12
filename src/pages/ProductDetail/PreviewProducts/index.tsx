import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { ProductType } from "shared/types";
import { Settings } from "react-slick";
import ProductCard from "components/UI/ProductCard";
import Carousel from "components/Carousel";

const dummyData: ProductType[] = [
  {
    id: "p-1",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-2",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-3",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-4",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-5",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-6",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
];

interface PreviewProductsProps {
  sx?: SxProps;
}

const PreviewProducts = ({ sx }: PreviewProductsProps) => {
  const sliderSettings: Settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
  };

  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h4" sx={{ mb: 6 }} fontWeight={700}>
        Combo
      </Typography>

      <Carousel settings={sliderSettings}>
        {dummyData.map(({ id, title, description, price }) => (
          <Box key={id} sx={{ px: 3 }}>
            <ProductCard
              title={title}
              description={description}
              price={price}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default PreviewProducts;
