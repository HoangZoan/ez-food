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
import { TableSortsType } from "shared/types";
import {
  TableBodyRow,
  TableCell,
  TableCellHead,
} from "components/UI/ManagingTable";

const sorts: TableSortsType[] = [
  { title: "Đơn đang đặt", value: IN_QUEUE_STATUS },
  { title: "Đơn đã giao", value: DELIVERED_STATUS },
  { title: "Đơn đã hủy", value: CANCELED_STATUS },
];

const OrdersTable = () => {
  const [currentTable, setCurrentTable] = useState(IN_QUEUE_STATUS);

  const handleSortChange = (value: string) => {
    setCurrentTable(value);
  };

  return (
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
        <TableBodyRow>
          <TableCell>ORDER-12345</TableCell>
          <TableCell>21:05</TableCell>
          <TableCell>
            <Stack direction="row" justifyContent="flex-end" spacing={3}>
              {currentTable === IN_QUEUE_STATUS && <InQueueActions />}
              {currentTable === DELIVERED_STATUS && <DeliveredActions />}
              {currentTable === CANCELED_STATUS && <CanceledActions />}
            </Stack>
          </TableCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
