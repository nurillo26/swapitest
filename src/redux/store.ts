import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import swapiReducer from './swapi/swapiSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    swapi: swapiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
