import { useReducer } from "react";
import { useModalHook } from "./modalReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  id: string;
  name: string;
  password: string;
  identified: boolean;
  confirmed: boolean;
}

const initialState: UserState = {
  id: '',
  name: '',
  password: '',
  identified: false,
  confirmed: false,
};


const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUsername: (state, { payload }: PayloadAction<string>) => {
      return { ...state, name: payload };
    },
    setPassword: (state, { payload }: PayloadAction<string>) => {
      return { ...state, password: payload };
    },
    toggleIdentified: (state) => {
      return { ...state, identified: !state.identified };
    },
    resetInfo: () => {
      return initialState;
    }
  }
});

export const {
  setUsername,
  setPassword,
  toggleIdentified,
  resetInfo
} = userSlice.actions;

export default userSlice.reducer;