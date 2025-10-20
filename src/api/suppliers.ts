import { ISupplierType } from "src/pages/suppliers/types";
import { api } from ".";

export const suppliersApi = {
  getSuppliers: async () => {
    try {
      const response = await api.get<ISupplierType[]>('/suppliers/list');

      if ( response.status === 200) {
        return response.data;
      }
      return [];
    } catch (err) {
      throw new Error('Error fetching suppliers: ' + err);
    }
  },
  addNewSupplier: async (payload: ISupplierType) => {
    try {
      const response = await api.post('/suppliers/add', payload);

      if ( response.status === 200) {
        return response.data;
      }
      return [];
    } catch (err) {
      throw new Error('Error fetching suppliers: ' + err);
    }
  }
}