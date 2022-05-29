import { useState } from "react";
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
import NotificationsForm from "./NotificationsForm";
import { useFetchedNotifications } from "api/notifications/hooks";
import { NotificationListType } from "shared/types";

const NotificationsTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeNotification, setActiveNotification] = useState<
    NotificationListType | Partial<NotificationListType>
  >({});
  const { fetchedNotifications, isGettingData } = useFetchedNotifications();

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleUpdate = (id: string) => {
    const updatingItem =
      fetchedNotifications!.find((notification) => notification.id === id) ||
      {};
    setActiveNotification(updatingItem);
    setShowForm(true);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHead>Tiêu đề</TableCellHead>
            <TableCellHead align="right">
              <Button variant="outlined" onClick={handleOpenForm}>
                + Thêm
              </Button>
            </TableCellHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!fetchedNotifications || fetchedNotifications.length === 0) && (
            <TableBodyRow>
              <TableCell>
                {isGettingData
                  ? "Đang tải..."
                  : "Chưa có sản phẩm nào. Hãy thêm sản phẩm mới."}
              </TableCell>
            </TableBodyRow>
          )}

          {fetchedNotifications?.map(({ id, title }) => (
            <TableBodyRow key={id}>
              <TableCell sx={{ fontWeight: 700 }}>{title}</TableCell>
              <TableCell>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  <Button variant="contained" onClick={() => handleUpdate(id!)}>
                    Cập nhật
                  </Button>
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
          ))}
        </TableBody>
      </Table>

      <Dialog open={showForm} onClose={handleCloseForm} disableAutoFocus>
        <NotificationsForm
          item={activeNotification}
          onClose={handleCloseForm}
        />
      </Dialog>
    </>
  );
};

export default NotificationsTable;
