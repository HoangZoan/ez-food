import React, { useRef } from "react";
import { Typography } from "@mui/material";
import Slider, { Settings } from "react-slick";
import ArrowButton from "components/UI/ArrowButton";

import classes from "./index.module.scss";

const dummyData = [
  { id: "1", title: "Banh My" },
  { id: "2", title: "Banh My" },
  { id: "3", title: "Banh My" },
  { id: "4", title: "Banh My" },
  { id: "5", title: "Banh My" },
  { id: "6", title: "Banh My" },
];

const Trends = () => {
  const sliderRef = useRef<Slider | null>(null);
  const sliderSettings: Settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className={classes.wrapper + " container"}>
      <Typography
        textTransform="uppercase"
        variant="h2"
        mb={5}
        sx={{ color: "primary.main" }}
      >
        New + Hot Trend
      </Typography>

      <div className="relative">
        <Slider ref={sliderRef} {...sliderSettings}>
          {dummyData.map((data) => (
            <div key={data.id} className={classes.slider}>
              <div
                style={{ backgroundColor: "green" }}
                className="image-sqr"
              ></div>
              <Typography variant="h5" mt={3}>
                {data.title}
              </Typography>
            </div>
          ))}
        </Slider>

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
    </div>
  );
};

export default Trends;
