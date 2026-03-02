import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthState, User } from '../types';

const initialState: AuthState = {
   loading: false,
   userInfo: null,
   userToken: null,
   error: null,
   success: false,
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         AsyncStorage.setItem('userToken', '');
         state.loading = false;
         state.userInfo = null;
         state.userToken = null;
         state.error = null;
      },
      signup: (state, action: PayloadAction<User>) => {
         state.userInfo = action.payload
      }
   },
   extraReducers: (builder) => {
      builder
         // login user
         .addCase(userLogin.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.userToken = action.payload.userToken ?? null
         })
         .addCase(userLogin.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload ?? null
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
         })
   },
})

export const { logout, signup } = authSlice.actions
export default authSlice.reducer;