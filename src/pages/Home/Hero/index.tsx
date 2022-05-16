import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { styled } from "shared/theme";
import heroImg from "../../../shared/images/hero.jpg";

const HeroBackground = styled(Box)({
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 70%, transparent), url(${heroImg})`,
  backgroundSize: "cover",
  height: "100vh",
  position: "relative",
});

const HeroStack = styled(Stack)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const Hero = () => {
  return (
    <HeroBackground>
      <HeroStack alignItems="center">
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
          variant="h6"
          color="common.white"
          textAlign="center"
          mt={3}
          mb={6}
        >
          Một vài lời giới thiệu
        </Typography>

        <Button size="large" variant="contained">
          <Typography variant="h6">Xem thực đơn</Typography>
        </Button>
      </HeroStack>
    </HeroBackground>
  );
};

export default Hero;
