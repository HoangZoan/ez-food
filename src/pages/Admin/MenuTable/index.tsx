import SortButton from "components/TableSortButton";
import {
  Button,
  CircularProgress,
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
import { MenuType, TableSortsType } from "shared/types";
import { useState } from "react";
import MenuForm from "./MenuForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteMenuItem, fetchAllMenuItems } from "api/menu";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";
import { StorageService } from "../../../firebase/storageService";
import { useConfirmationDialog } from "states/confirmationDialog/hooks";

const sorts: TableSortsType[] = [
  { title: "Bánh mỳ", value: "banhMy" },
  { title: "Đồ uống", value: "barverage" },
];

const MenuTable = () => {
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();
  const { openDialog } = useConfirmationDialog();
  const [activeItem, setActiveItem] = useState<MenuType | Partial<MenuType>>(
    {}
  );
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
    async ({ id, imageUrl }: { id: string; imageUrl: string }) => {
      await StorageService.deleteFile(imageUrl);

      return deleteMenuItem(tableType, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menu", tableType]);
        showToast({
          title: "Xóa sản phẩm thành công!",
          type: "success",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
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

    if (activeItem) {
      setActiveItem({});
    }
  };

  const handleUpdateItem = (id: string) => {
    const updatingItem =
      fetchedProducts!.find((product) => product.id === id) || {};
    setActiveItem(updatingItem);
    setShowForm(true);
  };

  const openConfirmationDialog = (
    id: string,
    imageUrl: string,
    title: string
  ) => {
    openDialog({
      content: (
        <>
          Bạn chắc chắn muốn xóa <strong>{title}</strong>?
        </>
      ),
      onConfirm: () => removeMenuItem({ id, imageUrl }),
    });
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
          {fetchedProducts?.map(({ id, title, isPublished, imageUrl }) => (
            <TableBodyRow key={id}>
              <TableCell sx={{ fontWeight: 700 }}>{title}</TableCell>
              <TableCell>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  <Button
                    variant="contained"
                    onClick={() => handleUpdateItem(id!)}
                  >
                    Cập nhật
                  </Button>
                  {isPublished && (
                    <Button variant="contained" color="success">
                      Hiện
                    </Button>
                  )}
                  {!isPublished && (
                    <Button variant="contained-disabled">Ẩn</Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    disabled={deletingItem}
                    onClick={() => openConfirmationDialog(id!, imageUrl, title)}
                  >
                    {!deletingItem && "Xóa"}
                    {deletingItem && <CircularProgress size={16} />}
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
          tableType={tableType}
        />
      </Dialog>
    </>
  );
};

export default MenuTable;
