import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

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
export const createSubTasks = createAsyncThunk("createSubTasks", async (body) => {
    const data = {
        subTasks:body.subTasks
    }
    
    const resp = await AxiosInstance.post(`/subtask/add`, data);
    if(resp.data.message==='Secsefully'){
  
      toast.success("Üstünlikli!")
      const response = await AxiosInstance.get(`/subtask/get?userId=${body.userId}&taskId=${body.taskId}`);
      return response.data
      
    }
  
      
      else {toast.error("Şowsuz!")};
  
  });
export const deleteSubTask = createAsyncThunk("deleteSubTask", async (body) => {
  
    const data = {
      subTaskIds:body.subTaskId,
    }
    
    const resp = await AxiosInstance.delete(`/subtask/delete?subTaskId=${body.subTaskId}&taskId=${body.taskId}&permissionId=${body.userId}`);
    
    if(resp.data.message==='Successfully deleted 1 subtask(s)'){
  
      toast.success("Üstünlikli üýtgedildi!")
      const response = await AxiosInstance.get(`/subtask/get?userId=${body.userId}&taskId=${body.taskId}`);
      return response.data
      
    }
  
      
      else {toast.error("Şowsuz!")};
  
  });
export const updateSubTask = createAsyncThunk("updateSubTask", async (body) => {
   
    
    const resp = await AxiosInstance.put(`/subtask/update`, body);
    
    if(resp.data.message==='Secsefully'){
  
      toast.success("Üstünlikli üýtgedildi!")
      const response = await AxiosInstance.get(`/subtask/get?userId=${body.userId}&taskId=${body.taskId}`);
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
    
      .addCase(createSubTasks.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createSubTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createSubTasks.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSubTask.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteSubTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteSubTask.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateSubTask.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateSubTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateSubTask.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
    //create
  },
});

export default subTask.reducer;
