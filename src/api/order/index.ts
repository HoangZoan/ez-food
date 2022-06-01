import { FirestoreService } from "../../firebase/firestoreService";
import { OrderStatusType, OrderType } from "../../shared/types";

const fetchAllOrders = async (orderStatus: OrderStatusType) => {
  const response = await FirestoreService.readDocuments({
    collection: `app/orders/${orderStatus}`,
  });

  const fetchedItems = response.docs.map((recipeDoc) => {
    const id = recipeDoc.id;
    const data = recipeDoc.data() as Omit<OrderType, "id">;

    return { id, ...data };
  });

  return fetchedItems;
};

const createNewOrder = (data: OrderType) => {
  return FirestoreService.createDocument("app/orders/in-queue", data);
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

const deleteOrder = async ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatusType;
}) => {
  return FirestoreService.deleteDocument(`app/orders/${orderStatus}`, id);
};

export const orderApi = {
  fetchAllOrders,
  createNewOrder,
  //   updateMenu,
  deleteOrder,
};
