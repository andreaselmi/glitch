import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import userReducer from "./user";
import gamesReducer, { apiMiddleware, firestoreMiddleware } from "./games";

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    games: gamesReducer,
  },
  middleware: [apiMiddleware, firestoreMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
