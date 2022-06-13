import {
  addDoc,
  collection as firestoreCollection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  OrderByDirection,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { FirebaseQuery } from "shared/types";
import firebase from "../config";

const firestore = firebase.firestore;

const createDocument = <T>(collection: string, document: T) => {
  return addDoc(firestoreCollection(firestore, collection), document);
};

interface ReadDocumentsParams<T> {
  collection: string;
  queries?: FirebaseQuery<T>[];
  order?: { byField: string; byDirection: OrderByDirection };
}

const readDocuments = async <T>({
  collection,
  queries,
  order,
}: ReadDocumentsParams<T>) => {
  const collectionRef = firestoreCollection(firestore, collection);
  let queryConstraints = [];

  if (queries && queries.length > 0) {
    for (const query of queries) {
      queryConstraints.push(where(query.field, query.condition, query.value));
    }
  }

  if (order?.byField && order.byDirection) {
    queryConstraints.push(orderBy(order.byField, order.byDirection));
  }

  const firestoreQuery = query(collectionRef, ...queryConstraints);

  return getDocs(firestoreQuery);
};

const updateDocument = <T>(collection: string, id: string, document: T) => {
  return updateDoc(doc(firestore, collection, id), document);
};

const deleteDocument = (collection: string, id: string) => {
  return deleteDoc(doc(firestoreCollection(firestore, collection), id));
};

export const FirestoreService = {
  createDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
};
