import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../services/weatherApi";
import weatherSlice from "../services/weatherSlice";
import { newsApi } from "../services/newsApi";

export default configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    weatherState: weatherSlice,
  },
  // Add newsApi.middleware to the middleware array
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, newsApi.middleware),
});