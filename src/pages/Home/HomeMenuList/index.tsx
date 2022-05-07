import React from "react";
import { formatPriceText } from "shared/utils";
import MenuListLayout from "layouts/MenuListLayout";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button as MuiButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";

interface ProductType {
  id: string;
  title: string;
  description: string;
  price: number;
}

const dummyData: ProductType[] = [
  {
    id: "p-1",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-2",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-3",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
];

const HomeMenuList = () => {
  return (
    <MenuListLayout>
      <Container sx={{ py: 9, textAlign: "center" }}>
        <Grid container columnSpacing={7} sx={{ mb: 8 }}>
          {dummyData.map((data) => (
            <Grid item xs={4} key={data.id}>
              <Card
                elevation={0}
                sx={{
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  textAlign: "left",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    width: 1,
                    aspectRatio: "1 / 1",
                  }}
                ></Box>
                <div>
                  <CardContent sx={{ px: 5 }}>
                    <Typography
                      mb={3}
                      textAlign="center"
                      variant="h5"
                      fontWeight={700}
                    >
                      {data.title}
                    </Typography>
                    <Typography variant="body1">{data.description}</Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      px: 5,
                      pb: 4,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6">
                      Giá: {formatPriceText(data.price)}
                    </Typography>
                    <Button>Đặt món</Button>
                  </CardActions>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Link to="/products">
          <MuiButton variant="outlined">Xem thực đơn</MuiButton>
        </Link>
      </Container>
    </MenuListLayout>
  );
};

export default HomeMenuList;
