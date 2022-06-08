import React, { useState } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SortButton from "../../../components/TableSortButton";
import InQueueActions from "./InQueueActions";
import DeliveredActions from "./DeliveredActions";
import CanceledActions from "./CanceledActions";
import {
  CANCELED_STATUS,
  DELIVERED_STATUS,
  IN_QUEUE_STATUS,
} from "shared/config";
import {
  CanceledOrderType,
  OrderStatusType,
  OrderType,
  TableSortsType,
} from "shared/types";
import {
  TableBodyRow,
  TableCell,
  TableCellHead,
} from "components/UI/ManagingTable";
import {
  useRemoveOrder,
  useFetchOrders,
  useFinishOrder,
} from "api/order/hooks";
import { convertDateTime } from "shared/utils";
import OrderInfoDialog from "./OrderInfoDialog";
import OrderDeleteDialog from "./OrderDeleteDialog";
import { useLocation, useNavigate } from "react-router-dom";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import OrderInfo from "./OrderInfoDialog/OrderInfo";
import CanceledInfo from "./OrderInfoDialog/CanceledInfo";

const sorts: TableSortsType[] = [
  { title: "Đơn đang đặt", value: IN_QUEUE_STATUS },
  { title: "Đơn đã giao", value: DELIVERED_STATUS },
  { title: "Đơn đã hủy", value: CANCELED_STATUS },
];

const OrdersTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderQuery = new URLSearchParams(location.search).get(
    "order"
  ) as OrderStatusType;
  const [orderDetail, setOrderDetail] = useState<Partial<OrderType>>({});
  const [showOrderDetailDialog, setShowOrderDetail] = useState(false);
  const [showCanceledDetailDialog, setShowCanceledDetail] = useState(false);
  const [canceledOrder, setCanceledOrder] = useState<OrderType | null>(null);
  const { fetchedOrders, isLoading } = useFetchOrders(orderQuery!);
  const { finishOrder, isFinishing, isFinished, resetFinishOrder } =
    useFinishOrder(orderQuery!);
  const { removingOrderId, removeOrder } = useRemoveOrder(orderQuery!);

  const handleSortChange = (value: string) => {
    navigate(`${location.pathname}?order=${value}`);
  };

  const showOrderDetail = (order: Omit<OrderType, "id">) => {
    setOrderDetail(order);
    setShowOrderDetail(true);
  };

  const closeOrderDetail = () => {
    setShowOrderDetail(false);

    if (orderQuery === "in-queue") {
      resetFinishOrder();
    }
  };

  const showCanceledDetail = (order: Omit<OrderType, "id">) => {
    setOrderDetail(order);
    setShowCanceledDetail(true);
  };

  const closeCanceledDetail = () => {
    setShowCanceledDetail(false);
  };

  const closeDeleteDialog = () => {
    setCanceledOrder(null);
  };

  const handleRemoveOrder = (id: string, data: CanceledOrderType) => {
    setCanceledOrder(null);
    removeOrder({ id, data });
  };

  const handleFinishOrder = () => {
    finishOrder({
      id: orderDetail.id!,
      data: { ...orderDetail, deliverAt: new Date().toISOString() },
    });
  };

  if (
    orderQuery !== "canceled" &&
    orderQuery !== "delivered" &&
    orderQuery !== "in-queue"
  ) {
    return (
      <Stack
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ fontSize: "4.8rem" }}
      >
        <ReportGmailerrorredOutlinedIcon color="error" fontSize="inherit" />
        <Typography variant="h5">Trang không tồn tại</Typography>
      </Stack>
    );
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHead>Id</TableCellHead>
            <TableCellHead>Thời gian</TableCellHead>
            <TableCellHead align="right">
              <SortButton
                width="18rem"
                defaultQuery={orderQuery}
                onChange={handleSortChange}
                sorts={sorts}
              />
            </TableCellHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedOrders?.map((order) => (
            <TableBodyRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{convertDateTime(order.orderAt)}</TableCell>
              <TableCell>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  {orderQuery === IN_QUEUE_STATUS && (
                    <InQueueActions
                      isDeleting={order.id === removingOrderId}
                      onShowDetail={() => showOrderDetail(order)}
                      onRemoveOrder={() => setCanceledOrder(order)}
                    />
                  )}
                  {orderQuery === DELIVERED_STATUS && (
                    <DeliveredActions
                      isDeleting={order.id === removingOrderId}
                      onShowDetail={() => showOrderDetail(order)}
                      onRemoveOrder={() => setCanceledOrder(order)}
                    />
                  )}
                  {orderQuery === CANCELED_STATUS && (
                    <CanceledActions
                      isChanging={order.id === removingOrderId}
                      onShowDetail={() => showCanceledDetail(order)}
                      onRemoveOrder={() => setCanceledOrder(order)}
                    />
                  )}
                </Stack>
              </TableCell>
            </TableBodyRow>
          ))}

          {(!fetchedOrders || fetchedOrders.length === 0) && (
            <TableBodyRow>
              <TableCell>
                {isLoading ? "Đang tải..." : "Chưa có đơn hàng."}
              </TableCell>
            </TableBodyRow>
          )}
        </TableBody>
      </Table>

      <OrderInfoDialog
        open={showOrderDetailDialog}
        tableType={orderQuery!}
        submitStatus={{ isFinishing, isFinished }}
        onFinish={handleFinishOrder}
        onClose={closeOrderDetail}
      >
        <OrderInfo order={orderDetail} />
      </OrderInfoDialog>

      <OrderInfoDialog
        open={showCanceledDetailDialog}
        tableType={orderQuery!}
        onClose={closeCanceledDetail}
      >
        <CanceledInfo order={orderDetail} />
      </OrderInfoDialog>

      <OrderDeleteDialog
        cancelMessage={canceledOrder?.cancelMessage}
        open={!!canceledOrder}
        onClose={closeDeleteDialog}
        onRemoveOrder={(cancelMessage) =>
          handleRemoveOrder(canceledOrder!.id!, {
            ...canceledOrder!,
            cancelMessage,
          })
        }
      />
    </>
  );
};

export default OrdersTable;
