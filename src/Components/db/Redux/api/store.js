import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../reducers/AuthSlice";
import ImageUpdateSlice from "./ImageUpdateSlice";
import UserSlice from "./UserSlice";
import ComeTimeSlice from "./ComeTimeSlice";
import PdfSlice from "./PdfSlice";
import GetComeTimeUsers from "./GetComeTimeUsers";
import ProjectSlice from "./ProjectSlice";
import ProjectDetailSlice from "./ProjectDetailSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    imgAccount: ImageUpdateSlice,
    users: UserSlice,
    getWorkDate: ComeTimeSlice,
    uploadPDf: PdfSlice,
    getWorkTime: GetComeTimeUsers,
    project: ProjectSlice,
    projectDetail: ProjectDetailSlice,
  },
});
