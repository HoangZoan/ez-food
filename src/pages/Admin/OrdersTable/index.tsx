import React from "react";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "shared/theme";
import SortButton from "./SortButton";

const TableCell = styled(MuiTableCell)({
  fontSize: "1.6rem",
  borderColor: "transparent",
});

const TableCellHead = styled(MuiTableCell)(({ theme }) => ({
  fontSize: "1.6rem",
  borderColor: theme.palette.primary.main,
  paddingTop: "0.8rem",
  paddingBottom: "0.8rem",
}));

const TableBodyRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.colors.background.primary,
  },
}));

const OrdersTable = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCellHead>Id</TableCellHead>
          <TableCellHead>Thời gian</TableCellHead>
          <TableCellHead align="right">
            <SortButton />
          </TableCellHead>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableBodyRow>
          <TableCell>ORDER-12345</TableCell>
          <TableCell>21:05</TableCell>
          <TableCell>
            <Stack direction="row" justifyContent="flex-end" spacing={3}>
              <Button variant="contained">Chi tiết</Button>
              <Button variant="contained" color="success">
                Xong
              </Button>
              <Button variant="outlined" color="error">
                Xóa
              </Button>
            </Stack>
          </TableCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableCell>ORDER-12345</TableCell>
          <TableCell>21:05</TableCell>
          <TableCell>
            <Stack direction="row" justifyContent="flex-end" spacing={3}>
              <Button variant="contained">Chi tiết</Button>
              <Button variant="contained" color="success">
                Xong
              </Button>
              <Button variant="outlined" color="error">
                Hủy
              </Button>
            </Stack>
          </TableCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
