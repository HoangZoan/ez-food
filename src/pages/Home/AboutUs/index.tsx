import { Paper, Container, Box, Grid } from "@mui/material";
import { Settings } from "react-slick";
import Carousel from "components/Carousel";
import AuthorPicture from "./AuthorPicture";
import AuthorQuote from "./AuthorQuote";
import BoxedHeading from "components/UI/BoxedHeading";

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

const AboutUs = () => {
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
      <BoxedHeading content="Về chúng tôi" />

      <Container>
        <Carousel settings={sliderSettings}>
          {dummyData.map(({ id, message, author }) => (
            <div key={id}>
              <Box sx={{ mx: 5 }}>
                <Grid container columnSpacing={10}>
                  <Grid xs={5} item>
                    <AuthorPicture />
                  </Grid>
                  <Grid xs={7} item>
                    <AuthorQuote message={message} author={author} />
                  </Grid>
                </Grid>
              </Box>
            </div>
          ))}
        </Carousel>
      </Container>
    </Paper>
  );
};

export default AboutUs;
