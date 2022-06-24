import { Paper, Container, Box, Grid, useTheme } from "@mui/material";
import { Settings } from "react-slick";
import Carousel from "components/Carousel";
import AuthorPicture from "./AuthorPicture";
import AuthorQuote from "./AuthorQuote";
import BoxedHeading from "components/UI/BoxedHeading";
import { useMediaQueries } from "hooks/useMediaQueries";

const chefsData = [
  {
    id: "1",
    message:
      "“It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.”",
    author: "Chị Hà - Bếp trưởng",
    images: {
      large:
        "https://firebasestorage.googleapis.com/v0/b/qua-pho.appspot.com/o/chefs%2Fchef.jpg?alt=media&token=386bddc8-e59d-4a65-bc25-03be2cdffc88",
      square:
        "https://firebasestorage.googleapis.com/v0/b/qua-pho.appspot.com/o/chefs%2Fchef-1-square.jpg?alt=media&token=323be60b-5413-4f94-91f6-8eb266a7f93f",
    },
  },
  {
    id: "2",
    message:
      "“It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.”",
    author: "Anh Nam - Bếp trưởng",
    images: {
      large:
        "https://firebasestorage.googleapis.com/v0/b/qua-pho.appspot.com/o/chefs%2Fchef.jpg?alt=media&token=386bddc8-e59d-4a65-bc25-03be2cdffc88",
      square:
        "https://firebasestorage.googleapis.com/v0/b/qua-pho.appspot.com/o/chefs%2Fchef-1-square.jpg?alt=media&token=323be60b-5413-4f94-91f6-8eb266a7f93f",
    },
  },
  {
    id: "3",
    message:
      "“It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.”",
    author: "Anh Nam - Bếp trưởng",
    images: {
      large:
        "https://firebasestorage.googleapis.com/v0/b/qua-pho.appspot.com/o/chefs%2Fchef.jpg?alt=media&token=386bddc8-e59d-4a65-bc25-03be2cdffc88",
      square:
        "https://firebasestorage.googleapis.com/v0/b/qua-pho.appspot.com/o/chefs%2Fchef-1-square.jpg?alt=media&token=323be60b-5413-4f94-91f6-8eb266a7f93f",
    },
  },
];

const AboutUs = () => {
  const { mdUp, lgUp } = useMediaQueries();
  const theme = useTheme();
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

      <Container
        sx={{
          px: { xs: 0 },

          "& .css-jltqb6": {
            [theme.breakpoints.down("sm")]: {
              mx: 2,
            },
          },
        }}
      >
        <Carousel settings={sliderSettings}>
          {chefsData.map(({ id, message, author, images }) => (
            <div key={id}>
              <Box sx={{ mx: 5 }}>
                <Grid container columnSpacing={lgUp ? 6 : 4}>
                  {mdUp && (
                    <Grid md={5} item>
                      <AuthorPicture imgSrc={images.large} />
                    </Grid>
                  )}
                  <Grid xs={12} md={7} item>
                    <AuthorQuote
                      message={message}
                      author={author}
                      avatarSrc={images.square}
                    />
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
