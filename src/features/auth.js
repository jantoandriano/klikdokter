import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  loading: "idle",
  error: null,
};

export const loginUser = async (params) => {
  try {
    const formData = new FormData();
    formData.append("email", params.email);
    formData.append("password", params.password);

    const response = await axios.post(
      "https://hoodwink.medkomtek.net/api/auth/login",
      formData
    );

    const {
      data: { token },
    } = response;

    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    console.log("error::slice::users::loginUser::", error);
  }
};

export const registerUser = async (params, navigate) => {
  try {
    const formData = new FormData();
    formData.append("email", params.email);
    formData.append("password", params.password);

    const response = await axios.post(
      "https://hoodwink.medkomtek.net/api/register",
      formData
    );
    if (response) {
      navigate("/login", { replace: true });
    }
  } catch (error) {
    console.log("error::slice::users::registerUser::", error);
  }
};

export const authSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
