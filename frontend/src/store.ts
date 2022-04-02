import { configureStore } from "@reduxjs/toolkit";
import { elevatorApi } from "./services/elevatorApi";

export const store = configureStore({
  reducer: {
    [elevatorApi.reducerPath]: elevatorApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([elevatorApi.middleware]),
});
