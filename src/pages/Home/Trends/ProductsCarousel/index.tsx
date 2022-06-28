import { Box, useTheme } from "@mui/material";
import { useFetchTrends } from "api/menu/hooks";
import Carousel from "components/Carousel";
import TrendPreviewCard from "components/UI/TrendPreviewCard";
import { useMediaQueries } from "hooks/useMediaQueries";
import { Settings } from "react-slick";

const ProductsCarousel = () => {
  const theme = useTheme();
  const { sm: breakSm, md: breakMd } = theme.breakpoints.values;
  const { smDown, mdDown } = useMediaQueries();
  const { trendsMenu } = useFetchTrends();
  let minSlides = 4;

  if (smDown && mdDown) {
    minSlides = 1;
  } else if (mdDown) {
    minSlides = 2;
  }

  const sliderSettings: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: breakSm,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: breakMd,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Carousel
      minSlides={minSlides}
      count={trendsMenu.length}
      settings={sliderSettings}
    >
      {trendsMenu.map(({ id, title, imageUrl, itemType }) => (
        <Box key={id} sx={{ textAlign: "center", padding: "0 3.2rem" }}>
          <TrendPreviewCard
            id={id}
            itemType={itemType}
            title={title}
            imageUrl={imageUrl}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
