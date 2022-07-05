import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsStore from "./features/products";
import authSlice from "./features/auth";

const rootReducer = combineReducers({
  productsStore,
  authSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
