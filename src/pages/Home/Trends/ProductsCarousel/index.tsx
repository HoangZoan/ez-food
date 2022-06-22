import { Box, useMediaQuery, useTheme } from "@mui/material";
import Carousel from "components/Carousel";
import TrendPreviewCard from "components/UI/TrendPreviewCard";
import React from "react";
import { Settings } from "react-slick";

const dummyData = [
  { id: "1", title: "Banh My" },
  { id: "2", title: "Banh My" },
  { id: "3", title: "Banh My" },
  { id: "4", title: "Banh My" },
  { id: "5", title: "Banh My" },
  { id: "6", title: "Banh My" },
];

const ProductsCarousel = () => {
  const theme = useTheme();
  const { sm: breakSm, md: breakMd } = theme.breakpoints.values;
  const matchSm = useMediaQuery(theme.breakpoints.down(breakSm));
  const matchMd = useMediaQuery(theme.breakpoints.down(breakMd));
  let minSlides = 4;

  if (matchSm && matchMd) {
    minSlides = 1;
  } else if (matchMd) {
    minSlides = 2;
  }

  const sliderSettings: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: breakSm,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: breakMd,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Carousel
      minSlides={minSlides}
      count={dummyData.length}
      settings={sliderSettings}
    >
      {dummyData.map((data) => (
        <Box key={data.id} sx={{ textAlign: "center", padding: "0 3.2rem" }}>
          <TrendPreviewCard title={data.title} />
        </Box>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
