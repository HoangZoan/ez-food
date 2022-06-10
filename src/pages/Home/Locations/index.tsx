import { Container, Grid, Typography, Box } from "@mui/material";
import BoxedHeading from "components/UI/BoxedHeading";
import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import PinDropIcon from "@mui/icons-material/PinDrop";

const Locations = () => {
  const [showPopup, setShowPopup] = useState(false);

  console.log(showPopup);

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
              aspectRatio: "4 / 3",
            }}
          >
            <Map
              initialViewState={{
                latitude: 21.0256497,
                longitude: 105.8301562,
                zoom: 12,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              dragRotate={false}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            >
              <Marker
                longitude={105.85545413730459}
                latitude={21.023413999997484}
                anchor="top"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setShowPopup(true);
                }}
              >
                <PinDropIcon color="error" fontSize="large" />
              </Marker>

              {showPopup && (
                <Popup
                  longitude={105.85545413730459}
                  latitude={21.023413999997484}
                  anchor="bottom"
                  onClose={() => setShowPopup(false)}
                  closeButton={false}
                >
                  <Box sx={{ backgroundColor: "red" }}>abc</Box>
                </Popup>
              )}
            </Map>
          </Box>
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
