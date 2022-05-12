import React, { useRef } from "react";
import ArrowButton from "components/UI/ArrowButton";
import Slider, { Settings } from "react-slick";

import classes from "./index.module.scss";
import { Box } from "@mui/material";

interface CarouselProps {
  settings: Settings;
  children: React.ReactNode;
}

const Carousel = ({ settings, children }: CarouselProps) => {
  const sliderRef = useRef<Slider | null>(null);

  return (
    <div className="relative">
      <Box sx={{ mx: 5 }}>
        <Slider ref={sliderRef} {...settings}>
          {children}
        </Slider>
      </Box>

      <ArrowButton
        variant="left"
        className={classes["arrow-left"]}
        onClick={() => sliderRef?.current?.slickPrev()}
      />
      <ArrowButton
        variant="right"
        className={classes["arrow-right"]}
        onClick={() => sliderRef?.current?.slickNext()}
      />
    </div>
  );
};

export default Carousel;
