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
import { useMutation, useQuery } from "react-query";
import { deleteMenuItem, fetchAllMenuItems } from "api/menu";

const sorts: TableSortsType[] = [
  { title: "Bánh mỳ", value: "banhMy" },
  { title: "Đồ uống", value: "barverage" },
];

const MenuTable = () => {
  const [activeItem, setActiveItem] = useState<ProductDetailType | undefined>();
  const [tableType, setTableType] = useState(sorts[0].value);
  const [showForm, setShowForm] = useState(false);

  const { data: fetchedProducts, isLoading: isGettingData } = useQuery(
    ["menu", tableType],
    () => fetchAllMenuItems(tableType),
    {
      staleTime: 15 * 60000,
      cacheTime: 20 * 60000,
    }
  );
  const { mutate: removeMenuItem, isLoading: deletingItem } = useMutation(
    (id: string) => deleteMenuItem(tableType, id),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(["menu", itemType]);
        // showToast({
        //   title: "Thêm sản phẩm mới thành công!",
        //   type: "success",
        //   SnackbarProps: {
        //     anchorOrigin: { vertical: "bottom", horizontal: "right" },
        //   },
        // });
      },
    }
  );

  const handleSortChange = (value: string) => {
    setTableType(value);
  };

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
          {fetchedProducts?.map(({ id, title, isPublished }) => (
            <TableBodyRow key={id}>
              <TableCell sx={{ fontWeight: 700 }}>{title}</TableCell>
              <TableCell>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  <Button variant="contained">Cập nhật</Button>
                  {isPublished && (
                    <Button variant="contained" color="success">
                      Hiện
                    </Button>
                  )}
                  {!isPublished && (
                    <Button variant="contained-disabled">Ẩn</Button>
                  )}
                  <Button variant="outlined" color="error">
                    Xóa
                  </Button>
                </Stack>
              </TableCell>
            </TableBodyRow>
          ))}
          {(!fetchedProducts || fetchedProducts.length === 0) && (
            <TableBodyRow>
              <TableCell>
                {isGettingData
                  ? "Đang tải..."
                  : "Chưa có sản phẩm nào. Hãy thêm sản phẩm mới."}
              </TableCell>
            </TableBodyRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={showForm} onClose={handleCloseForm} scroll="body">
        <MenuForm
          onClose={handleCloseForm}
          item={activeItem}
          itemType={tableType}
        />
      </Dialog>
    </>
  );
};

export default MenuTable;
