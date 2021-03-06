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
import { useConfirmationDialog } from "states/confirmationDialog/hooks";
import {
  useFetchedMenu,
  useRemoveMenuItem,
  useUpdateMenu,
} from "../../../api/menu/hooks";
import { TYPE_BEVERAGE, TYPE_FRIED, TYPE_STEAM } from "shared/config";
import { getPaginationData } from "shared/utils";
import PagePagination from "components/PagePagination";

const sorts: TableSortsType[] = [
  { title: "Món chiên rán", value: TYPE_FRIED },
  { title: "Món hấp", value: TYPE_STEAM },
  { title: "Đồ uống", value: TYPE_BEVERAGE },
];

const MenuTable = () => {
  const { openDialog } = useConfirmationDialog();
  const [activeItem, setActiveItem] = useState<MenuType | Partial<MenuType>>(
    {}
  );
  const [tableType, setTableType] = useState(sorts[0].value);
  const [showForm, setShowForm] = useState(false);
  const { fetchedMenu, isGettingData } = useFetchedMenu(tableType);
  const { deletingId, removeMenuItem } = useRemoveMenuItem(tableType);
  const { updatingId, updateMenu } = useUpdateMenu(tableType);
  const [page, setPage] = useState(1);
  const { pageCount, pageItems: menuData } = getPaginationData({
    page,
    perPage: 8,
    items: fetchedMenu,
  });

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
    const updatingItem = fetchedMenu!.find((product) => product.id === id)!;
    setActiveItem(updatingItem);
    setShowForm(true);
  };

  const toggleItemVisibility = (id: string) => {
    const updatingItem = fetchedMenu!.find((product) => product.id === id)!;
    const updatedItem = {
      ...updatingItem,
      isPublished: !updatingItem.isPublished,
    };
    updateMenu({ tableType, id, data: updatedItem });
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
      onConfirm: () => removeMenuItem({ id, imageUrl, tableType }),
    });
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHead>
              <SortButton
                width="20rem"
                defaultQuery={tableType}
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
          {menuData?.map(({ id, title, isPublished, imageUrl }) => (
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
                  <Button
                    variant={isPublished ? "contained" : "contained-disabled"}
                    color={isPublished ? "success" : "inherit"}
                    onClick={() => toggleItemVisibility(id!)}
                  >
                    {id !== updatingId && (isPublished ? "Hiện" : "Ẩn")}
                    {id === updatingId && (
                      <CircularProgress size={16} color="inherit" />
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    disabled={id === deletingId}
                    onClick={() => openConfirmationDialog(id!, imageUrl, title)}
                  >
                    {id !== deletingId && "Xóa"}
                    {id === deletingId && <CircularProgress size={16} />}
                  </Button>
                </Stack>
              </TableCell>
            </TableBodyRow>
          ))}
          {(!menuData || menuData.length === 0) && (
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
