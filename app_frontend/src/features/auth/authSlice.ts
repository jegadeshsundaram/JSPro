import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthState, User } from "../types";

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  userToken: null,
  userInfo: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;

      state.isAuthenticated = false;
      AsyncStorage.setItem("userToken", "");

      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
    signup: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    updateProfile: (state, action) => {
      if (state.userInfo) {
        if (action.payload.fullName !== undefined) {
          state.userInfo.fullName = action.payload.fullName;
        }
        if (action.payload.email !== undefined) {
          state.userInfo.email = action.payload.email;
        }
        if (action.payload.username !== undefined) {
          state.userInfo.username = action.payload.username;
        }
        if (action.payload.phone !== undefined) {
          state.userInfo.phone = action.payload.phone;
        }
        if (action.payload.profilePic !== undefined) {
          state.userInfo.profilePic = action.payload.profilePic;
        }
      }
    },
    clearError: (state) => {
      state.error = null; // Add a reducer to clear the error message
    },
    clearSuccess: (state) => {
      state.success = false; // Add a reducer to clear the success message
    },
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userToken = action.payload.userToken ?? null;
        state.userInfo = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const { logout, signup, updateProfile, clearError, clearSuccess } =
  authSlice.actions;
export default authSlice.reducer;
