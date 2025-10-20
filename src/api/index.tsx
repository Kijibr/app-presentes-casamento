import { ICardPaymentBrickPayer, ICardPaymentFormData } from '@mercadopago/sdk-react/bricks/cardPayment/type';
import axios from 'axios';
import { UserInfoType } from 'src/components/BaseKit';
import { GiftType } from 'src/types';
import { getFromStorage } from 'src/utils/storage';
const url = import.meta.env.VITE_API_URL || process.env.VITE_API_URL || "not found";

export const api = axios.create({
  baseURL: url,
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = getFromStorage('userInfo') as UserInfoType;
  if (token) {
    config.headers.Authorization = token.id;
  };
  return config;
}, (error) => {

  return error;
});


export const createPixPaymentAsync = async (gift: GiftType, payer: string) => {
  try {
    const request = await api.post('/payment/pix', {
      giftId: gift.id,
      giftName: gift.name,
      transaction_amount: parseFloat(gift.giftValue),
      description: gift.name,
      email: import.meta.env.VITE_EMAIL_PAYER,
      payerName: payer,
    });

    if (request.status === 200)
      return request.data;
  } catch (err) {
    console.error('error on request: ' + err);
  }
}

export const createCreditCardPaymentAsync = async (gift: GiftType, payer: string, cardPayload: ICardPaymentFormData<ICardPaymentBrickPayer>) => {
  try {
    const splittedName = payer?.split(" ");
    const body = {
      giftId: gift.id,
      giftName: gift.name,
      description: gift.name,
      token: cardPayload.token,
      issuer_id: Number(cardPayload.issuer_id),
      payment_method_id: cardPayload.payment_method_id,
      transaction_amount: cardPayload.transaction_amount,
      installments: cardPayload.installments,
      payer: {
        email: cardPayload.payer.email,
        identification: cardPayload.payer.identification,
      },
      payerName: payer,
      first_name: splittedName[0]!,
      last_name: splittedName[1]!,
      statement_descriptor: "MERCADO_PAGO",
      external_reference: gift.id,
    }

    const request = await api.post('/payment/creditCard/process', body);

    if (request.status === 200)
      return request.data;
  } catch (err) {
    console.error('error on request: ' + err);
    return;
  }
}

export const getPaymentUpdate = async (id: string) => {
  try {
    const request = await api.get(`/payment/${id}`)
    if (request.status === 200)
      return request.data;
  } catch (err) {
    console.error('error on request: ' + err);
  }
}