import ProductPreviewCard from "components/UI/ProductPreviewCard";
import { MenuType } from "shared/types";
import { Settings } from "react-slick";
import Carousel from "components/Carousel";
import { Box, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  items: MenuType[] | undefined;
}

const MenuPreview = ({ items }: Props) => {
  const theme = useTheme();
  const { lg: breakLg, md: breakMd } = theme.breakpoints.values;
  const matchMd = useMediaQuery(theme.breakpoints.down(breakMd));
  const matchLg = useMediaQuery(theme.breakpoints.down(breakLg));
  let slidesToShow = 3;

  if (matchMd && matchLg) {
    slidesToShow = 1;
  } else if (matchLg) {
    slidesToShow = 2;
  }

  const sliderSettings: Settings = {
    slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <Carousel
      settings={sliderSettings}
      count={items?.length}
      minSlides={slidesToShow}
    >
      {items?.map(({ id, title, imageUrl }) => (
        <Box key={id} sx={{ px: 3 }}>
          <ProductPreviewCard title={title} imgSrc={imageUrl} />
        </Box>
      ))}
    </Carousel>
  );
};

export default MenuPreview;
