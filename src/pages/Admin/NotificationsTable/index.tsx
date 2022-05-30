import { useState } from "react";
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
import NotificationsForm from "./NotificationsForm";
import {
  useFetchedNotifications,
  useRemoveNotification,
} from "api/notifications/hooks";
import { NotificationListType } from "shared/types";
import { useConfirmationDialog } from "states/confirmationDialog/hooks";

const NotificationsTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeNotification, setActiveNotification] = useState<
    NotificationListType | Partial<NotificationListType>
  >({});
  const { fetchedNotifications, isGettingData } = useFetchedNotifications();
  const { deletingId, removeNotification } = useRemoveNotification();
  const { openDialog } = useConfirmationDialog();

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

  const openConfirmationDialog = (id: string, imageUrl: string) => {
    openDialog({
      content: "Bạn chắc chắn muốn xóa thông báo này?",
      onConfirm: () => removeNotification({ id, imageUrl }),
    });
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

          {fetchedNotifications?.map(({ id, title, imageUrl, isPublished }) => (
            <TableBodyRow key={id}>
              <TableCell sx={{ fontWeight: 700 }}>{title}</TableCell>
              <TableCell>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  <Button variant="contained" onClick={() => handleUpdate(id!)}>
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
                    disabled={id === deletingId}
                    onClick={() => openConfirmationDialog(id!, imageUrl)}
                  >
                    {id !== deletingId && "Xóa"}
                    {id === deletingId && <CircularProgress size={16} />}
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
