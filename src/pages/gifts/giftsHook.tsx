import { useEffect, useState } from "react";
import { getAllgifts } from "src/api/gifts";
import { GiftType } from "src/types";

export const useGiftHook = () => {
  const [giftsList, setGifts] = useState<GiftType[]>();

  useEffect(() => {
    (async () => {
      const items = await getAllgifts();
      setGifts(items);
    })();
  }, [])
  return {
    giftsList
  }
}