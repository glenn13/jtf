import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import ClientDataSlice from "./reducers/ClientDataSlice";
import ClientDataSlice from '@/store/reducers/ClientDataSlice';

export const store = configureStore({
  reducer: {
    ClientDataSlice
  },
  devTools: true,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
