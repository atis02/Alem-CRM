import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { user } from "../../../utils";
import moment from "moment";

const initialState = {
  employeerTime: [],
  data: [],
  adminNotes: [],
  adminNote: [],
  status: "idle",
  statusAdminNote: "idle",
  statusMonth: "idle",
  errorAdminNote: "idle",
  error: null,
  errorMonth: null,
  loading: false,
  setIsCame: JSON.parse(localStorage.getItem("iscame")),
};
// Create an async thunk for the GET request
export const getUserMonthWorkTime = createAsyncThunk(
  "getUserMonthWorkTime",
  async (body) => {
    const response = await AxiosInstance.get(
      `/time/work/user?userId=${body.userId}&date=${body.date}`
    );

    if (response.data.status === 404) {
      toast.error(response.data.message);
    }
    return response.data;
  }
);
export const getUserDayWorkTime = createAsyncThunk(
  "getUserDayWorkTime",
  async (body) => {
    const response = await AxiosInstance.get(
      `time/for/day?userId=${body.userId}&date=${body.date}`
    );
    if (response.data.status === 404) {
      toast.error(response.data.message);
    }
    return response.data;
  }
);
export const postComeTime = createAsyncThunk("postComeTime", async (body) => {
  const data = {
    userId: body.userId,
    comeStatus: body.comeStatus,
  };
  const resp = await AxiosInstance.post(`/time/come`, data);
  resp.data.messagge == "Saved come time work"
    ? toast.success("Üstünlikli!")
    : toast.error("Şowsuz!");
  const response = await AxiosInstance.get(
    `time/for/day?userId=${body.userId}&date=${body.userGetTime.date}`
  );

  return response.data;
});
export const postLeaveTime = createAsyncThunk("postLeaveTime", async (body) => {
  const data = {
    userId: body.userId,
    leaveStatus: body.leaveStatus,
  };
  const resp = await AxiosInstance.post(`/time/leave`, data);
  resp.data.status == 200
    ? toast.success("Üstünlikli!")
    : toast.error("Şowsuz!");

  const response = await AxiosInstance.get(
    `time/for/day?userId=${body.userId}&date=${body.userGetTime.date}`
  );

  return response.data;
});
export const postNote = createAsyncThunk("noteUser", async (body) => {
  const data = {
    id: body.id,
    note: body.note,
    color: body.color,
  };

  const resp = await AxiosInstance.patch(`/time/updata/note`, data);
  resp.data.message == " Note updated successfully "
    ? toast.success("Üstünlikli!")
    : toast.error("Şowsuz!");
  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const bodyEvent = {
    userId: user.id,
    date: moment().format("YYYY-MM-DD"),
  };
  const response = await AxiosInstance.get(
    `time/work/user?userId=${bodyEvent.userId}&date=${bodyEvent.date}`
  );

  if (response.data.status === 404) {
    toast.error(response.data.message);
  }
  return response.data;
});
export const noteUpdate = createAsyncThunk("noteUpdate", async (body) => {
  const data = {
    id: body.id,
    note: body.note,
    color: body.color,
  };

  const resp = await AxiosInstance.patch(`/time/updata/note`, data);
  resp.data.message == " Note updated successfully "
    ? toast.success("Üstünlikli!")
    : toast.error("Şowsuz!");
  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const bodyEvent = {
    userId: user.id,
    date: moment().format("YYYY-MM-DD"),
  };
  const response = await AxiosInstance.get(
    `time/work/user?userId=${bodyEvent.userId}&date=${bodyEvent.date}`
  );

  if (response.data.status === 404) {
    toast.error(response.data.message);
  }
  return response.data;
});
export const getAdminNotes = createAsyncThunk("getAdminNotes", async (body) => {
  const response = await AxiosInstance.get(
    `/holidays/get/share?startDate=${body.startDate}&endDate=${body.endDate}&userId=${body.userId}`
  );

  if (response.data.status === 404) {
    toast.error(response.data.message);
  }

  return response.data;
});
export const adminNotesOfMonth = createAsyncThunk(
  "adminNotesOfMonth",
  async (body) => {
    const response = await AxiosInstance.get(
      `/holidays/get?startDate=${body.startDate}&endDate=${body.endDate}`
    );
    if (response.data.status === 404) {
      toast.error(response.data.message);
    }
    return response.data;
  }
);
export const postAdminNote = createAsyncThunk("postAdminNote", async (body) => {
  const data = {
    title: body.title,
    date: new Date(`${body.date} ${body.dateHour}`).toJSON(),
    color: body.color,

    users: body.users,
  };

  if (data.title !== "" && data.date !== null && data.users.length !== 0) {
    const resp = await AxiosInstance.post(`/holidays/post`, data);
    resp.data == "OK" ? toast.success("Üstünlikli!") : toast.error("Şowsuz!");
    console.log(resp.data);
  } else {
    toast.error("Maglumatlary giriziň");
  }

  const response = await AxiosInstance.get(
    `/holidays/get?startDate=${body.startDate}&endDate=${body.endDate}`
  );

  if (response.data.status === 404) {
    toast.error(response.data.message);
  }
  return response.data;
});
export const getAdminNoteForProject = createAsyncThunk(
  "getAdminNoteForProject",
  async (authorId) => {
    const response = await AxiosInstance.get(
      `/note/my/sent/notes?userId=${authorId}`
    );

    if (response.data.status === 404) {
      toast.error(response.data.message);
    }

    return response.data;
  }
);
export const postAdminNotes = createAsyncThunk(
  "postAdminNotes",
  async (body) => {
    if (body.content !== "" && body.userId !== "") {
      const resp = await AxiosInstance.post(`/note/create`, body);
      resp.data.message == "OK"
        ? toast.success("Üstünlikli!")
        : toast.error("Şowsuz!");
      console.log(resp.data);
    } else {
      toast.error("Maglumatlary giriziň");
    }

    const response = await AxiosInstance.get(
      `/note/my/sent/notes?userId=${body.authorId}`
    );

    if (response.data.status === 404) {
      toast.error(response.data.message);
    }
    return response.data;
  }
);
export const updateAdminNote = createAsyncThunk(
  "updateAdminNote",
  async (body) => {
    if (body.content !== "" && body.userId !== "") {
      const resp = await AxiosInstance.patch(`/note/updata`, body);
      resp.data.message == "Successfully"
        ? toast.success("Üstünlikli!")
        : toast.error("Şowsuz!");
      console.log(resp.data);
    } else {
      toast.error("Maglumatlary giriziň");
    }

    const response = await AxiosInstance.get(
      `/note/my/sent/notes?userId=${body.authorId}`
    );

    if (response.data.status === 404) {
      toast.error(response.data.message);
    }
    return response.data;
  }
);
export const deleteAdminNote = createAsyncThunk(
  "deleteAdminNote",
  async (body) => {
    const resp = await AxiosInstance.delete(`/holidays/remove?id=${body.id}`);
    resp.data == "OK" ? toast.success("Üstünlikli!") : toast.error("Şowsuz!");
    console.log(resp.data);
    const response = await AxiosInstance.get(
      `/holidays/get?startDate=${body.startDate}&endDate=${body.endDate}`
    );

    if (response.data.status === 404) {
      toast.error(response.data.message);
    }
    return response.data;
  }
);
export const deleteAdminNotes = createAsyncThunk(
  "deleteAdminNotes",
  async (body) => {
    const resp = await AxiosInstance.delete(
      `/note/delete?authorId=${body.authorId}&noteId=${body.id}`
    );
    resp.data.message == "Successfully"
      ? toast.success("Üstünlikli!")
      : toast.error("Şowsuz!");
    console.log(resp.data);

    const response = await AxiosInstance.get(
      `/note/my/sent/notes?userId=${body.authorId}`
    );

    if (response.data.status === 404) {
      toast.error(response.data.message);
    }
    return response.data;
  }
);
// export const updateAdminNote = createAsyncThunk(
//   "updateAdminNote",
//   async (body) => {
//     const data = {
//       id: body.id,
//       title: body.title,
//       color: body.color,
//     };

