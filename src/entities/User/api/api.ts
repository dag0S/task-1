import { $api } from "@/shared/api/api";
import type { IUser } from "../model/types";

export const fetchUsers = async () => {
  const res = await $api.get<IUser[]>("/users");

  return res.data;
};
