import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import userSlice from './userReducer';

const store = configureStore({
  reducer: {
    users: userSlice,
  },
});

const storeDispatch = store.dispatch;
const storeState = store.getState;
export const useAppDispatch: () => typeof storeDispatch = useDispatch;

export type AppState = ReturnType<typeof storeState>;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof storeState>> = useSelector;

export const useGuestHook = () => useAppSelector((x: AppState) => x.users);

export default store;