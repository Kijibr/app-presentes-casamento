import { useReducer } from "react";

type UserState = {
  name: string;
  email: string;
  age: number;
  identified: boolean;
}

const initialState: UserState = {
  name: '',
  email: '',
  age: 0,
  identified: false,
};

type UserAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_AGE'; payload: number }
  | { type: 'TOGGLE_IDENTIFIED' }
  | { type: 'RESET_INFO' };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, name: action.payload };
    case "SET_AGE":
      return { ...state, age: action.payload };
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

  function setEmail(value: string) {
    dispatch({
      type: "SET_EMAIL",
      payload: value
    });
  }

  function setAge(value: number) {
    dispatch({
      type: "SET_AGE",
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
    setEmail,
    setAge,
    loginAction,
    resetAction
  }
}