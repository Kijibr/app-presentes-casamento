import axios from 'axios';
import { GiftType } from 'src/types';
const url = import.meta.env.VITE_API_URL || process.env.VITE_API_URL || "not found";
export const api = axios.create({
  baseURL: url
})

export const createPaymentAsync = async (gift: GiftType, payer: string) => {
  try {
    const request = await api.post('/payment/pix', {
      giftId: gift.id,
      giftName: gift.name,
      transaction_amount: parseInt(gift.giftValue),
      description: gift.name,
      email: import.meta.env.VITE_EMAIL_PAYER,
      identificationType: "123321",
      payerName: payer,
    });

    if (request.status === 200)
      return request.data;
  } catch (err) {
    throw new Error('error in request: ' + err);
  }
}

export const getPaymentUpdate = async (id: string) => {
  try {
    const request = await api.get(`/payment/${id}`)
    if (request.status === 200)
      return request.data;
  } catch (err) {
    throw new Error('error in request: ' + err);
  }
}