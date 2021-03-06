import { FirestoreService } from "../../firebase/firestoreService";
import { StorageService } from "../../firebase/storageService";
import { FirebaseQuery, MenuType } from "../../shared/types";
import { IMAGE_KEY } from "../../shared/config";
import { v4 as uuidv4 } from "uuid";

const fetchMenuItem = async (itemType: string, id: string) => {
  const response = await FirestoreService.readDocument({
    collection: `app/menu/${itemType}`,
    id,
  });
  const data = response.data() as MenuType;

  return data?.isPublished ? data : undefined;
};

const fetchAllMenuItems = async <T>(
  tableType: string,
  queries: FirebaseQuery<T>[],
  limit?: number
) => {
  const response = await FirestoreService.readDocuments({
    collection: `app/menu/${tableType}`,
    queries,
    limit,
  });

  const fetchedItems = response.docs.map((recipeDoc) => {
    const id = recipeDoc.id;
    const data = recipeDoc.data();

    return { id, ...data };
  });

  return fetchedItems as MenuType[];
};

const createNewMenu = (tableType: string, data: MenuType) => {
  return FirestoreService.createDocument(`app/menu/${tableType}`, data);
};

const createMenuImageUrl = async (imageFile: any) => {
  const imageName = IMAGE_KEY + uuidv4();

  const imageDownloadUrl = (await StorageService.uploadFile(
    imageFile,
    `products/${imageName}`
  )) as string;

  return imageDownloadUrl;
};

const updateMenu = ({
  tableType,
  id,
  data,
}: {
  tableType: string;
  id: string;
  data: MenuType;
}) => {
  return FirestoreService.updateDocument(`app/menu/${tableType}`, id, data);
};

const deleteMenuImage = (imageUrl: string) => {
  return StorageService.deleteFile(imageUrl);
};

const deleteMenuItem = async ({
  id,
  imageUrl,
  tableType,
}: {
  id: string;
  imageUrl: string;
  tableType: string;
}) => {
  await StorageService.deleteFile(imageUrl);

  return FirestoreService.deleteDocument(`app/menu/${tableType}`, id);
};

export const menuApi = {
  fetchMenuItem,
  fetchAllMenuItems,
  createNewMenu,
  createMenuImageUrl,
  updateMenu,
  deleteMenuImage,
  deleteMenuItem,
};
