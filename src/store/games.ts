import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { helix } from "../config/api";
import { Games, Streams } from "../types/interfaces";

interface GamesStoreProps {
  favoriteGames: Games[];
  topGames: Games[];
  topStreams: Streams[];
  isLoading: boolean;
  loadTopGamesError: string | null;
  loadTopStreamsError: string | null;
}

const initialState: GamesStoreProps = {
  favoriteGames: [],
  topGames: [],
  topStreams: [],
  isLoading: false,
  loadTopGamesError: null,
  loadTopStreamsError: null,
};

const userSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addTopGames: (state, action: PayloadAction<any>) => {
      state.topGames = action.payload.data;
    },
    addTopStreams: (state, action: PayloadAction<any>) => {
      state.topStreams = action.payload.data;
    },
    gamesRequested: (state) => {
      state.isLoading = true;
    },
    loadTopGamesFailed: (state, action) => {
      state.loadTopGamesError = action.payload;
      state.isLoading = false;
    },
    loadTopStreamsFailed: (state, action) => {
      state.loadTopStreamsError = action.payload;
      state.isLoading = false;
    },
  },
});

export const { gamesRequested } = userSlice.actions;
export default userSlice.reducer;

//action for starting api calls
interface ApiCallBeganProps {
  endpoint: string;
  onSuccess: string;
  onError: string;
}

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const apiCallBegan = createAction(
  "apiCallBegan",
  withPayloadType<ApiCallBeganProps>()
);

//custom api middleware
export const apiMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: PayloadAction<any>) => {
    if (action.type !== "apiCallBegan") return next(action);
    dispatch(gamesRequested());

    const { endpoint, onSuccess, onError } = action.payload;

    try {
      const response = await helix.get(endpoint);
      if (response.status === 200) {
        dispatch({ type: onSuccess, payload: response.data });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch({ type: onError, payload: error });
    }
  };

export const loadTopGames = () => {
  return apiCallBegan({
    endpoint: "/games/top",
    onSuccess: "games/addTopGames",
    onError: "games/loadTopGamesFailed",
  });
};
export const loadTopStreams = () => {
  return apiCallBegan({
    endpoint: "/streams",
    onSuccess: "games/addTopStreams",
    onError: "games/loadTopStreamsError",
  });
};
