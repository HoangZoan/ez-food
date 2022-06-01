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
import { OrderStatusType, OrderType, TableSortsType } from "shared/types";
import {
  TableBodyRow,
  TableCell,
  TableCellHead,
} from "components/UI/ManagingTable";
import { useFetchOrders } from "api/order/hooks";
import { convertDateTime } from "shared/utils";

const sorts: TableSortsType[] = [
  { title: "Đơn đang đặt", value: IN_QUEUE_STATUS },
  { title: "Đơn đã giao", value: DELIVERED_STATUS },
  { title: "Đơn đã hủy", value: CANCELED_STATUS },
];

const OrdersTable = () => {
  const [orderDetail, setOrderDetail] = useState<Omit<OrderType, "id"> | null>(
    null
  );
  const [currentTable, setCurrentTable] =
    useState<OrderStatusType>(IN_QUEUE_STATUS);
  const { fetchedOrders, isLoading } = useFetchOrders(currentTable);

  const handleSortChange = (value: string) => {
    setCurrentTable(value as OrderStatusType);
  };
  console.log(fetchedOrders);

  const showOrderDetail = (order: Omit<OrderType, "id">) => {
    setOrderDetail(order);
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
          {fetchedOrders?.map(({ id, ...order }) => (
            <TableBodyRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{convertDateTime(order.orderAt)}</TableCell>
              <TableCell>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  {currentTable === IN_QUEUE_STATUS && (
                    <InQueueActions
                      onShowDetail={() => showOrderDetail(order)}
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
                {isLoading
                  ? "Đang tải..."
                  : "Chưa có sản phẩm nào. Hãy thêm sản phẩm mới."}
              </TableCell>
            </TableBodyRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default OrdersTable;
