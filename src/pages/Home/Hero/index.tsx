import React from "react";
import { Typography } from "@mui/material";
import Button from "components/Button";

import classes from "./index.module.scss";

const Hero = () => {
  const contentWrapperClasses = `${classes["content-wrapper"]} centered-content`;

  return (
    <div className={classes.hero}>
      <div className={contentWrapperClasses}>
        <Typography
          textTransform="uppercase"
          variant="h1"
          color="common.white"
          textAlign="center"
        >
          Một vài lời giới thiệu
        </Typography>

        <Typography
          textTransform="uppercase"
          variant="subtitle1"
          color="common.white"
          textAlign="center"
          mt={3}
        >
          Một vài lời giới thiệu
        </Typography>

        <Button
          size="lg"
          variant="contained"
          className={classes["hero-button"]}
        >
          Xem thực đơn
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Hero);
