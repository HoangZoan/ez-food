import { Box } from "@mui/material";
import { styled } from "shared/theme";

interface Props {
  imgSrc: string;
}

const ImageContainer = styled(Box)({
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const AuthorPicture = ({ imgSrc }: Props) => {
  return (
    <ImageContainer
      sx={{
        height: 1,
      }}
    >
      <img src={imgSrc} alt="" />
    </ImageContainer>
  );
};

export default AuthorPicture;
