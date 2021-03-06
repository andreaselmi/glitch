import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { helix } from "../config/api";
import { firestore } from "../config/firebase";
import { Games, Streams } from "../types/interfaces";

interface GamesStoreProps {
  favoriteGames: Games[];
  topGames: Games[];
  topStreams: Streams[];
  searchedGames: Games[];
  searchValue: string;
  isLoading: boolean;
  topGamesErrorMsg: string | null;
  topStreamsErrorMsg: string | null;
  searchGameErrorMsg: string | null;
}

const initialState: GamesStoreProps = {
  favoriteGames: [],
  topGames: [],
  topStreams: [],
  searchedGames: [],
  isLoading: false,
  searchValue: "",
  topGamesErrorMsg: null,
  topStreamsErrorMsg: null,
  searchGameErrorMsg: null,
};

const userSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addSearchedGames: (state, action: PayloadAction<any>) => {
      state.searchGameErrorMsg = null;
      state.searchedGames = action.payload.data;
    },
    addTopGames: (state, action: PayloadAction<any>) => {
      state.topGamesErrorMsg = null;
      state.topGames = action.payload.data;
    },
    addTopStreams: (state, action: PayloadAction<any>) => {
      state.topStreamsErrorMsg = null;
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
    loadSavedGames: (state, action: PayloadAction<Games>) => {
      const alreadySaved = state.favoriteGames.findIndex(
        (game) => game["id"] === action.payload.id
      );
      if (alreadySaved === -1) {
        state.favoriteGames.push(action.payload);
      } else return state;
    },
    loadSearchedGamesFailed: (state, action: PayloadAction<string>) => {
      state.searchGameErrorMsg = action.payload;
      state.isLoading = false;
    },
    loadTopGamesFailed: (state, action: PayloadAction<string>) => {
      state.topGamesErrorMsg = action.payload;
      state.isLoading = false;
    },
    loadTopStreamsFailed: (state, action: PayloadAction<string>) => {
      state.topStreamsErrorMsg = action.payload;
      state.isLoading = false;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    clearSearchValue: (state) => {
      state.searchValue = "";
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
  setSearchValue,
  clearSearchValue,
} = userSlice.actions;
export default userSlice.reducer;

//actions for starting api calls
interface ApiCallBeganProps {
  endpoint: string;
  options?: string;
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

export const loadTopGames = (options = "") => {
  return apiCallBegan({
    endpoint: "/games/top",
    options,
    onSuccess: "games/addTopGames",
    onError: "games/loadTopGamesFailed",
  });
};
export const loadTopStreams = (options = "") => {
  return apiCallBegan({
    endpoint: "/streams",
    options,
    onSuccess: "games/addTopStreams",
    onError: "games/loadTopStreamsFailed",
  });
};
export const loadSearchedGames = (query: string, options = "") => {
  return apiCallBegan({
    endpoint: "/search/categories",
    query,
    options,
    onSuccess: "games/addSearchedGames",
    onError: "games/loadSearchedGamesFailed",
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

//end actions api calls

//customs middleware
export const helixApiMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: PayloadAction<any>) => {
    if (action.type !== "apiCallBegan") return next(action);
    dispatch(gamesRequested());

    const { endpoint, onSuccess, onError, query, options } = action.payload;

    try {
      let response;
      if (query) {
        response = await helix.get(endpoint + "?query=" + query + options);
      } else {
        response = await helix.get(endpoint + options);
      }

      if (response.status === 200 && response.data.data) {
        dispatch({ type: onSuccess, payload: response.data });
        dispatch(gamesEndRequest());
      } else {
        throw new Error("No Results");
      }
    } catch (error) {
      dispatch({ type: onError, payload: error.message });
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
