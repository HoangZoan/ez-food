import {
  addDoc,
  collection as firestoreCollection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore/lite";
import firebase from "../config";

const firestore = firebase.firestore;

const createDocument = <T>(collection: string, document: T) => {
  return addDoc(firestoreCollection(firestore, collection), document);
};

const readDocuments = async (collection: string) => {
  const collectionRef = firestoreCollection(firestore, collection);

  return getDocs(collectionRef);
};

const deleteDocument = (collection: string, id: string) => {
  return deleteDoc(doc(firestoreCollection(firestore, collection), id));
};

export const FirestoreService = {
  createDocument,
  readDocuments,
  deleteDocument,
};
