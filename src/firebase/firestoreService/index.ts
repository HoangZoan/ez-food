import {
  addDoc,
  collection as firestoreCollection,
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

export const FirestoreService = {
  createDocument,
  readDocuments,
};
