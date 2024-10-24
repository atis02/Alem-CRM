import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};

// Create an async thunk for the GET request
export const getStandarts = createAsyncThunk("getStandarts", async (userId) => {
  const response = await AxiosInstance.get(`/labor/protection/get?userId=${userId}`);
  if (response.data.status === 404) {
    toast.error(response.data.message);
  }
  return response.data;
});

export const updateImg = createAsyncThunk("updateImg", async (body) => {
  const resp = await AxiosInstance.patch(`/user/updata/img`, body);
  resp.data ? toast.success("Üstünlikli döredildi!") : toast.error("Şowsuz!");
  localStorage.setItem("CRM_USER", JSON.stringify(resp.data));

  return resp.data;
});

// Create the slice
const standartSlice = createSlice({
  name: "standart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getStandarts.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getStandarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(getStandarts.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
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
  },
});

export default standartSlice.reducer;
