import React from "react";
import { Typography } from "@mui/material";
import Button from "components/Button";

import classes from "./index.module.scss";

const Hero = () => {
  return (
    <div className={classes.hero}>
      <div className="centered-content">
        <Typography textTransform="uppercase" variant="h1" color="common.white">
          Some interesting title
        </Typography>

        <Button>Abc</Button>
      </div>
    </div>
  );
};

export default React.memo(Hero);
