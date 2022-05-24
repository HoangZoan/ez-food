import firebase from "../config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const storage = firebase.storage;

const uploadFile = async (file: any, fullFilePath: string) => {
  const uploadRef = ref(storage, fullFilePath);
  const uploadTask = uploadBytesResumable(uploadRef, file);

  return uploadTask.then(async () => {
    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadUrl;
  });
};

const deleteFile = (fileDownloadUrl: string) => {
  const decodedUrl = decodeURIComponent(fileDownloadUrl);
  const startIndex = decodedUrl.indexOf("/o/") + 3;
  const endIndex = decodedUrl.indexOf("?");
  const filePath = decodedUrl.substring(startIndex, endIndex);
  const fileRef = ref(storage, filePath);

  return deleteObject(fileRef);
};

export const StorageService = {
  uploadFile,
  deleteFile,
};
