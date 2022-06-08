import {
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { OptionsType, OrderType, ProductOrderType } from "shared/types";
import { convertDateTime, formatPriceText } from "shared/utils";
import InfoText from "../InfoText";

interface OrderInfoProps {
  order: Partial<OrderType>;
}

interface OptionsListProps {
  options: OptionsType[];
}

interface OrdersListProps {
  orders: ProductOrderType[];
}

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

const OrderInfo = ({ order }: OrderInfoProps) => {
  const {
    fullName,
    address,
    orderAt,
    deliverAt,
    orders,
    phoneNumber,
    totalPrice,
  } = order;

  return (
    <>
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
      <InfoText title="Tổng hóa đơn" content={formatPriceText(totalPrice!)} />
      <Typography variant="body1" fontWeight={700}>
        Nội dung đơn hàng:
      </Typography>

      {orders && orders.length > 0 && <OrdersList orders={orders} />}
    </>
  );
};

export default OrderInfo;
