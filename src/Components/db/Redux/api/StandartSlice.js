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
export const getStandartsForUser = createAsyncThunk("getStandartsForUser", async (userId) => {
  const response = await AxiosInstance.get(`/labor/protection/get/user?userId=${userId}`);
  if (response.data.status === 404) {
    toast.error(response.data.message);
  }
  return response.data;
});
export const deleteStandart = createAsyncThunk("deleteStandart", async (body) => {
  
  const resp = await AxiosInstance.delete(`/labor/protection/delete?id=${body.laborId}&userId=${body.userId}`)
  if(resp.data.message==='LaborProtection deleted successfully'){
    toast.success('Üstünlikli!');
    const response = await AxiosInstance.get(`/labor/protection/get?userId=${body.userId}`);
    return response.data;

  }
  else {
    toast.error('Ýalňyşlyk!');
  }
});
export const postStandart = createAsyncThunk("postStandart", async (body) => {
  const data = {
    title: body.title,
    description: body.description,
    usersId: body.usersId,
  };
  const resp = await AxiosInstance.post(`/labor/protection/add`,data)
  if(resp.data=='OK'){
    toast.success('Üstünlikli!');
    const response = await AxiosInstance.get(`/labor/protection/get?userId=${body.userId}`);
    return response.data;

  }
  else {
    toast.error('Ýalňyşlyk!');
  }
});
export const updateStandart = createAsyncThunk("updateStandart", async (body) => {
 
  const resp = await AxiosInstance.put(`/labor/protection/update`,body)
  if(resp.data){
    toast.success('Üstünlikli!');
    const response = await AxiosInstance.get(`/labor/protection/get?userId=${body.userId}`);
    return response.data;

  }
  else {
    toast.error('Ýalňyşlyk!');
  }
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
      .addCase(getStandartsForUser.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getStandartsForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(getStandartsForUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStandart.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteStandart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(deleteStandart.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postStandart.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(postStandart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(postStandart.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStandart.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateStandart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(updateStandart.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      
  },
});

export default standartSlice.reducer;
