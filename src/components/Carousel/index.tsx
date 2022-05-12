import React, { useRef } from "react";
import ArrowButton from "components/UI/ArrowButton";
import Slider, { Settings } from "react-slick";
import { Box, SxProps } from "@mui/material";

interface CarouselProps {
  settings: Settings;
  children: React.ReactNode;
}

const Carousel = ({ settings, children }: CarouselProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const arrowButtonStyle: SxProps = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

  return (
    <Box position="relative">
      <Box sx={{ mx: 5 }}>
        <Slider ref={sliderRef} {...settings}>
          {children}
        </Slider>
      </Box>

      <ArrowButton
        sx={{ ...arrowButtonStyle, left: "0" }}
        variant="left"
        onClick={() => sliderRef?.current?.slickPrev()}
      />
      <ArrowButton
        sx={{ ...arrowButtonStyle, right: "0" }}
        variant="right"
        onClick={() => sliderRef?.current?.slickNext()}
      />
    </Box>
  );
};

export default Carousel;
