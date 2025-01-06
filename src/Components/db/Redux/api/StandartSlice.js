import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  standartForUser:[],
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
export const getStandartsForAll = createAsyncThunk("getStandartsForAll", async () => {
  const response = await AxiosInstance.get(`/labor/protection/get/for/all`);
  
  if (response.data.status === 404) {
    toast.error(response.data.message);
  }
  return response.data.data;
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
export const deleteStandartForAll = createAsyncThunk("deleteStandartForAll", async (body) => {
  
  const resp = await AxiosInstance.delete(`/labor/protection/delete/for/all?permissionUserId=${body.permissionUserId}&id=${body.laborId}`)
  if(resp.data.message==='LaborProtection deleted successfully'){
    toast.success('Üstünlikli!');
    const response = await AxiosInstance.get(`/labor/protection/get/for/all`);
    return response.data.data;

  }
  else {
    toast.error('Ýalňyşlyk!');
  }
});
export const deleteStandartForUser = createAsyncThunk("deleteStandartForUser", async (body) => {
  
  const resp = await AxiosInstance.delete(`/labor/protection/delete?id=${body.laborId}&userId=${body.userId}`)
  if(resp.data.message==='LaborProtection deleted successfully'){
    toast.success('Üstünlikli!');
  const response = await AxiosInstance.get(`/labor/protection/get/user?userId=${body.userId}`);
    return response.data;

  }
  else {
    toast.error('Ýalňyşlyk!');
  }
});
export const postStandartForUser = createAsyncThunk("postStandartForUser", async (body) => {
  const data = {
    title: body.title,
    description: body.description,
    usersId: body.usersId,
  };
  const resp = await AxiosInstance.post(`/labor/protection/add`,data)
  if(resp.data=='OK'){
    toast.success('Üstünlikli!');
    const response = await AxiosInstance.get(`/labor/protection/get/user?userId=${body.userId}`);

    
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
    userId:body.userId
  };
  const withoutUsersId = {
    permissionUserId:body.permissionUserId,
    title:body.title,
    description:body.description
  }
  if(body.usersId.length){
    const resp = await AxiosInstance.post(`/labor/protection/add`,data)
  if(resp.data=='OK'){
    toast.success('Üstünlikli!');
    const response = await AxiosInstance.get(`/labor/protection/get?userId=${body.userId}`);

    return response.data;

  }
  else {
    toast.error('Ýalňyşlyk!');
  }
}else{
  const resp = await AxiosInstance.post(`/labor/protection/add/for/all`,withoutUsersId)
  
  if(resp.data.message=='Ok'){
    toast.success('Üstünlikli!');
    const response = await AxiosInstance.get(`/labor/protection/get/for/all`);

    return response.data.data;

  }
  else {
    toast.error('Ýalňyşlyk!');
  }
}

});
export const updateStandart = createAsyncThunk("updateStandart", async (body) => {
 const data ={
      id: body.id,
      title: body.title,
      description: body.description,
      usersId: body.usersId,
      userId: body.userId,
 }
 const withoutUsersId ={
  id: body.id,
  title: body.title,
  description: body.description,
  permissionUserId: body.permissionUserId,
}
 if(body.usersId){
  const resp = await AxiosInstance.put(`/labor/protection/update`,data)
  if(resp.data){
    toast.success('Üstünlikli!');
    const response = await AxiosInstance.get(`/labor/protection/get?userId=${body.userId}`);
    return response.data;

  }
  else {
    toast.error('Ýalňyşlyk!');
  }
 }else{
  const resp = await AxiosInstance.put(`/labor/protection/update/for/all`,withoutUsersId)
  
  if(resp.data){
    toast.success('Üstünlikli!');
    const response = await AxiosInstance.get(`/labor/protection/get/for/all`);
    return response.data.data;

  }
  else {
    toast.error('Ýalňyşlyk!');
  }
 }
 
});
export const changeLoginPassword = createAsyncThunk("changeLoginPassword", async (body) => {
  
  const resp = await AxiosInstance.patch(`/user/updata/password`,body)
  if(resp.data==`User ID ${body.userId} login and password updated successfully.`){
    return toast.success('Üstünlikli!');
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
      .addCase(getStandartsForAll.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getStandartsForAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(getStandartsForAll.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getStandartsForUser.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getStandartsForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.standartForUser = action.payload;
        state.updated = true;
      })
      .addCase(getStandartsForUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStandartForAll.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteStandartForAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(deleteStandartForAll.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStandartForUser.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteStandartForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(deleteStandartForUser.rejected, (state, action) => {
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
      .addCase(postStandartForUser.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(postStandartForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(postStandartForUser.rejected, (state, action) => {
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
      .addCase(changeLoginPassword.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(changeLoginPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.updated = true;
      })
      .addCase(changeLoginPassword.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      
  },
});

export default standartSlice.reducer;
