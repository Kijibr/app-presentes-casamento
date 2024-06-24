import { giftsCollection, payersCollection } from "./firebase";
import { addDoc } from "firebase/firestore/lite";
import { GiftType, PaymentType } from "src/types";
import { v4 as uuidv4 } from 'uuid';

export const addNewPayer = async (payload: PaymentType) => {
  try {
    await addDoc(payersCollection, {
      ...payload,
      createdAt: new Date().toISOString(),
      value: parseFloat(payload.value.toString())
    });
  } catch (e) {
    console.error("Error save new payer: ", e);
  }
}

export const addGifts = async (payload: GiftType) => {
  try {
    await addDoc(giftsCollection, {
      ...payload,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      giftValue: parseFloat(payload.giftValue)
    });
  } catch (e) {
    console.error("Error save new payer: ", e);
  }
}