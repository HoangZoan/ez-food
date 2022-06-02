import { FirestoreService } from "../../firebase/firestoreService";
import { OrderStatusType, OrderType } from "../../shared/types";

const fetchOrders = async (orderStatus: OrderStatusType) => {
  const response = await FirestoreService.readDocuments({
    collection: "app/orders/documents",
    queries: [{ field: "status", condition: "==", value: orderStatus }],
  });

  const fetchedItems = response.docs.map((recipeDoc) => {
    const id = recipeDoc.id;
    const data = recipeDoc.data() as Omit<OrderType, "id">;

    return { id, ...data };
  });

  return fetchedItems;
};

const createNewOrder = (data: OrderType) => {
  return FirestoreService.createDocument("app/orders/documents", data);
};

// const updateMenu = ({
//   tableType,
//   id,
//   data,
// }: {
//   tableType: string;
//   id: string;
//   data: MenuType;
// }) => {
//   return FirestoreService.updateDocument(`app/menu/${tableType}`, id, data);
// };

const deleteOrder = async (id: string) => {
  return FirestoreService.deleteDocument("app/orders/documents", id);
};

export const orderApi = {
  fetchOrders,
  createNewOrder,
  //   updateMenu,
  deleteOrder,
};
