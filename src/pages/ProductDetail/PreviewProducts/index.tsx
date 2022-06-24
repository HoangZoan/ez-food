import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { ProductType } from "shared/types";
import { Settings } from "react-slick";
import ProductCard from "components/UI/ProductCard";
import Carousel from "components/Carousel";
import { useMediaQueries } from "hooks/useMediaQueries";

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

const boxSx: SxProps = {
  "& .css-jltqb6": { mx: { xs: -3 } },
  "& .arrow--left": { left: "-16px" },
  "& .arrow--right": { right: "-16px" },
};

const PreviewProducts = ({ sx }: PreviewProductsProps) => {
  const { mdUp, lgUp } = useMediaQueries();
  let slidesToShow = 1;

  if (mdUp && lgUp) {
    slidesToShow = 3;
  } else if (mdUp) {
    slidesToShow = 2;
  }

  const sliderSettings: Settings = {
    slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ ...boxSx, ...sx }}>
      <Typography variant="h3" sx={{ mb: 6 }} fontWeight={700}>
        Combo
      </Typography>

      <Carousel
        settings={sliderSettings}
        count={dummyData.length}
        minSlides={slidesToShow}
      >
        {dummyData.map(({ id, title, description, price }) => (
          <Box key={id} sx={{ px: 3 }}>
            <ProductCard
              id={id}
              imageSrc=""
              menuType=""
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
