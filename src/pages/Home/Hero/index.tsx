import { Box, Button, Stack, Typography } from "@mui/material";
import { useMediaQueries } from "hooks/useMediaQueries";
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
  width: "90%",
});

const Hero = () => {
  const { smDown, mdDown } = useMediaQueries();
  const handleViewMenuButtonClick = () => {
    document
      .getElementById("trends")
      ?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

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
          variant={mdDown ? "body1" : "h6"}
          color="common.white"
          textAlign="center"
          mt={3}
          mb={6}
        >
          Một vài lời giới thiệu
        </Typography>

        <Button size="large" variant="contained">
          <Typography
            variant={smDown ? "body1" : "h6"}
            onClick={handleViewMenuButtonClick}
          >
            Xem thực đơn
          </Typography>
        </Button>
      </HeroStack>
    </HeroBackground>
  );
};

export default Hero;
