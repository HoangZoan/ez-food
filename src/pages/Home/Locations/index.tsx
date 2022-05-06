import React from "react";
import { Container } from "@mui/material";
import BoxedHeading from "components/BoxedHeading";

const Locations = () => {
  return (
    <Container sx={{ py: 10, textAlign: "center" }}>
      <BoxedHeading
        primary
        sx={{ display: "inline-block" }}
        content="Cửa hàng"
      />
    </Container>
  );
};

export default Locations;
