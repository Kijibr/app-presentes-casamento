import { GiftType } from "src/types";
import { api } from ".";

export const getAllgifts = async () => {
  const giftsSnap = await api.get<GiftType[]>('/gifts/list');
  if (giftsSnap.status === 200) {
    const result = giftsSnap.data;
    return result;
  }
}