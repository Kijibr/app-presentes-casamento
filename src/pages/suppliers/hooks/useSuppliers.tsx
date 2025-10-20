import { useMutation, useQuery } from "@tanstack/react-query"
import { suppliersApi } from "src/api/suppliers";
import { ISupplierType } from "../types";

export const useSuppliers = () => {

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => await suppliersApi.getSuppliers()
  });

  const addSupplier = useMutation({
    mutationFn: async (supplier: ISupplierType) => await suppliersApi.addNewSupplier(supplier),
    onSuccess: (response) => {

    }, onError: (error) => {

    }
  });

  return {
    data,
    refetch,
    isFetching,
    addSupplier
  }
}