import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";
import { user } from "../../../utils";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request

export const getPDF = createAsyncThunk("getPDF", async (body) => {
  const response = await AxiosInstance.get(`/pdf/get/files?userId=${body}`);
  if (response.data.status === 404) {
    toast.error(response.data.message);
  }
  return response.data;
});
export const createPdf = createAsyncThunk(
  "createPdf",
  async (body, { rejectWithValue }) => {
    try {
      const resp = await AxiosInstance.post("/pdf/upload/file", body);

      if (resp.status === 200) {
        toast.success("Üstünlikli!");
      }
      const response = await AxiosInstance.get(
        `/pdf/get/files?userId=${user.id}`
      );
      if (response.data.status === 404) {
        toast.error(response.data.message);
      }
      return response.data;
    } catch (error) {
      toast.error("Ýalňyşlyk!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deletePdf = createAsyncThunk("deletePdf", async (body) => {
  const resp = await AxiosInstance.post(`/pdf/delete`, body);
  resp.status == 200 ? toast.success("Üstünlikli!") : "";
  if (resp.data.status === 404) {
    toast.error(resp.data.message);
  }

  const response = await AxiosInstance.get(`/pdf/get/files?userId=${user.id}`);
  if (response.data.status === 404) {
    toast.error(response.data.message);
  }
  return response.data;
});
// Create the slice

const postPdf = createSlice({
  name: "postPdf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //create

      .addCase(createPdf.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createPdf.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createPdf.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // get
      .addCase(getPDF.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getPDF.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getPDF.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // delete
      .addCase(deletePdf.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deletePdf.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deletePdf.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postPdf.reducer;
