import { Box } from "@mui/material";
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
  const sliderSettings: Settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
  };

  return (
    <Carousel settings={sliderSettings}>
      {dummyData.map((data) => (
        <Box key={data.id} sx={{ textAlign: "center", padding: "0 3.2rem" }}>
          <TrendPreviewCard title={data.title} />
        </Box>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
