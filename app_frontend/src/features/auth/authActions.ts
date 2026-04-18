import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { LoginCredentials, RegisterCredentials, User } from "../types";

import AppConfig from "@/src/app/constants/AppConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ApiErrorResponse {
  message: string;
}

export const userLogin = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    const { data } = await axios.post<User>(
      `${AppConfig.backend_url}api/user/login`,
      { email, password },
      config,
    );

    // store user's token in local storage
    if (data.userToken) {
      AsyncStorage.setItem("userToken", data.userToken);
    }

    console.log(
      ">>>> Login >>> ACTION >>> " + AsyncStorage.getItem("userToken"),
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response && axiosError.response.data.message) {
      return rejectWithValue(axiosError.response.data.message);
    } else {
      return rejectWithValue(axiosError.message);
    }
  }
});

export const registerUser = createAsyncThunk<
  void,
  RegisterCredentials,
  { rejectValue: string }
>(
  "auth/register",
  async ({ client, product, email, username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${AppConfig.backend_url}api/user/register`,
        { client, product, email, username, password },
        config,
      );

      console.log(">>>>response" + response.data);
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response && axiosError.response.data.message) {
        console.log(">>>>response1 " + axiosError.response.data.message);
        return rejectWithValue(axiosError.response.data.message);
      } else {
        console.log(">>>>response2 " + axiosError.message);
        return rejectWithValue(axiosError.message);
      }
    }
  },
);
