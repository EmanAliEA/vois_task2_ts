import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { checkLogin } from "../services/checkUser";
import type { Post } from "../services/postsApi";

type User = {
  email: string;
  isLogin: boolean;
};

type UserState = {
  isLogin: boolean;
  user: User | null;
  posts: Post[];
  postsPerPage: Post[];
  numPage: number;
  error: string;
};

const initialState: UserState = {
  isLogin: checkLogin()?.isLogin || false,
  user: checkLogin() || {},
  posts: [],
  numPage: 1,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLogin = true;
      state.user = action.payload;
    },

    changePage(state, action: PayloadAction<number>) {
      state.numPage = action.payload + 1;
    },

    logout(state) {
      state.isLogin = false;
      state.user = null;
    },
  },
});

export const { login, logout, changePage } = userSlice.actions;
export const userReducer = userSlice.reducer;
