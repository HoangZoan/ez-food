import { User } from "firebase/auth";
import { atom } from "recoil";

export const adminLoginState = atom({
  key: "adminLogin",
  default: null as User | null,
});
