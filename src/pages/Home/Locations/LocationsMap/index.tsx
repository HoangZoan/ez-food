import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { Box, Typography } from "@mui/material";

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

const LocationsMap = () => {
  const [showPopup, setShowPopup] = useState("");

  return (
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
      {locations.map(({ id, address, longitude, latitude }) => (
        <div key={id}>
          <Marker
            longitude={longitude}
            latitude={latitude}
            anchor="top"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setShowPopup(id);
            }}
          >
            <PinDropIcon color="error" fontSize="large" />
          </Marker>

          {showPopup === id && (
            <Popup
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
              onClose={() => setShowPopup("")}
              closeButton={false}
            >
              <Box sx={{ px: 2 }}>
                <Typography variant="body2" fontWeight={500}>
                  {address}
                </Typography>
              </Box>
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
};

export default LocationsMap;
