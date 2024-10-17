import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";
import { user } from "../../../utils";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
  uploadProgress: 0, // New state for tracking upload progress
};

// Create an async thunk for the GET request
export const getPDF = createAsyncThunk("getPDF", async (userId) => {
  const response = await AxiosInstance.get(`/pdf/get/files?userId=${userId}`);
  if (response.data.status === 404) {
    
    toast.error(response.data.message);
  }
  return response.data;
});

export const createPdf = createAsyncThunk(
  "createPdf",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const resp = await AxiosInstance.post(
        "/pdf/upload/file",
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            dispatch(updateUploadProgress(progress)); // Dispatch upload progress
          }
        }
      );

      if (resp.status === 200) {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get(
          `/pdf/get/files?userId=${user.id}`
        );
        return response.data;
      }

      if (resp.data.status === 404) {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error("Ýalňyşlyk!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePdf = createAsyncThunk("deletePdf", async (body) => {
  const resp = await AxiosInstance.post(`/pdf/delete`, body);
  if (resp.status === 200) {
    toast.success("Üstünlikli!");
  }

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
  reducers: {
    updateUploadProgress: (state, action) => {
      state.uploadProgress = action.payload; // Update upload progress
    },
    resetUploadProgress: (state) => {
      state.uploadProgress = 0; // Reset upload progress
    },
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createPdf.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createPdf.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.uploadProgress = 0; // Reset progress on success
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

export const { updateUploadProgress, resetUploadProgress } = postPdf.actions;

export default postPdf.reducer;
