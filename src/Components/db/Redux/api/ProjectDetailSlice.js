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

export const getProjectDetail = createAsyncThunk(
  "getProjectDetail",
  async (projectID) => {
    const resp = await AxiosInstance.get(
      `/project/id/get?projectId=${projectID}`
    );

    return [resp.data.data];
  }
);
export const getProjectForUser = createAsyncThunk(
  "getProjectForUser",
  async (age) => {
    const resp = await AxiosInstance.get(
      `/project/get/user/projects?userId=${age}`
    );

    return [resp.data.data];
  }
);
export const updateTask = createAsyncThunk(
  "updateTask",
  async ({ body, projectID }) => {
    const resp = await AxiosInstance.put(`/project/updata/task`, body);

    resp.data ? toast.success("Üstünlikli!") : toast.error("Şowsuz!");
    const response = await AxiosInstance.get(
      `/project/id/get?projectId=${projectID}`
    );

    return [response.data.data];
  }
);
export const deleteProjectTask = createAsyncThunk(
  "deleteProjectTask",
  async ({ body, age }) => {
    const resp = await AxiosInstance.delete(
      `/project/delete/task?projectId=${body.projectId}&taskId=${body.taskId}&responsibleUserId=${body.responsibleUserId}`
    );
    if (resp.data.message == "Task remove successfully") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get(
        `/project/id/get?projectId=${age}`
      );

      return [response.data.data];
    } else {
      toast.error("Ýalňyşlyk!");
    }
  }
);
export const addNewTask = createAsyncThunk(
  "addNewTask",
  async ({ body, projectID }) => {
    const resp = await AxiosInstance.post(
      `/project/add/task/existing/project`,
      body
    );

    resp.data.message === "Task created"
      ? toast.success("Üstünlikli!")
      : toast.error("Şowsuz!");
    const response = await AxiosInstance.get(
      `/project/id/get?projectId=${projectID}`
    );

    return [response.data.data];
  }
);
const project = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get

      .addCase(getProjectDetail.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getProjectDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getProjectDetail.rejected, (state, action) => {
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
      .addCase(addNewTask.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //update
      .addCase(updateTask.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete task
      .addCase(deleteProjectTask.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteProjectTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteProjectTask.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default project.reducer;
