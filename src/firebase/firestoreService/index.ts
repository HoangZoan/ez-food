import {
  addDoc,
  collection as firestoreCollection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore/lite";
import firebase from "../config";

const firestore = firebase.firestore;

const createDocument = <T>(collection: string, document: T) => {
  return addDoc(firestoreCollection(firestore, collection), document);
};

interface Queries<T> {
  field: string;
  condition: WhereFilterOp;
  value: T;
}

interface ReadDocumentsParams<T> {
  collection: string;
  queries?: Queries<T>[];
}

const readDocuments = async <T>({
  collection,
  queries,
}: ReadDocumentsParams<T>) => {
  const collectionRef = firestoreCollection(firestore, collection);
  let queryConstraints = [];

  if (queries && queries.length > 0) {
    for (const query of queries) {
      queryConstraints.push(where(query.field, query.condition, query.value));
    }
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
