import { Box, Collapse, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { OrderType } from "shared/types";
import InfoText from "../InfoText";
import OrderInfo from "../OrderInfo";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { styled } from "shared/theme";

interface Props {
  order: OrderType;
}

const StackWrapper = styled(Stack)(({ theme }) => ({
  alignSelf: "flex-start",
  cursor: "pointer",
  "& p": { transition: "all 0.2s" },
  "&:hover p": {
    color: theme.palette.primary.main,
  },
}));

const CanceledInfo = ({ order }: Props) => {
  const [expandDetail, setExpandDetail] = useState(false);
  const Icon = !expandDetail ? AddCircleOutlineIcon : RemoveCircleOutlineIcon;

  const handleToggleDetail = () => {
    setExpandDetail(!expandDetail);
  };

  return (
    <>
      <InfoText title="Lý do hủy đơn" content={order.cancelMessage} />

      <StackWrapper
        direction="row"
        alignItems="center"
        spacing={2}
        onClick={handleToggleDetail}
      >
        <Icon color="primary" />
        <Typography variant="body1" fontWeight={700}>
          Chi tiết đơn hàng
        </Typography>
      </StackWrapper>

      <Collapse in={expandDetail}>
        <Box sx={{ ml: "2.8rem" }}>
          <OrderInfo order={order} />
        </Box>
      </Collapse>
    </>
  );
};

export default CanceledInfo;
