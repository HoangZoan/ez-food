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
  NEW_ORDER_NOTIFICATIONS,
} from "shared/config";
import { TableSortsType } from "shared/types";
import {
  TableBodyRow,
  TableCell,
  TableCellHead,
} from "components/UI/ManagingTable";
import { useFetchOrders } from "api/order/hooks";
import { convertDateTime, getPaginationData } from "shared/utils";
import OrderInfoDialog from "./OrderInfoDialog";
import OrderDeleteDialog from "./OrderDeleteDialog";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import OrderInfo from "./OrderInfoDialog/OrderInfo";
import CanceledInfo from "./OrderInfoDialog/CanceledInfo";
import { useOrderTable } from "./hooks";
import { useCallback, useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { usePubNub } from "pubnub-react";
import { MessageEvent } from "pubnub";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";
import UpdateOrdersButton from "./UpdateOrdersButton";
import PagePagination from "components/PagePagination";

const sorts: TableSortsType[] = [
  { title: "Đơn đang đặt", value: IN_QUEUE_STATUS },
  { title: "Đơn đã giao", value: DELIVERED_STATUS },
  { title: "Đơn đã hủy", value: CANCELED_STATUS },
];

const OrdersTable = () => {
  const pubnub = usePubNub();
  const { showToast } = useSnackbar();
  const {
    orderQuery,
    orderDetail,
    showOrderDetailDialog,
    showCanceledDetailDialog,
    canceledOrder,
    isFinishingOrder,
    orderIsFinished,
    removingOrderId,
    handleSortChange,
    showOrderDetail,
    closeOrderDetail,
    showCanceledDetail,
    closeCanceledDetail,
    closeDeleteDialog,
    handleRemoveOrder,
    handleFinishOrder,
    handleCancelOrder,
  } = useOrderTable();
  const { fetchedOrders, isLoading, isRefetching, fetchError, refetchOrders } =
    useFetchOrders(orderQuery!);
  const [refreshDisabled, setRefreshDisabled] = useState(true);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [page, setPage] = useState(1);
  const { pageCount, pageItems: ordersData } = getPaginationData({
    page,
    perPage: 8,
    items: fetchedOrders,
  });

  const handleRefreshOrders = () => {
    refetchOrders().then(() => {
      setRefreshDisabled(true);
      setPendingOrdersCount(0);

      showToast({
        title: "Đã cập nhật đơn hàng mới",
        type: "success",
        SnackbarProps: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      });
    });
  };

  const getNotified = useCallback(
    (event: MessageEvent) => {
      const message = event.message;

      if (message !== "new-order") return;

      setRefreshDisabled(false);
      setPendingOrdersCount(pendingOrdersCount + 1);

      showToast({
        title: `Bạn có ${pendingOrdersCount + 1} đơn hàng mới`,
        type: "success",
        SnackbarProps: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      });
    },
    [showToast, pendingOrdersCount]
  );

  useEffect(() => {
    pubnub.addListener({ message: getNotified });
    pubnub.subscribe({ channels: [NEW_ORDER_NOTIFICATIONS] });
  }, [pubnub, getNotified]);

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
      {/* ORDERS TABLE */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHead>Id</TableCellHead>
            <TableCellHead>Thời gian</TableCellHead>
            <TableCellHead align="right">
              <Stack spacing={3} direction="row" justifyContent="flex-end">
                <UpdateOrdersButton
                  show={orderQuery === "in-queue"}
                  disabled={refreshDisabled}
                  ordersCount={pendingOrdersCount}
                  onClick={handleRefreshOrders}
                />
                <SortButton
                  width="18rem"
                  defaultQuery={orderQuery}
                  onChange={handleSortChange}
                  sorts={sorts}
                />
              </Stack>
            </TableCellHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersData?.map((order) => (
            <TableBodyRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                {convertDateTime(
                  orderQuery === DELIVERED_STATUS
                    ? order.deliverAt!
                    : order.orderAt
                )}
              </TableCell>
              <TableCell>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  {orderQuery === IN_QUEUE_STATUS && (
                    <InQueueActions
                      isDeleting={order.id === removingOrderId}
                      onShowDetail={() => showOrderDetail(order)}
                      onRemoveOrder={() => handleCancelOrder(order)}
                    />
                  )}
                  {orderQuery === DELIVERED_STATUS && (
                    <DeliveredActions
                      isDeleting={order.id === removingOrderId}
                      onShowDetail={() => showOrderDetail(order)}
                      onRemoveOrder={() => handleCancelOrder(order)}
                    />
                  )}
                  {orderQuery === CANCELED_STATUS && (
                    <CanceledActions
                      isChanging={order.id === removingOrderId}
                      onShowDetail={() => showCanceledDetail(order)}
                      onRemoveOrder={() => handleCancelOrder(order)}
                    />
                  )}
                </Stack>
              </TableCell>
            </TableBodyRow>
          ))}

          {(!ordersData || ordersData.length === 0) && (
            <TableBodyRow>
              <TableCell colSpan={3}>
                {isLoading || isRefetching ? (
                  "Đang tải..."
                ) : fetchError ? (
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <ErrorOutlineIcon color="error" fontSize="large" />
                    <Typography variant="body1">
                      Tải về đơn hàng gặp lỗi. Vui lòng thử lại.
                    </Typography>
                  </Stack>
                ) : (
                  "Chưa có đơn hàng."
                )}
              </TableCell>
            </TableBodyRow>
          )}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <PagePagination
        count={pageCount}
        onChange={(_, page) => setPage(page)}
        sx={{
          mt: 5,
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
      />

      {/* POPUP DIALOGS */}
      <OrderInfoDialog
        open={showOrderDetailDialog}
        tableType={orderQuery!}
        submitStatus={{
          isFinishing: isFinishingOrder,
          isFinished: orderIsFinished,
        }}
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
