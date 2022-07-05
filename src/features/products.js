import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const res = await fetch("https://hoodwink.medkomtek.net/api/items");
  const result = await res.json();
  return result;
});

export const getProductListBySku = createAsyncThunk(
  "products/getProductListBySku",
  async (params) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("sku", params.toLowerCase());

      const res = await axios.post(
        "https://hoodwink.medkomtek.net/api/item/search",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      if (errorMessage.includes("token")) {
        localStorage.removeItem("token");
        throw Error("Token expired");
      }
    }
  }
);

export const deleteItem = async (params) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("sku", params.sku);
    formData.append("product_name", params.product_name);
    formData.append("qty", params.qty);
    formData.append("price", params.price);
    formData.append("unit", params.unit);
    formData.append("status", params.status);

    const res = await axios.post(
      "https://hoodwink.medkomtek.net/api/item/delete",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    const errorMessage = error?.response?.data?.error;
    if (errorMessage.includes("token")) {
      localStorage.removeItem("token");
      throw Error("Token expired");
    }
  }
};

export const updateItem = async (params) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("sku", params.sku);
    formData.append("product_name", params.product_name);
    formData.append("qty", params.qty);
    formData.append("price", params.price);
    formData.append("unit", params.unit);
    formData.append("status", params.status);

    const res = await axios.post(
      "https://hoodwink.medkomtek.net/api/item/update",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    const errorMessage = error?.response?.data?.error;
    if (errorMessage.includes("token")) {
      localStorage.removeItem("token");
      throw Error("Token expired");
    }
  }
};

export const addItem = async (params) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("sku", params.sku);
    formData.append("product_name", params.product_name);
    formData.append("qty", params.qty);
    formData.append("price", params.price);
    formData.append("unit", params.unit);
    formData.append("status", params.status);

    const res = await axios.post(
      "https://hoodwink.medkomtek.net/api/item/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    const errorMessage = error?.response?.data?.error;
    if (errorMessage.includes("token")) {
      localStorage.removeItem("token");
      throw Error("Token expired");
    }
  }
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchItems.pending]: (state, _) => {
      state.loading = true;
    },
    [fetchItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    },
    [fetchItems.rejected]: (state, _) => {
      state.loading = false;
      state.error = "Cannot get items";
    },
    [getProductListBySku.pending]: (state, _) => {
      state.loading = true;
    },
    [getProductListBySku.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = [payload];
    },
    [getProductListBySku.rejected]: (state, _) => {
      state.loading = false;
      state.error = "Cannot get products by sku";
    },
  },
});

export default itemsSlice.reducer;
