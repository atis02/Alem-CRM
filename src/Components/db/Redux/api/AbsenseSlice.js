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
export const getAbsenseForUser = createAsyncThunk("getAbsenseForUser", async (body) => {
  const resp = await AxiosInstance.get(`/absence/get?permissionUserId=${body.permissionUserId}&userId=${body.userId}`);

  return resp.data.date;
});
export const addAbsense = createAsyncThunk("addAbsense", async (body) => {
  try {
    

  const response = await AxiosInstance.post(`/absence/add`, body);

  if(response.data.message=='Successfully'){
    const resp = await AxiosInstance.get(`/absence/get?permissionUserId=${body.permissionUserId}&userId=${body.userId}`);

    toast.success("Üstünlikli döredildi!") ;
    return resp.data.date;
  } else{
    
    toast.error(response.data.message)
  }
} catch (error) {
  error.response.data.message==="Request error: The absence period overlaps with an existing absence"?
  
  
    toast.error('Ulanyjy rugsatly!'): 
    error.response.data.message===`Request error: startDate ${body.startDate} should not be later than endDate ${body.endDate}`?
    toast.error('Sene nädogry!'): 

    toast.error('Ýalňyşlyk!')
  
}
});
export const deleteAbsense = createAsyncThunk("deleteAbsense", async (body) => {
    
  const response = await AxiosInstance.delete(`/absence/delete?permissionUserId=${body.permissionUserId}&userId=${body.userId}&absenceId=${body.absenceId}`);

  if(response.data.message=='Successfully'){
    const resp = await AxiosInstance.get(`/absence/get?permissionUserId=${body.permissionUserId}&userId=${body.userId}`);
    toast.success("Üstünlikli!") ;

    return resp.data.date;
  } else{
    
    toast.error(response.data.message)
  }

});
export const updateAbsense = createAsyncThunk("updateAbsense", async (body) => {
  try {
    

  const response = await AxiosInstance.put(`/absence/update`, body);

  if(response.data.message=='Successfully'){
    const resp = await AxiosInstance.get(`/absence/get?permissionUserId=${body.permissionUserId}&userId=${body.userId}`);

    toast.success("Üstünlikli döredildi!") ;
    return resp.data.date;
  } else{
    
    toast.error(response.data.message)
  }
} catch (error) {
  error.response.data.message==="Request error: The absence period overlaps with an existing absence"?
  
  
    toast.error('Ulanyjy rugsatly!'): 
    error.response.data.message==='Request error: startDate (2024-12-19) should not be later than endDate (2024-12-19)'?
    toast.error('Sene nädogry!'): 

    toast.error('Ýalňyşlyk!')
  
}
});
// Create the slice

const absense = createSlice({
  name: "absense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get

      .addCase(addAbsense.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(addAbsense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addAbsense.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteAbsense.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteAbsense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteAbsense.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAbsenseForUser.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getAbsenseForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAbsenseForUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateAbsense.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateAbsense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateAbsense.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
    //create
  },
});

export default absense.reducer;
