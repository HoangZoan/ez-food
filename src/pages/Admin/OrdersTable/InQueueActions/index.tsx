import { Button } from "@mui/material";
import React from "react";

const InQueueActions = () => {
  return (
    <>
      <Button variant="contained">Chi tiết</Button>
      <Button variant="contained" color="success">
        Xong
      </Button>
      <Button variant="outlined" color="error">
        Xóa
      </Button>
    </>
  );
};

export default InQueueActions;
