import { addDoc, getDocs } from "firebase/firestore/lite";
import { guestsCollection } from "./firebase";

export const getAllGuests = async () => {
  const guestsSnap = await getDocs(guestsCollection);

  const result = guestsSnap.docs.map(item => item.data());
  return result;
}

export const addNewGuest = async (name: string) => {
  try {
    const addItem = await addDoc(guestsCollection, {
      name,
      age: 22
    });

    console.log("Document written with ID: ", addItem);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}