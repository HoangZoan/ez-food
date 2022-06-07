import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import {
  OptionsType,
  OrderStatusType,
  OrderType,
  ProductOrderType,
} from "shared/types";
import { convertDateTime, formatPriceText } from "shared/utils";
import { useConfirmationDialog } from "states/confirmationDialog/hooks";

interface OrderInfoDialogProps {
  open: boolean;
  tableType: OrderStatusType;
  onClose: () => void;
  onFinish: () => void;
  order: Partial<OrderType>;
  submitStatus: {
    isFinishing: boolean;
    isFinished: boolean;
  };
}

interface InfoTextProps {
  title: string;
  content: string;
}

interface OrdersListProps {
  orders: ProductOrderType[];
}

interface OptionsListProps {
  options: OptionsType[];
}

const InfoText = ({ title, content }: InfoTextProps) => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="body1" fontWeight={700}>
          {title}:
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1">{content}</Typography>
      </Grid>
    </Grid>
  );
};

const OptionsList = ({ options }: OptionsListProps) => {
  return (
    <List>
      {options.map(({ name, variants }) => {
        const variant = variants.find(({ selected }) => selected);

        return (
          <ListItem key={name} sx={{ px: 0, py: 1 }}>
            - {name}: {variant?.type}
          </ListItem>
        );
      })}
    </List>
  );
};

const OrdersList = ({ orders }: OrdersListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">STT</TableCell>
          <TableCell>Tên món</TableCell>
          <TableCell>Lựa chọn</TableCell>
          <TableCell align="center">Số lượng</TableCell>
          <TableCell align="right">Giá</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map(({ orderId, title, options, quantity, price }, index) => (
          <TableRow key={orderId}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>
              <OptionsList options={options} />
            </TableCell>
            <TableCell align="center">{quantity}</TableCell>
            <TableCell align="right">{formatPriceText(price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const OrderInfoDialog = ({
  open,
  tableType,
  onClose,
  onFinish,
  order,
  submitStatus,
}: OrderInfoDialogProps) => {
  const {
    fullName,
    address,
    orderAt,
    deliverAt,
    orders,
    phoneNumber,
    totalPrice,
  } = order;
  const { isFinishing, isFinished } = submitStatus;
  const { openDialog } = useConfirmationDialog();

  const openConfirmDialog = () => {
    openDialog({
      content: "Xác nhận hoàn thành đơn hàng",
      onConfirm: onFinish,
    });
  };

  useEffect(() => {
    if (isFinished) {
      onClose();
    }
  }, [isFinished, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ fontWeight: 700, textAlign: "center", fontSize: "2.1rem" }}
      >
        Chi tiết đơn hàng
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Stack spacing={3} sx={{ px: 6 }}>
          <InfoText title="Họ tên" content={fullName!} />
          <InfoText title="Số điện thoại" content={phoneNumber!} />
          <InfoText title="Địa chỉ" content={address!} />
          <InfoText
            title="Thời gian đặt hàng"
            content={convertDateTime(orderAt!)}
          />
          {deliverAt && deliverAt !== "" && (
            <InfoText
              title="Thời gian giao hàng"
              content={convertDateTime(deliverAt!)}
            />
          )}
          <InfoText
            title="Tổng hóa đơn"
            content={formatPriceText(totalPrice!)}
          />
          <Typography variant="body1" fontWeight={700}>
            Nội dung đơn hàng:
          </Typography>

          {orders && orders.length > 0 && <OrdersList orders={orders} />}
        </Stack>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ justifyContent: "center", py: 3 }}>
        {tableType === "in-queue" && (
          <Button
            variant="contained"
            disabled={isFinishing}
            sx={{ mr: 4 }}
            onClick={openConfirmDialog}
          >
            {isFinishing ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Hoàn thành"
            )}
          </Button>
        )}
        <Button variant="outlined" onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderInfoDialog;