//     const resp = await AxiosInstance.patch(`/holidays/edit`, data);
//     resp.data == "OK" ? toast.success("Üstünlikli!") : toast.error("Şowsuz!");
//     console.log(resp.data);

//     const response = await AxiosInstance.get(
//       `/holidays/get?startDate=${body.startDate}&endDate=${body.endDate}`
//     );

//     if (response.data.status === 404) {
//       toast.error(response.data.message);
//     }
//     return response.data;
//   }
// );
export const updateAdminNotes = createAsyncThunk(
  "updateAdminNotes",
  async (body) => {
    console.log(body);
    const data = {
      holidayId: body.noteId,
      title: body.content,
      date: new Date(`${body.date} ${body.dateHour}`).toJSON(),
      color: body.color,
      users: body.users,
    };
    const resp = await AxiosInstance.put(`/holidays/updata`, data);
    resp.data.msg == "OK"
      ? toast.success("Üstünlikli!")
      : toast.error("Şowsuz!");
    console.log(resp.data);

    const response = await AxiosInstance.get(
      `holidays/get?startDate=${body.startDate}&endDate=${body.endDate}`
    );

    if (response.data.status === 404) {
      toast.error(response.data.message);
    }

    return response.data;
  }
);
export const getUserNoteForProject = createAsyncThunk(
  "getUserNoteForProject",
  async (authorId) => {
    const response = await AxiosInstance.get(
      `/note/received/notes?userId=${authorId}`
    );

    if (response.data.status === 404) {
      toast.error(response.data.message);
    }

    return response.data;
  }
);
export const deleteUserNote = createAsyncThunk(
  "deleteUserNote",
  async (body) => {
    const resp = await AxiosInstance.delete(
      `/time/remove/note?id=${body.id}&userId=${body.userId}`
    );
    resp.data.msg == "Successfully"
      ? toast.success("Üstünlikli!")
      : toast.error("Şowsuz!");
    const bodyEvent = {
      userId: body.id,
      date: moment().format("YYYY-MM-DD"),
    };
    const response = await AxiosInstance.get(
      `/time/work/user?userId=${body.userId}&date=${body.date}`
    );
    if (response.data.status === 404) {
      toast.error(response.data.message);
    }
    return response.data;
  }
);
// Create the slice

