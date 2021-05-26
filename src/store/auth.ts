import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  fullName: string;
  email: string;
  userImg: string;
  uid: string;
  provider: string;
}

interface AuthProps {
  user: User;
  isAuthenticated: boolean;
  initializing: boolean;
}

const initialState: AuthProps = {
  user: {
    fullName: "",
    email: "",
    userImg: "",
    uid: "",
    provider: "",
  },
  isAuthenticated: false,
  initializing: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startInitializing: (state) => {
      state.initializing = true;
    },
    endInitializing: (state) => {
      state.initializing = false;
    },

    userIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      const { user } = state;
      user.fullName = action.payload.fullName;
      user.email = action.payload.email;
      user.userImg = action.payload.userImg;
      user.uid = action.payload.uid;
      user.provider = action.payload.provider;
    },
    setNoUser: (state) => {
      const { user } = state;
      user.fullName = "";
      user.email = "";
      user.userImg = "";
      user.uid = "";
      user.provider = "";
      state.isAuthenticated = false;
    },
    setUserImg: (state, action: PayloadAction<any>) => {
      state.user.userImg = action.payload.userImg;
    },
  },
});

export const {
  startInitializing,
  endInitializing,
  userIsAuthenticated,
  setCurrentUser,
  setNoUser,
  setUserImg,
} = authSlice.actions;
export default authSlice.reducer;
