import SortButton from "components/TableSortButton";
import {
  Button,
  Modal,
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
import { useState } from "react";
import ModalBox from "components/UI/ModalBox";
import MenuForm from "./MenuForm";

const sorts: TableSortsType[] = [
  { title: "Bánh mỳ", value: "banh-my" },
  { title: "Đồ uống", value: "barverage" },
];

const MenuTable = () => {
  const [showForm, setShowForm] = useState(true);

  const handleSortChange = (value: string) => {};

  const handleOpenForm = () => {
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

      <Modal open={showForm} onClose={handleCloseForm} disableAutoFocus>
        <ModalBox
          sx={{ backgroundColor: "white", px: 6, py: 5, minWidth: "50rem" }}
        >
          <MenuForm />
        </ModalBox>
      </Modal>
    </>
  );
};

export default MenuTable;