const WorkTimes = createSlice({
  name: "WorkTimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getUserMonthWorkTime.pending, (state) => {
        state.statusMonth = "loading...";
      })
      .addCase(getUserMonthWorkTime.fulfilled, (state, action) => {
        state.statusMonth = "succeeded";
        state.employeerTime = action.payload;
      })
      .addCase(getUserMonthWorkTime.rejected, (state, action) => {
        state.loading = false;
        state.statusMonth = "failed";
        state.errorMonth = action.error.message;
      })
      .addCase(getAdminNotes.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(getAdminNotes.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNotes = action.payload;
      })
      .addCase(getAdminNotes.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      .addCase(adminNotesOfMonth.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(adminNotesOfMonth.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNotes = action.payload;
      })
      .addCase(adminNotesOfMonth.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      .addCase(postAdminNote.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(postAdminNote.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNotes = action.payload;
      })
      .addCase(postAdminNote.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      // get admin notes
      .addCase(postAdminNotes.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(postAdminNotes.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNote = action.payload;
      })
      .addCase(postAdminNotes.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      .addCase(updateAdminNote.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(updateAdminNote.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNote = action.payload;
      })
      .addCase(updateAdminNote.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      .addCase(getAdminNoteForProject.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(getAdminNoteForProject.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNote = action.payload;
      })
      .addCase(getAdminNoteForProject.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      .addCase(getUserNoteForProject.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(getUserNoteForProject.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNote = action.payload;
      })
      .addCase(getUserNoteForProject.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      .addCase(deleteAdminNotes.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(deleteAdminNotes.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNote = action.payload;
      })
      .addCase(deleteAdminNotes.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      //update admin notific

      // .addCase(updateAdminNote.pending, (state) => {
      //   state.statusAdminNote = "loading...";
      // })
      // .addCase(updateAdminNote.fulfilled, (state, action) => {
      //   state.statusAdminNote = "succeeded";
      //   state.adminNotes = action.payload;
      // })
      // .addCase(updateAdminNote.rejected, (state, action) => {
      //   state.loading = false;
      //   state.statusAdminNote = "failed";
      //   state.errorAdminNote = action.error.message;
      // })
      .addCase(updateAdminNotes.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(updateAdminNotes.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNotes = action.payload;
      })
      .addCase(updateAdminNotes.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      .addCase(deleteAdminNote.pending, (state) => {
        state.statusAdminNote = "loading...";
      })
      .addCase(deleteAdminNote.fulfilled, (state, action) => {
        state.statusAdminNote = "succeeded";
        state.adminNotes = action.payload;
      })
      .addCase(deleteAdminNote.rejected, (state, action) => {
        state.loading = false;
        state.statusAdminNote = "failed";
        state.errorAdminNote = action.error.message;
      })
      .addCase(postNote.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(postNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeerTime = action.payload;
      })
      .addCase(postNote.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUserNote.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteUserNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeerTime = action.payload;
      })
      .addCase(deleteUserNote.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(noteUpdate.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(noteUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeerTime = action.payload;
      })
      .addCase(noteUpdate.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserDayWorkTime.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getUserDayWorkTime.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUserDayWorkTime.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(postNote.pending, (state) => {
      //   state.status = "loading...";
      // })
      // .addCase(postNote.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.data = action.payload;
      // })
      // .addCase(postNote.rejected, (state, action) => {
      //   state.loading = false;
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      .addCase(postComeTime.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(postComeTime.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.setIsCame = localStorage.setItem("iscame", false);
      })
      .addCase(postComeTime.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postLeaveTime.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(postLeaveTime.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.setIsCame = localStorage.setItem("iscame", true);
      })
      .addCase(postLeaveTime.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
    //create
  },
});

export default WorkTimes.reducer;
