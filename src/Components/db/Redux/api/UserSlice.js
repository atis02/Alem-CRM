import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request /user/status

export const getUsers = createAsyncThunk("getUsers", async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await AxiosInstance.get("/user/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});
export const getStatusUsers = createAsyncThunk("getStatusUsers", async () => {
  const response = await AxiosInstance.get("/user/status");
  return response.data;
});
export const updateImg = createAsyncThunk("updateImg", async (body) => {
  const resp = await AxiosInstance.post(`/user/updata-img`, body);
  resp.data.message == "User profil photo updated successfully"
    ? toast.success("Üstünlikli döredildi!")
    : toast.error("Şowsuz!");

  return resp;
});
export const postStatusUser = createAsyncThunk("postStatusUser", async (body) => {
  const resp = await AxiosInstance.patch(`/user/updata/status`, body);
  if(resp.data.status!==400){

    const response = await AxiosInstance.get("/user/status");
    toast.success("Üstünlikli üýtgedildi!")
    return response.data
    
  }

    
    else {toast.error("Şowsuz!")};

});
// Create the slice

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getUsers.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //get all user's status
      .addCase(getStatusUsers.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getStatusUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getStatusUsers.rejected, (state, action) => {
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
      })
      .addCase(updateImg.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postStatusUser.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(postStatusUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(postStatusUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
    //create
  },
});

export default users.reducer;
