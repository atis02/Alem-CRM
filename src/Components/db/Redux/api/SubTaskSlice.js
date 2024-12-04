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
export const getSubTasks = createAsyncThunk("getSubTasks", async (body) => {
  const response = await AxiosInstance.get(`/subtask/get?userId=${body.userId}&taskId=${body.taskId}`);
  return response.data;
});
export const createHoliday = createAsyncThunk("createHoliday", async (body) => {
    const data = {
        name: body.name,
        date: body.date,
        color: body.color,
    }
    
    const resp = await AxiosInstance.post(`/holiday/add`, data);
    if(resp.data.message==='Successfully added'){
  
      toast.success("Üstünlikli üýtgedildi!")
      const response = await AxiosInstance.get(`/holiday/get/interval?startDate=${body.startDate}&endDate=${body.endDate}`);
      return response.data
      
    }
  
      
      else {toast.error("Şowsuz!")};
  
  });
export const deleteHoliday = createAsyncThunk("deleteHoliday", async (body) => {
    
    const resp = await AxiosInstance.delete(`/holiday/delete?id=${body.id}`);
    if(resp.data.message==='Successfully deleted'){
  
      toast.success("Üstünlikli üýtgedildi!")
      const response = await AxiosInstance.get(`/holiday/get/interval?startDate=${body.startDate}&endDate=${body.endDate}`);
      return response.data
      
    }
  
      
      else {toast.error("Şowsuz!")};
  
  });
export const updateHoliday = createAsyncThunk("updateHoliday", async (body) => {
    const data = {
      id:body.id,
        name: body.name,
        date: body.date,
        color: body.color,
    }
    
    const resp = await AxiosInstance.put(`/holiday/update`, data);
    if(resp.data.message==='Successfully update'){
  
      toast.success("Üstünlikli üýtgedildi!")
      const response = await AxiosInstance.get(`/holiday/get/interval?startDate=${body.startDate}&endDate=${body.endDate}`);
      return response.data
      
    }
  
      
      else {toast.error("Şowsuz!")};
  
  });
const subTask = createSlice({
  name: "subTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getSubTasks.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getSubTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSubTasks.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
    
      .addCase(createHoliday.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createHoliday.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createHoliday.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteHoliday.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteHoliday.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateHoliday.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateHoliday.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateHoliday.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
    //create
  },
});

export default subTask.reducer;
