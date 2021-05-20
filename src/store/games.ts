import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { helix } from "../config/api";
import { firestore } from "../config/firebase";
import { Games, Streams } from "../types/interfaces";

interface GamesStoreProps {
  favoriteGames: Games[];
  topGames: Games[];
  topStreams: Streams[];
  searchedGames: Games[];
  isLoading: boolean;
  loadTopGamesError: string | null;
  loadTopStreamsError: string | null;
  loadSearchedGamesError: string | null;
}

const initialState: GamesStoreProps = {
  favoriteGames: [],
  topGames: [],
  topStreams: [],
  searchedGames: [],
  isLoading: false,
  loadTopGamesError: null,
  loadTopStreamsError: null,
  loadSearchedGamesError: null,
};

const userSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addSearchedGames: (state, action: PayloadAction<any>) => {
      state.searchedGames = action.payload.data;
    },
    addTopGames: (state, action: PayloadAction<any>) => {
      state.topGames = action.payload.data;
    },
    addTopStreams: (state, action: PayloadAction<any>) => {
      state.topStreams = action.payload.data;
    },
    clearFavoriteGames: (state) => {
      state.favoriteGames = [];
    },
    gamesRequested: (state) => {
      state.isLoading = true;
    },
    gamesEndRequest: (state) => {
      state.isLoading = false;
    },
    loadSavedGames: (state, action) => {
      const alreadySaved = state.favoriteGames.findIndex(
        (game) => game["id"] === action.payload.id
      );
      if (alreadySaved === -1) {
        state.favoriteGames.push(action.payload);
      } else return state;
    },
    loadSearchedGamesFailed: (state, action) => {
      state.loadTopGamesError = action.payload;
      state.isLoading = false;
    },
    loadTopGamesFailed: (state, action) => {
      state.loadTopGamesError = action.payload;
      state.isLoading = false;
    },
    loadTopStreamsFailed: (state, action) => {
      state.loadTopStreamsError = action.payload;
      state.isLoading = false;
    },
    toggleFavoriteGame: (state, action) => {
      const alreadySaved = state.favoriteGames.findIndex(
        (game) => game["id"] === action.payload.id
      );
      if (alreadySaved === -1) {
        state.favoriteGames.push(action.payload);
      } else {
        state.favoriteGames.splice(alreadySaved, 1);
      }
    },
  },
});

export const {
  clearFavoriteGames,
  gamesRequested,
  gamesEndRequest,
  toggleFavoriteGame,
} = userSlice.actions;
export default userSlice.reducer;

//action for starting api calls
interface ApiCallBeganProps {
  endpoint: string;
  onSuccess: string;
  onError: string;
  query?: string;
}
interface FirestoreCallBeganProps {
  user: any;
  collection: string;
  parameter: string;
  filter: string;
  onSuccess: string;
}

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const apiCallBegan = createAction(
  "apiCallBegan",
  withPayloadType<ApiCallBeganProps>()
);

export const firestoreCallBegan = createAction(
  "firestoreCallBegan",
  withPayloadType<FirestoreCallBeganProps>()
);

//custom api middleware
export const apiMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: PayloadAction<any>) => {
    if (action.type !== "apiCallBegan") return next(action);
    dispatch(gamesRequested());

    const { endpoint, onSuccess, onError, query } = action.payload;

    try {
      let response;
      if (query) {
        response = await helix.get(endpoint + "?query=" + query);
      } else {
        response = await helix.get(endpoint);
      }

      if (response.status === 200) {
        dispatch({ type: onSuccess, payload: response.data });
        dispatch(gamesEndRequest());
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      //TODO da verificare
      console.log(error);
      dispatch({ type: onError, payload: error });
    }
  };

//middleware for fetching data from firestore
export const firestoreMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: PayloadAction<any>) => {
    if (action.type !== "firestoreCallBegan") return next(action);

    const { user, collection, parameter, filter, onSuccess } = action.payload;

    firestore
      .collection(collection)
      .where(parameter, filter, user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          dispatch({ type: onSuccess, payload: documentSnapshot.data() });
        });
      });
  };

export const loadTopGames = () => {
  return apiCallBegan({
    endpoint: "/games/top",
    onSuccess: "games/addTopGames",
    onError: "games/loadTopGamesError",
  });
};
export const loadTopStreams = () => {
  return apiCallBegan({
    endpoint: "/streams",
    onSuccess: "games/addTopStreams",
    onError: "games/loadTopStreamsError",
  });
};
export const loadSearchedGames = (query: string) => {
  return apiCallBegan({
    endpoint: "/search/categories",
    query,
    onSuccess: "games/addSearchedGames",
    onError: "games/loadSearchedGamesError",
  });
};

export const loadGamesFromFirestore = (user: any) => {
  return firestoreCallBegan({
    user,
    collection: "games",
    parameter: "userId",
    filter: "==",
    onSuccess: "games/loadSavedGames",
  });
};
