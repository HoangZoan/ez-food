import { FirestoreService } from "../../firebase/firestoreService";
import { StorageService } from "../../firebase/storageService";
import { NotificationListType } from "../../shared/types";
import { IMAGE_KEY } from "../../shared/config";
import { v4 as uuidv4 } from "uuid";

const fetchAllNotifications = async () => {
  const response = await FirestoreService.readDocuments(
    "app/notifications/documents"
  );

  const fetchedItems = response.docs.map((recipeDoc) => {
    const id = recipeDoc.id;
    const data = recipeDoc.data();

    return { id, ...data };
  });

  return fetchedItems as NotificationListType[];
};

const createNewNotification = (data: NotificationListType) => {
  return FirestoreService.createDocument("app/notifications/documents", data);
};

const createNotificationImageUrl = async (imageFile: any) => {
  const imageName = IMAGE_KEY + uuidv4();

  const imageDownloadUrl = (await StorageService.uploadFile(
    imageFile,
    `notifications/${imageName}`
  )) as string;

  return imageDownloadUrl;
};

const updateNotification = ({
  id,
  data,
}: {
  id: string;
  data: NotificationListType;
}) => {
  return FirestoreService.updateDocument(
    "app/notifications/documents",
    id,
    data
  );
};

const deleteNotificationImage = (imageUrl: string) => {
  return StorageService.deleteFile(imageUrl);
};

const deleteNotification = async ({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: string;
}) => {
  await StorageService.deleteFile(imageUrl);

  return FirestoreService.deleteDocument("app/notifications/documents", id);
};

export const notificationsApi = {
  fetchAllNotifications,
  createNewNotification,
  createNotificationImageUrl,
  updateNotification,
  deleteNotificationImage,
  deleteNotification,
};
