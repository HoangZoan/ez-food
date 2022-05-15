import { List, ListItem } from "@mui/material";
import { useRecoilValue } from "recoil";
import { cartState } from "states/cart";
import CheckOutOrder from "../CheckOutOrder";

const CheckOutOrdersList = () => {
  const orders = useRecoilValue(cartState);

  return (
    <List>
      {orders.map((order) => (
        <ListItem key={order.orderId}>
          <CheckOutOrder item={order} />
        </ListItem>
      ))}
    </List>
  );
};

export default CheckOutOrdersList;
