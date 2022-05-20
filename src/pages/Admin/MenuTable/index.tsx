import SortButton from "components/TableSortButton";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  TableBodyRow,
  TableCell,
  TableCellHead,
} from "components/UI/ManagingTable";
import { TableSortsType } from "shared/types";

const sorts: TableSortsType[] = [
  { title: "Bánh mỳ", value: "banh-my" },
  { title: "Đồ uống", value: "barverage" },
];

const MenuTable = () => {
  const handleSortChange = (value: string) => {};

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCellHead>
            <SortButton side="left" onChange={handleSortChange} sorts={sorts} />
          </TableCellHead>
          <TableCellHead align="right">
            <Button variant="outlined">+ Thêm</Button>
          </TableCellHead>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableBodyRow>
          <TableCell sx={{ fontWeight: 700 }}>Món bánh mỳ</TableCell>
          <TableCell>
            <Stack direction="row" justifyContent="flex-end" spacing={3}>
              <Button variant="contained">Cập nhật</Button>
              <Button variant="contained" color="success">
                Hiện
              </Button>
              {/* <Button
                variant="contained-disabled"
              >
                Ẩn
              </Button> */}
              <Button variant="outlined" color="error">
                Xóa
              </Button>
            </Stack>
          </TableCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  );
};

export default MenuTable;
