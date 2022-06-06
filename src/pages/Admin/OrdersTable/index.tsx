import React, { useState } from "react";
import { Stack, Table, TableBody, TableHead, TableRow } from "@mui/material";
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
import { useRemoveOrder, useFetchOrders } from "api/order/hooks";
import { convertDateTime } from "shared/utils";
import OrderInfoDialog from "./OrderInfoDialog";
import OrderDeleteDialog from "./OrderDeleteDialog";

const sorts: TableSortsType[] = [
  { title: "Đơn đang đặt", value: IN_QUEUE_STATUS },
  { title: "Đơn đã giao", value: DELIVERED_STATUS },
  { title: "Đơn đã hủy", value: CANCELED_STATUS },
];

const OrdersTable = () => {
  const [orderDetail, setOrderDetail] = useState<Partial<OrderType>>({});
  const [showDialog, setShowDialog] = useState(false);
  const [canceledOrder, setCanceledOrder] = useState<OrderType | null>(null);
  const [currentTable, setCurrentTable] =
    useState<OrderStatusType>(IN_QUEUE_STATUS);
  const { fetchedOrders, isLoading } = useFetchOrders(currentTable);
  const { removingOrderId, removeOrder } = useRemoveOrder(currentTable);

  const handleSortChange = (value: string) => {
    setCurrentTable(value as OrderStatusType);
  };

  const showOrderDetail = (order: Omit<OrderType, "id">) => {
    setOrderDetail(order);
    setShowDialog(true);
  };

  const closeOrderDetail = () => {
    setShowDialog(false);
  };

  const closeDeleteDialog = () => {
    setCanceledOrder(null);
  };

  const handleRemoveOrder = (id: string, data: CanceledOrderType) => {
    setCanceledOrder(null);
    removeOrder({ id, data });
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHead>Id</TableCellHead>
            <TableCellHead>Thời gian</TableCellHead>
            <TableCellHead align="right">
              <SortButton onChange={handleSortChange} sorts={sorts} />
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
                  {currentTable === IN_QUEUE_STATUS && (
                    <InQueueActions
                      isDeleting={order.id === removingOrderId}
                      onShowDetail={() => showOrderDetail(order)}
                      onRemoveOrder={() => setCanceledOrder(order)}
                    />
                  )}
                  {currentTable === DELIVERED_STATUS && <DeliveredActions />}
                  {currentTable === CANCELED_STATUS && <CanceledActions />}
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
        open={showDialog}
        order={orderDetail}
        onClose={closeOrderDetail}
      />

      <OrderDeleteDialog
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
