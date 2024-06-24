import { payersCollection } from "./firebase";
import { addDoc } from "firebase/firestore/lite";
import { PaymentType } from "src/types";

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
