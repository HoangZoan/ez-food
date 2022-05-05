import React, { useRef } from "react";
import { Typography } from "@mui/material";
import Slider, { Settings } from "react-slick";

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

      <div>
        <Slider ref={sliderRef} {...sliderSettings}>
          {dummyData.map((data) => (
            <div key={data.id} className={classes.slider}>
              <div
                style={{ backgroundColor: "green" }}
                className="image-sqr"
              ></div>
              <div>{data.title}</div>
            </div>
          ))}
        </Slider>

        <button onClick={() => sliderRef?.current?.slickPrev()}>Prev</button>
        <button onClick={() => sliderRef?.current?.slickNext()}>Next</button>
      </div>
    </div>
  );
};

export default Trends;
