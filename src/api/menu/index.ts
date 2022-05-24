import { FirestoreService } from "../../firebase/firestoreService";
import { MenuType } from "../../shared/types";

export const fetchAllMenuItems = async (tableType: string) => {
  const response = await FirestoreService.readDocuments(
    `menu/products/${tableType}`
  );

  const fetchedItems = response.docs.map((recipeDoc) => {
    const id = recipeDoc.id;
    const data = recipeDoc.data();

    return { id, ...data };
  });

  return fetchedItems as MenuType[];
};

export const deleteMenuItem = (itemType: string, id: string) => {
  return FirestoreService.deleteDocument(`menu/products/${itemType}`, id);
};
