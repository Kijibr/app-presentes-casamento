import { useReducer } from "react";
import { useModalHook } from "./modalReducer";

type UserState = {
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

type UserAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'TOGGLE_IDENTIFIED' }
  | { type: 'RESET_INFO' };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "TOGGLE_IDENTIFIED":
      return { ...state, identified: !state.identified };
    case "RESET_INFO":
      return initialState;
    default:
      return state;
  }
}

export const userHook = () => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  function setUsername(value: string) {
    dispatch({
      type: "SET_NAME",
      payload: value
    });
  }

  function setPassword(value: string) {
    dispatch({
      type: "SET_PASSWORD",
      payload: value
    });
  }

  function loginAction() {
    dispatch({
      type: "TOGGLE_IDENTIFIED"
    });
  }

  function resetAction() {
    dispatch({
      type: "RESET_INFO"
    });
  }

  return {
    user: userState,
    setUsername,
    setPassword,
    loginAction,
    resetAction
  }
}