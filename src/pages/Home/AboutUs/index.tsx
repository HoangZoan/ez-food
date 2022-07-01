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
      "Là chủ của 2 nhà hàng danh tiếng ở Texas, tôi thấu hiểu được mong muốn của người bán và người mua. Họ thật sự cần một ứng dụng tiện dụng cho nhu cầu và niềm đam mê ẩm thực.",
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
      "Nó không cần phải quá tỉ mỉ trong việc kết hợp với các nguyên liệu bởi vì tất cả những cảm hứng của tôi xuất phát từ đường phố. Và điều quan trọng nhất là kể được một câu chuyện qua từng món ăn.",
    author: "Anh Nam - Bếp trưởng",
    images: {
      large:
        "https://firebasestorage.googleapis.com/v0/b/qua-pho.appspot.com/o/chefs%2Fchef-2.jpg?alt=media&token=eb4562d7-bf8c-4c0f-9853-f69f158cda5d",
      square:
        "https://firebasestorage.googleapis.com/v0/b/qua-pho.appspot.com/o/chefs%2Fchef-2-square.jpg?alt=media&token=c4fb4be7-bb7e-4f76-8ad4-a516255a0997",
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
