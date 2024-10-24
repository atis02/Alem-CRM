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

export const getWorkTimeDay = createAsyncThunk(
  "getWorkTimeForDay",
  async () => {
    const resp = await AxiosInstance.get(`/time/get`);

    return resp.data;
  }
);
export const postWorkTimeDay = createAsyncThunk('postWorkTimeDay',
  async (body)=>{
    const resp = await AxiosInstance.post('/time/set',body)
    console.log(resp.data);
    if(resp.data.status){
      toast.success('Üstünlikli!')
    const response = await AxiosInstance.get(`/time/get`);
    return response.data;
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
      });

    //create
  },
});

export default getTimeOfWork.reducer;
