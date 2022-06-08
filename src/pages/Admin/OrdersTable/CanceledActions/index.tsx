import { Button, CircularProgress } from "@mui/material";

interface Props {
  onShowDetail: () => void;
  onRemoveOrder: () => void;
  isChanging: boolean;
}

const CanceledActions = ({
  onShowDetail,
  onRemoveOrder,
  isChanging,
}: Props) => {
  return (
    <>
      <Button variant="contained" onClick={onShowDetail}>
        Chi tiết
      </Button>
      <Button variant="outlined" onClick={onRemoveOrder}>
        {isChanging ? <CircularProgress size={16} /> : "Sửa lý do"}
      </Button>
    </>
  );
};

export default CanceledActions;
