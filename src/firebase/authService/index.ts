import firebase from "../config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { cloneDeep } from "lodash";

const auth = firebase.auth;

// const registerUser = (email: string, password: string) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return auth.signOut();
};

const subscribeToAuthChanges = (
  handleAuthChange: (admin: User | null) => void
) => {
  onAuthStateChanged(auth, (admin) => {
    handleAuthChange(cloneDeep(admin));
  });
};

export const FirebaseAuthService = {
  loginUser,
  logoutUser,
  subscribeToAuthChanges,
};
