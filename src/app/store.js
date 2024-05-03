import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { weatherApi } from "../services/weatherApi";
import weatherSlice from "../services/weatherSlice";

export default configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    weatherState: weatherSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});
