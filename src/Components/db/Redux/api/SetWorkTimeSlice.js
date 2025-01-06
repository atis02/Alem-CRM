import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  userStatus:[],
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request

export const getWorkTimeDay = createAsyncThunk(
  "getWorkTimeForDay",
  async () => {
    const resp = await AxiosInstance.get(`/time/get`);

    return resp.data;
  }
);
export const getUserStatusWork = createAsyncThunk(
  "getUserStatusWork",
  async () => {
    const resp = await AxiosInstance.get(`/user/status`);

    return resp.data.messagge;
  }
);
export const postWorkTimeDay = createAsyncThunk('postWorkTimeDay',
  async (body)=>{
    const resp = await AxiosInstance.post('/time/add/user',body)
    if(resp.data.message === `Successfully create work time for userId ${body.userId}`){
      toast.success('Üstünlikli!')
    const response = await AxiosInstance.get(`/user/status`);
    return response.data;
    }
  }
)
export const updateWorkTime = createAsyncThunk('updateWorkTime',
  async (body)=>{
    const resp = await AxiosInstance.put('/time/update/user',body)
    if(resp.data.message === `WorkTime updated successfully.`){
      toast.success('Üstünlikli!')
    const response = await AxiosInstance.get(`/user/status`);
    return response.data.messagge;
    }
  }
)
// Create the slice

const getTimeOfWork = createSlice({
  name: "getTimeOfWork",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get

      .addCase(getWorkTimeDay.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getWorkTimeDay.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getWorkTimeDay.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserStatusWork.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getUserStatusWork.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userStatus = action.payload;
      })
      .addCase(getUserStatusWork.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postWorkTimeDay.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(postWorkTimeDay.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(postWorkTimeDay.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateWorkTime.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateWorkTime.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userStatus = action.payload;
      })
      .addCase(updateWorkTime.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
    //create
  },
});

export default getTimeOfWork.reducer;
