import { FirestoreService } from "../../firebase/firestoreService";
import { OrderStatusType, OrderType } from "../../shared/types";

const fetchOrders = async (orderStatus: OrderStatusType) => {
  const response = await FirestoreService.readDocuments({
    collection: "app/orders/documents",
    queries: [{ field: "status", condition: "==", value: orderStatus }],
    order: {
      byField: orderStatus === "delivered" ? "deliverAt" : "orderAt",
      byDirection: orderStatus === "in-queue" ? "asc" : "desc",
    },
  });

  const fetchedItems = response.docs.map((recipeDoc) => {
    const id = recipeDoc.id;
    const data = recipeDoc.data() as Omit<OrderType, "id">;

    return { id, ...data };
  });

  return fetchedItems as OrderType[];
};

const createNewOrder = (data: OrderType) => {
  return FirestoreService.createDocument("app/orders/documents", data);
};

const updateOrder = ({
  id,
  data,
}: {
  id: string;
  data: Partial<OrderType>;
}) => {
  return FirestoreService.updateDocument("app/orders/documents", id, data);
};

// const deleteOrder = async (id: string) => {
//   return FirestoreService.deleteDocument("app/orders/documents", id);
// };

export const orderApi = {
  fetchOrders,
  createNewOrder,
  updateOrder,
  // deleteOrder,
};
