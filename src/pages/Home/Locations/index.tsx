import { Container, Grid, Typography, Box } from "@mui/material";
import BoxedHeading from "components/UI/BoxedHeading";
import LocationsMap from "./LocationsMap";

const locations = [
  {
    id: "location-1",
    address: "Số 11, phố Nguyễn Khắc Cần, quận Hoàn Kiếm, Hà Nội",
    longitude: 105.85545413730459,
    latitude: 21.023413999997484,
  },
  {
    id: "location-2",
    address: "Số 93, phố Giang Văn Minh, quận Ba Đình, Hà Nội",
    longitude: 105.82700111487453,
    latitude: 21.034365471474498,
  },
  {
    id: "location-3",
    address: "Số 131, đường Nguyễn Ngọc Vũ, quận Cầu Giấy, Hà Nội",
    longitude: 105.8098981310746,
    latitude: 21.010687676798813,
  },
];

const Locations = () => {
  return (
    <Container sx={{ py: 10, textAlign: "center" }}>
      <BoxedHeading content="Cửa hàng" primary />

      <Grid
        container
        sx={{ textAlign: "left", columnGap: 8 }}
        alignItems="center"
      >
        <Grid xs item>
          <Box
            sx={{
              aspectRatio: "4 / 3",
            }}
          >
            <LocationsMap />
          </Box>
        </Grid>
        <Grid xs item>
          <Typography fontWeight={700} variant="h6">
            Các chi nhánh:
          </Typography>

          {locations.map(({ id, address }) => (
            <Typography key={id} variant="body1">
              {address}
            </Typography>
          ))}

          <Typography fontWeight={700} variant="h6" sx={{ mt: 4 }}>
            Thời gian phục vụ:
          </Typography>
          <Typography variant="body1">
            Từ 10h - 23h (Các ngày trong tuần)
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Locations;
