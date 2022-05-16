import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import BoxedHeading from "components/UI/BoxedHeading";

const Locations = () => {
  return (
    <Container sx={{ py: 10, textAlign: "center" }}>
      <BoxedHeading
        primary
        sx={{ display: "inline-block", mb: 8 }}
        content="Cửa hàng"
      />

      <Grid
        container
        sx={{ textAlign: "left", columnGap: 8 }}
        alignItems="center"
      >
        <Grid xs item>
          <Box
            sx={{
              backgroundColor: "primary.main",
              aspectRatio: "4 / 3",
            }}
          ></Box>
        </Grid>
        <Grid xs item>
          <Typography fontWeight={700} variant="h6">
            Các chi nhánh:
          </Typography>
          <Typography variant="body1">Số xx, đường ABC, Quận XYZ</Typography>
          <Typography variant="body1">Số xx, đường ABC, Quận XYZ</Typography>
          <Typography variant="body1">Số xx, đường ABC, Quận XYZ</Typography>

          <Typography fontWeight={700} variant="h6" sx={{ mt: 4 }}>
            Thời gian phục vụ:
          </Typography>
          <Typography variant="body1">
            Từ 16h - 23h (Các ngày trong tuần)
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Locations;
