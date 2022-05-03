import { atom } from "recoil";
import { NotificationListType } from "../../shared/types";

const dummyCartData = [
  {
    id: "1",
    image: "",
    title: "Some heading title Some heading title Some heading title",
    description:
      "This a an absolutely woderful descirption for the post. This a an absolutely woderful descirption for the post.",
  },
  {
    id: "2",
    image: "",
    title: "Some heading title",
    description:
      "This a an absolutely woderful descirption for the post. This a an absolutely woderful descirption for the post.",
  },
  {
    id: "3",
    image: "",
    title: "Some heading title",
    description:
      "This a an absolutely woderful descirption for the post. This a an absolutely woderful descirption for the post.",
  },
  {
    id: "4",
    image: "",
    title: "Some heading title",
    description:
      "This a an absolutely woderful descirption for the post. This a an absolutely woderful descirption for the post.",
  },
];

export const notificationsState = atom({
  key: "notifications",
  default: dummyCartData as NotificationListType[],
});
