import {
  addDoc,
  collection as firestoreCollection,
} from "firebase/firestore/lite";
import firebase from "../config";

const firestore = firebase.firestore;

const createDocument = <T>(collection: string, document: T) => {
  return addDoc(firestoreCollection(firestore, collection), document);
};

export const firestoreService = {
  createDocument,
};
