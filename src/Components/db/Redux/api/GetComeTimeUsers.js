import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request

export const getWorkTimeForDay = createAsyncThunk(
  "getWorkTimeForDay",
  async (date) => {
    const resp = await AxiosInstance.get(`/user/get/users?date=${date}`);

    return resp.data;
  }
);
// Create the slice

const getWorkTime = createSlice({
  name: "getWorkTime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get

      .addCase(getWorkTimeForDay.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getWorkTimeForDay.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getWorkTimeForDay.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });

    //create
  },
});

export default getWorkTime.reducer;
