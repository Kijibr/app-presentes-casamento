import { useReducer } from "react";

type modalState = {
  isOpen: boolean;
}

const initialState: modalState = {
  isOpen: true
};

type modalAction = { type: 'TOGGLE_MODAL', payload: boolean };

const modalReducer = (state: modalState, action: modalAction): modalState => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { isOpen: action.payload };
    default:
      return state;
  }
}

export const useModalHook = () => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  function handleModal(state: boolean) {
    dispatch({
      type: "TOGGLE_MODAL",
      payload: state
    });
  }

  return {
    modalOpen: modalState,
    handleModal
  }
}