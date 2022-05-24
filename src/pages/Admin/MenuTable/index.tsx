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
import { MenuType, ProductDetailType, TableSortsType } from "shared/types";
import { useState } from "react";
import MenuForm from "./MenuForm";
import { useQuery } from "react-query";
import { FirestoreService } from "../../../firebase/firestoreService";

const sorts: TableSortsType[] = [
  { title: "Bánh mỳ", value: "banhMy" },
  { title: "Đồ uống", value: "barverage" },
];

const MenuTable = () => {
  const [activeItem, setActiveItem] = useState<ProductDetailType | undefined>();
  const [tableType, setTableType] = useState(sorts[0].value);
  const [showForm, setShowForm] = useState(false);

  const { data: fetchedProducts } = useQuery(
    ["menu", tableType],
    async () => {
      const response = await FirestoreService.readDocuments(
        `menu/products/${tableType}`
      );

      const fetchedItems = response.docs.map((recipeDoc) => recipeDoc.data());

      return fetchedItems as MenuType[];
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 15 * 60000,
      cacheTime: 20 * 60000,
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
          {!fetchedProducts && (
            <TableBodyRow>
              <TableCell>
                Chưa có sản phẩm nào. Hãy thêm sản phẩm mới.
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
