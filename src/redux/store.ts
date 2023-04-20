import { configureStore } from "@reduxjs/toolkit";
import celebritySlice from "./celebritySlice";

export const store = configureStore({
  reducer: {
    celebrity:celebritySlice
  },
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
