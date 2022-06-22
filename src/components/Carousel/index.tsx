import React, { useRef } from "react";
import ArrowButton from "components/UI/ArrowButton";
import Slider, { Settings } from "react-slick";
import { Box, SxProps } from "@mui/material";

interface CarouselProps {
  settings: Settings;
  count?: number;
  minSlides?: number;
  children: React.ReactNode[] | React.ReactNode;
}

const Carousel = ({ settings, count, minSlides, children }: CarouselProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const sliderSettings: Settings = {
    speed: 500,
    infinite: count && minSlides ? count > minSlides : true,
    arrows: false,
    swipeToSlide: true,
    ...settings,
  };
  const arrowButtonStyle: SxProps = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

  return (
    <Box position="relative">
      <Box sx={{ mx: 5 }}>
        <Slider ref={sliderRef} {...sliderSettings}>
          {children}
        </Slider>
      </Box>

      {(!minSlides || !count || count > minSlides) && (
        <>
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
        </>
      )}
    </Box>
  );
};

export default Carousel;
