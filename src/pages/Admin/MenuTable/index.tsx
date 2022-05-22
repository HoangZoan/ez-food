import SortButton from "components/TableSortButton";
import {
  Button,
  Dialog,
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
import { ProductDetailType, TableSortsType } from "shared/types";
import { useState } from "react";
import MenuForm from "./MenuForm";

const sorts: TableSortsType[] = [
  { title: "Bánh mỳ", value: "banh-my" },
  { title: "Đồ uống", value: "barverage" },
];

const MenuTable = () => {
  const [activeItem, setActiveItem] = useState<ProductDetailType | undefined>();
  const [showForm, setShowForm] = useState(false);

  const handleSortChange = (value: string) => {};

  const handleOpenNewForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHead>
              <SortButton
                side="left"
                onChange={handleSortChange}
                sorts={sorts}
              />
            </TableCellHead>
            <TableCellHead align="right">
              <Button variant="outlined" onClick={handleOpenNewForm}>
                + Thêm
              </Button>
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

      <Dialog open={showForm} onClose={handleCloseForm} scroll="body">
        <MenuForm onClose={handleCloseForm} item={activeItem} />
      </Dialog>
    </>
  );
};

export default MenuTable;
