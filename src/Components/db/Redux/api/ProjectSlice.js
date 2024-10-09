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
// Create an async thunk for the GET request

export const getProjects = createAsyncThunk("getProjects", async () => {
  const resp = await AxiosInstance.get(`/project/get`);

  return resp.data.data;
});
export const getProjectForUser = createAsyncThunk(
  "getProjectForUser",
  async (age) => {
    const resp = await AxiosInstance.get(
      `/project/get/user/projects?userId=${age}`
    );
    return resp.data.data;
  }
);
export const postNewProject = createAsyncThunk(
  "postNewProject",
  async (body) => {
    const resp = await AxiosInstance.post(`/project/create`, body);

    resp.data ? toast.success("Üstünlikli!") : toast.error("Şowsuz!");
    const response = await AxiosInstance.get(`/project/get`);

    return response.data.data;
  }
);
export const updateProject = createAsyncThunk("updateProject", async (body) => {
  const resp = await AxiosInstance.put(`/project/updata/project`, body);

  resp.data ? toast.success("Üstünlikli!") : toast.error("Şowsuz!");
  const response = await AxiosInstance.get(`/project/get`);

  return response.data.data;
});
export const deleteProject = createAsyncThunk("deleteProject", async (body) => {
  const resp = await AxiosInstance.delete(
    `/project/delete/project?projectId=${body.projectId}&responsibleUserId=${body.responsibleUserId}`
  );
  if (resp.data.message == "Project remove successfully") {
    toast.success("Üstünlikli!");
    const response = await AxiosInstance.get(`/project/get`);

    return response.data.data;
  } else {
    toast.error("Ýalňyşlyk!");
  }
});
const project = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get

      .addCase(getProjects.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      // get user projects
      .addCase(getProjectForUser.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getProjectForUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getProjectForUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      // post
      .addCase(postNewProject.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(postNewProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(postNewProject.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //put
      .addCase(updateProject.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete projects
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default project.reducer;
