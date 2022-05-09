import React, { useRef } from "react";
import { Paper, Container, Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Slider, { Settings } from "react-slick";
import ArrowButton from "components/UI/ArrowButton";
import BoxedHeading from "components/UI/BoxedHeading";

import classes from "./index.module.scss";

const dummyData = [
  {
    id: "1",
    message:
      "“It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.”",
    author: "Anh Nam - Bếp trưởng",
  },
  {
    id: "2",
    message:
      "“It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.”",
    author: "Anh Nam - Bếp trưởng",
  },
  {
    id: "3",
    message:
      "“It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.”",
    author: "Anh Nam - Bếp trưởng",
  },
];

const ContentBox = styled(Box)(({ theme }) => ({
  textAlign: "left",
  backgroundColor: theme.palette.secondary.dark,
  color: "white",
  padding: `${theme.spacing(8)} ${theme.spacing(5)}`,
  borderRadius: theme.shape.borderRadius,
}));

const AboutUs = () => {
  const sliderRef = useRef<Slider | null>(null);
  const sliderSettings: Settings = {
    speed: 500,
    arrows: false,
  };

  return (
    <Paper
      sx={{
        py: 10,
        textAlign: "center",
        backgroundColor: "primary.light",
        borderRadius: "0",
      }}
    >
      <Container>
        <BoxedHeading
          sx={{ mb: 8, display: "inline-block" }}
          content="Về chúng tôi"
        />

        <div className="relative">
          <Slider ref={sliderRef} {...sliderSettings}>
            {dummyData.map((data) => (
              <div key={data.id}>
                <Grid container columnSpacing={10}>
                  <Grid xs={5} item>
                    <Box
                      sx={{
                        backgroundColor: "green",
                        width: "100%",
                        height: 1,
                      }}
                    ></Box>
                  </Grid>
                  <Grid xs={7} item>
                    <ContentBox>
                      <Typography variant="h5" fontWeight={300} sx={{ mb: 5 }}>
                        “{data.message}”
                      </Typography>
                      <Typography
                        textAlign="right"
                        variant="h6"
                        fontWeight={700}
                      >
                        {data.author}
                      </Typography>
                    </ContentBox>
                  </Grid>
                </Grid>
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
      </Container>
    </Paper>
  );
};

export default AboutUs;
