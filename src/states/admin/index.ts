import { User } from "firebase/auth";
import { atom } from "recoil";
import { ADMIN } from "shared/config";
import { localStorageEffect } from "shared/utils";

export const adminLoginState = atom({
  key: "adminLogin",
  default: null as User | null,
  effects: [localStorageEffect(ADMIN)],
});
