import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  fullName: string;
  email: string;
  userImg: string;
  uid: string;
  provider: string;
}

const initialState: User = {
  fullName: "",
  email: "",
  userImg: "",
  uid: "",
  provider: "",
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.userImg = action.payload.userImg;
      state.uid = action.payload.uid;
      state.provider = action.payload.provider;
    },
    setNoUser: (state) => {
      state = {
        fullName: "",
        email: "",
        userImg: "",
        uid: "",
        provider: "",
      };
    },
    setUserImg: (state, action: PayloadAction<any>) => {
      state.userImg = action.payload.userImg;
    },
  },
});

export const { setCurrentUser, setNoUser, setUserImg } = userSlice.actions;
export default userSlice.reducer;
