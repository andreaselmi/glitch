import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import userReducer from "./user";
import gamesReducer, { apiMiddleware } from "./games";

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    games: gamesReducer,
  },
  middleware: new MiddlewareArray().concat(apiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
