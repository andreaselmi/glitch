import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import authReducer from "./auth";
import gamesReducer, { apiMiddleware, firestoreMiddleware } from "./games";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
  },
  middleware: [apiMiddleware, firestoreMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
