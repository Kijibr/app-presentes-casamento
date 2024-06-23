import { GiftType } from "src/context/payment";
import { giftsCollection, payersCollection } from "./firebase";
import { addDoc } from "firebase/firestore/lite";

export const addNewPayer = async (payload: GiftType) => {
  try {
    const addItem = await addDoc(payersCollection, {
      giftId: payload.id,
      createdAt: new Date().toISOString(),
      name: payload.payer,
      gift: payload.name,
      valuePayed: parseFloat(payload.valueToSend)
    });

    console.log("Payer written with ID: ", addItem);
  } catch (e) {
    console.error("Error save new payer: ", e);
  }
}

export const addGifts = async (payload: GiftType) => {
  try {
    const addItem = await addDoc(giftsCollection, {
      ...payload,
      valueToSend: parseFloat(payload.valueToSend)
    });

    console.log("Payer written with ID: ", addItem);
  } catch (e) {
    console.error("Error save new payer: ", e);
  }
}