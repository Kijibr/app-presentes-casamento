import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllgifts } from "src/api/gifts";

export const useGiftHook = () => {
  const { data: giftsList, isFetching } = useQuery({
    queryKey: ['gifts-list'],
    queryFn: async () => await getAllgifts(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    placeholderData: keepPreviousData,
  });

  return {
    giftsList,
    isFetching
  }
}