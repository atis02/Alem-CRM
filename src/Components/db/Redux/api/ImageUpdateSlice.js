import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialState = {
  updated: false,
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request

export const updateImg = createAsyncThunk("updateImg", async (body) => {
  const resp = await AxiosInstance.patch(`/user/updata/img`, body);
  resp.data ? toast.success("Üstünlikli döredildi!") : toast.error("Şowsuz!");
  localStorage.setItem("CRM_USER", JSON.stringify(resp.data));

  return resp.data;
});
// Create the slice

const userImg = createSlice({
  name: "userImg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get

      .addCase(updateImg.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateImg.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(updateImg.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });

    //create
  },
});

export default userImg.reducer;
